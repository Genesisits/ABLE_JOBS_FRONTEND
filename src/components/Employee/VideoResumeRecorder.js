import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  LinearProgress,
  Alert,
  Chip,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from "@mui/icons-material/Replay";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { UPLOAD_RESUME } from "./../../endpoints";

const MAX_SECONDS = 60; // hard cap: a 1 minute video resume
const MIN_SECONDS = 5; // avoid accidental empty uploads

// ~564 kbps total => about 4 MB for a full minute (keeps uploads small)
const VIDEO_BPS = 500000;
const AUDIO_BPS = 64000;

// Pick the best container the current browser can record
// (Chrome/Edge/Firefox -> webm, Safari -> mp4)
const pickMimeType = () => {
  if (typeof MediaRecorder === "undefined") return "";
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
    "video/mp4",
  ];
  return candidates.find((t) => MediaRecorder.isTypeSupported(t)) || "";
};

const fmt = (s) => {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
};

/**
 * Props:
 *  open        - boolean
 *  onClose     - () => void
 *  onRecorded  - (File) => void  If given, the recording is handed back to the
 *                parent (to go into an upload form field) instead of being
 *                uploaded by this dialog.
 *  onUploaded  - (response.data) => void   (only used when onRecorded is absent)
 */
const VideoResumeRecorder = ({ open, onClose, onRecorded, onUploaded }) => {
  const liveRef = useRef(null); // <video> showing the camera
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const startedAtRef = useRef(0);

  // idle -> ready -> recording -> review -> uploading
  const [phase, setPhase] = useState("idle");
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState("");
  const [blob, setBlob] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetAll = useCallback(() => {
    clearTimer();
    stopStream();
    setPreviewUrl((u) => {
      if (u) URL.revokeObjectURL(u);
      return "";
    });
    setBlob(null);
    setElapsed(0);
    setProgress(0);
    setError("");
    setDone(false);
    setPhase("idle");
  }, [stopStream]);

  const startCamera = useCallback(async () => {
    setError("");
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError(
        "Your browser can't access the camera. Camera access needs HTTPS (or localhost) and a modern browser."
      );
      return;
    }
    if (typeof MediaRecorder === "undefined") {
      setError("Video recording isn't supported in this browser. Please use Chrome, Edge, Firefox or Safari 14.1+.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = stream;
      setPhase("ready");
    } catch (e) {
      setError(
        e && e.name === "NotAllowedError"
          ? "Camera/microphone permission was blocked. Allow access in your browser's address bar and try again."
          : "Couldn't start the camera. Check that it isn't being used by another app."
      );
    }
  }, []);

  // attach the live stream to the <video> once it's mounted
  useEffect(() => {
    if ((phase === "ready" || phase === "recording") && liveRef.current && streamRef.current) {
      liveRef.current.srcObject = streamRef.current;
      liveRef.current.muted = true; // avoid feedback while recording
      liveRef.current.play().catch(() => {});
    }
  }, [phase]);

  // open/close lifecycle
  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      resetAll();
    }
    return () => {
      clearTimer();
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const finishRecording = useCallback(() => {
    clearTimer();
    const rec = recorderRef.current;
    if (rec && rec.state !== "inactive") rec.stop();
  }, []);

  const startRecording = () => {
    if (!streamRef.current) return;
    setError("");
    chunksRef.current = [];
    const mimeType = pickMimeType();
    let rec;
    try {
      rec = new MediaRecorder(streamRef.current, {
        ...(mimeType ? { mimeType } : {}),
        videoBitsPerSecond: VIDEO_BPS,
        audioBitsPerSecond: AUDIO_BPS,
      });
    } catch (e) {
      setError("Couldn't start recording in this browser.");
      return;
    }
    recorderRef.current = rec;

    rec.ondataavailable = (ev) => {
      if (ev.data && ev.data.size > 0) chunksRef.current.push(ev.data);
    };
    rec.onstop = () => {
      const type = rec.mimeType || mimeType || "video/webm";
      const out = new Blob(chunksRef.current, { type });
      const secs = (Date.now() - startedAtRef.current) / 1000;
      stopStream(); // release camera as soon as we're done
      if (secs < MIN_SECONDS) {
        setError(`Too short — please record at least ${MIN_SECONDS} seconds.`);
        setElapsed(0);
        setPhase("idle");
        startCamera();
        return;
      }
      setBlob(out);
      setPreviewUrl(URL.createObjectURL(out));
      setPhase("review");
    };

    rec.start(1000);
    startedAtRef.current = Date.now();
    setElapsed(0);
    setPhase("recording");

    timerRef.current = setInterval(() => {
      const s = (Date.now() - startedAtRef.current) / 1000;
      if (s >= MAX_SECONDS) {
        setElapsed(MAX_SECONDS);
        finishRecording(); // auto-stop at exactly 1 minute
      } else {
        setElapsed(s);
      }
    }, 100);
  };

  const retake = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
    setBlob(null);
    setElapsed(0);
    setProgress(0);
    setError("");
    setPhase("idle");
    startCamera();
  };

  const upload = async () => {
    if (!blob) return;
    const token = localStorage.getItem("access_token");
    const ext = blob.type.includes("mp4") ? "mp4" : "webm";
    const file = new File([blob], `video_resume.${ext}`, { type: blob.type });

    // Form-field mode: give the file back to the parent form and close
    if (onRecorded) {
      onRecorded(file);
      resetAll();
      if (onClose) onClose();
      return;
    }

    const form = new FormData();
    form.append("video_resume", file); // video only — existing PDF resume is kept

    setPhase("uploading");
    setError("");
    try {
      const res = await axios.post(UPLOAD_RESUME, form, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: (p) => {
          if (p.total) setProgress(Math.round((p.loaded / p.total) * 100));
        },
      });
      setDone(true);
      setPhase("review");
      if (onUploaded) onUploaded(res.data);
    } catch (e) {
      setError(
        (e.response && (e.response.data?.error || e.response.data?.detail)) ||
          "Upload failed. Please check your connection and try again."
      );
      setPhase("review");
    }
  };

  const handleClose = () => {
    if (phase === "recording") finishRecording();
    resetAll();
    if (onClose) onClose();
  };

  const remaining = Math.max(0, MAX_SECONDS - elapsed);
  const recording = phase === "recording";

  return (
    <Dialog open={!!open} onClose={handleClose} maxWidth="sm" fullWidth aria-labelledby="vr-title">
      <DialogTitle id="vr-title" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <VideocamIcon /> Record your 1-minute video resume
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {done && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Your video resume was uploaded. Employers can now watch it.
          </Alert>
        )}

        {/* Video area */}
        <Box
          sx={{
            position: "relative",
            bgcolor: "#000",
            borderRadius: 2,
            overflow: "hidden",
            aspectRatio: "4 / 3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {(phase === "ready" || recording) && (
            <video
              ref={liveRef}
              playsInline
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }}
            />
          )}
          {(phase === "review" || phase === "uploading") && previewUrl && (
            <video
              src={previewUrl}
              controls
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          )}
          {phase === "idle" && !error && (
            <Typography sx={{ color: "#fff" }}>Starting camera…</Typography>
          )}

          {recording && (
            <Chip
              label={`● REC  ${fmt(elapsed)} / ${fmt(MAX_SECONDS)}`}
              color="error"
              size="small"
              sx={{ position: "absolute", top: 10, left: 10, fontWeight: 700 }}
            />
          )}
        </Box>

        {recording && (
          <Box sx={{ mt: 1.5 }}>
            <LinearProgress
              variant="determinate"
              value={(elapsed / MAX_SECONDS) * 100}
              color={remaining <= 10 ? "error" : "primary"}
            />
            <Typography variant="caption" color="text.secondary">
              {Math.ceil(remaining)}s left — recording stops automatically at 1:00
            </Typography>
          </Box>
        )}

        {phase === "uploading" && (
          <Box sx={{ mt: 1.5 }}>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="caption" color="text.secondary">
              Uploading… {progress}%
            </Typography>
          </Box>
        )}

        {phase === "ready" && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              What to cover in 60 seconds
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              1. Your name and the role you're looking for (10s)
              <br />
              2. Your key skills and experience (25s)
              <br />
              3. One achievement or project you're proud of (15s)
              <br />
              4. Why you'd be a great hire + a friendly close (10s)
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
              Tip: face a window for light, keep the camera at eye level, and speak clearly.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit" disabled={phase === "uploading"}>
          {done ? "Close" : "Cancel"}
        </Button>

        {phase === "ready" && (
          <Button
            variant="contained"
            color="error"
            startIcon={<VideocamIcon />}
            onClick={startRecording}
          >
            Start recording
          </Button>
        )}

        {recording && (
          <Button variant="contained" startIcon={<StopIcon />} onClick={finishRecording}>
            Stop
          </Button>
        )}

        {(phase === "review" || phase === "uploading") && !done && (
          <>
            <Button
              startIcon={<ReplayIcon />}
              onClick={retake}
              disabled={phase === "uploading"}
            >
              Retake
            </Button>
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={upload}
              disabled={phase === "uploading"}
            >
              {phase === "uploading"
                ? "Uploading…"
                : onRecorded
                ? "Use this video"
                : "Save video resume"}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default VideoResumeRecorder;
