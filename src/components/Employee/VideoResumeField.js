import { notify } from "../notify/Notify";
import React, { useRef, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import CloseIcon from "@mui/icons-material/Close";
import VideoResumeRecorder from "./VideoResumeRecorder";

export const MAX_VIDEO_SECONDS = 60;
export const MAX_VIDEO_BYTES = 25 * 1024 * 1024;

// Reads the duration of a video File in the browser.
// Resolves to null when the browser can't tell (e.g. some webm recordings).
const getDuration = (file) =>
  new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const v = document.createElement("video");
    v.preload = "metadata";
    v.onloadedmetadata = () => {
      const d = v.duration;
      URL.revokeObjectURL(url);
      resolve(Number.isFinite(d) ? d : null);
    };
    v.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    v.src = url;
  });

/**
 * Upload field for the video resume: choose a file OR record a 1-minute video.
 *
 * Props:
 *  value     - File | null
 *  onChange  - (File | null) => void
 *  onError   - (message: string) => void   (optional)
 */
const VideoResumeField = ({ value, onChange, onError }) => {
  const inputRef = useRef(null);
  const [recorderOpen, setRecorderOpen] = useState(false);
  const [duration, setDuration] = useState(null);

  const fail = (msg) => {
    if (onError) onError(msg);
    else notify.error(msg);
  };

  const accept = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      fail("Please choose a video file (mp4, webm, mov).");
      return;
    }
    if (file.size > MAX_VIDEO_BYTES) {
      fail("Video is too large (max 25 MB).");
      return;
    }
    const d = await getDuration(file);
    if (d !== null && d > MAX_VIDEO_SECONDS + 1) {
      fail(`Video is ${Math.round(d)}s long. Your video resume must be 1 minute or less.`);
      return;
    }
    setDuration(d);
    onChange(file);
  };

  const clear = () => {
    setDuration(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Box>
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={(e) => accept(e.target.files[0])}
      />

      {!value ? (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            startIcon={<FolderOpenIcon />}
            onClick={() => inputRef.current && inputRef.current.click()}
          >
            Choose video file
          </Button>
          <Button
            variant="contained"
            startIcon={<VideocamIcon />}
            onClick={() => setRecorderOpen(true)}
          >
            Record 1-min video
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 1,
            border: "1px solid #ccc",
            borderRadius: 1,
          }}
        >
          <VideocamIcon color="primary" />
          <Typography variant="body2" sx={{ flex: 1, wordBreak: "break-all" }}>
            {value.name}
            {duration !== null ? ` · ${Math.round(duration)}s` : ""}
            {` · ${(value.size / (1024 * 1024)).toFixed(1)} MB`}
          </Typography>
          <IconButton size="small" onClick={clear} aria-label="Remove video">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
        Maximum 1 minute.
      </Typography>

      <VideoResumeRecorder
        open={recorderOpen}
        onClose={() => setRecorderOpen(false)}
        onRecorded={(file) => {
          setDuration(null);
          onChange(file);
        }}
      />
    </Box>
  );
};

export default VideoResumeField;
