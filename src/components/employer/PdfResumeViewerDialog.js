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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";

/**
 * In-page PDF resume viewer (replaces window.open, which browsers block
 * when it runs after an async request).
 *
 * The PDF is downloaded as a blob and shown from a blob: URL, so it is not
 * affected by the API's X-Frame-Options header. If the download fails
 * (e.g. CORS), the "Open in new tab" link still works.
 *
 * Props: open, onClose, url (PDF url or null), candidateName
 */
export default function PdfResumeViewerDialog({ open, onClose, url, candidateName }) {
  const [blobUrl, setBlobUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open || !url) {
      setBlobUrl("");
      setFailed(false);
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    let created = "";
    setLoading(true);
    setFailed(false);
    setBlobUrl("");

    axios
      .get(url, { responseType: "blob" })
      .then((res) => {
        if (cancelled) return;
        created = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
        setBlobUrl(created);
      })
      .catch((err) => {
        console.error("Could not load resume PDF:", err);
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      if (created) URL.revokeObjectURL(created);
    };
  }, [open, url]);

  const fileName = `${(candidateName || "resume").replace(/\s+/g, "_")}_resume.pdf`;

  return (
    <Dialog open={!!open} onClose={onClose} maxWidth="lg" fullWidth aria-labelledby="prv-title">
      <DialogTitle id="prv-title" sx={{ display: "flex", alignItems: "center", gap: 1, pr: 6 }}>
        <DescriptionIcon />
        {candidateName ? `Resume — ${candidateName}` : "Resume"}
        <IconButton
          aria-label="Close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0, height: "75vh" }}>
        {!url ? (
          <Typography sx={{ py: 6, textAlign: "center" }} color="text.secondary">
            This candidate has not uploaded a resume.
          </Typography>
        ) : loading ? (
          <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : blobUrl ? (
          <iframe
            title="Resume PDF"
            src={blobUrl}
            style={{ width: "100%", height: "100%", border: 0 }}
          />
        ) : failed ? (
          <Box sx={{ p: 3 }}>
            <Alert severity="warning">
              The resume couldn't be shown inside this page. Use “Open in new tab” to view it.
            </Alert>
          </Box>
        ) : null}
      </DialogContent>

      <DialogActions>
        {blobUrl && (
          <Button href={blobUrl} download={fileName}>
            Download
          </Button>
        )}
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
