import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VideocamIcon from "@mui/icons-material/Videocam";

/**
 * In-page player for a candidate's video resume (replaces the popup tab,
 * which browsers often block after an async request).
 *
 * Props:
 *  open           - boolean
 *  onClose        - () => void
 *  url            - video URL (null/"" => "no video resume" message)
 *  candidateName  - shown in the title
 */
export default function VideoResumePlayerDialog({ open, onClose, url, candidateName }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (open) setFailed(false);
  }, [open, url]);

  return (
    <Dialog open={!!open} onClose={onClose} maxWidth="md" fullWidth aria-labelledby="vrp-title">
      <DialogTitle
        id="vrp-title"
        sx={{ display: "flex", alignItems: "center", gap: 1, pr: 6 }}
      >
        <VideocamIcon />
        {candidateName ? `Video Resume — ${candidateName}` : "Video Resume"}
        <IconButton
          aria-label="Close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {!url ? (
          <Typography sx={{ py: 3, textAlign: "center" }} color="text.secondary">
            This candidate has not uploaded a video resume.
          </Typography>
        ) : (
          <Box>
            {/* key forces a fresh player when switching candidates */}
            <video
              key={url}
              src={url}
              controls
              autoPlay
              playsInline
              preload="metadata"
              onError={() => setFailed(true)}
              style={{
                width: "100%",
                maxHeight: "70vh",
                background: "#000",
                borderRadius: 8,
                display: failed ? "none" : "block",
              }}
            />
            {failed && (
              <Alert severity="warning">
                This video couldn't be played here. Try opening it in a new tab or
                downloading it.
              </Alert>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {url && (
          <Button href={url} target="_blank" rel="noopener noreferrer">
            Open in new tab
          </Button>
        )}
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
