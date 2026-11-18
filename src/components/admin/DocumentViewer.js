import * as React from "react";
import { useState, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/i;
const PDF_EXT = /\.pdf$/i;
const OFFICE_EXT = /\.(docx?|xlsx?|pptx?)$/i;

// Extension check that ignores any ?query / #hash on the URL
const cleanPath = (url) => String(url).split(/[?#]/)[0];

/**
 * Admin document viewer.
 *
 *   const { openDoc, viewer } = useDocumentViewer();
 *   <button onClick={() => openDoc(row.aadhaar_card, "Aadhaar Card")} />
 *   ...
 *   {viewer}          // render once in the page
 *
 * - No URL (never uploaded)        -> "<label> was not uploaded" pop-up
 * - URL but file missing/unloadable -> "could not be loaded" pop-up
 * - URL present                    -> image / PDF preview in a pop-up
 */
export default function useDocumentViewer() {
  const [state, setState] = useState({ open: false, url: null, label: "" });
  const [loadFailed, setLoadFailed] = useState(false);

  const openDoc = useCallback((rawUrl, label = "Document") => {
    // Backend may send null, "", or (older builds) a list/set with one URL
    let url = Array.isArray(rawUrl) ? rawUrl[0] : rawUrl;
    url = typeof url === "string" ? url.trim() : null;
    setLoadFailed(false);
    setState({ open: true, url: url || null, label });
  }, []);

  const close = () => setState((s) => ({ ...s, open: false }));

  const { open, url, label } = state;
  const path = url ? cleanPath(url) : "";
  const isImage = IMAGE_EXT.test(path);
  const isPdf = PDF_EXT.test(path);
  const isOffice = OFFICE_EXT.test(path);

  let body;
  if (!url) {
    body = (
      <Typography sx={{ py: 3, textAlign: "center" }}>
        <strong>{label}</strong> was not uploaded.
      </Typography>
    );
  } else if (loadFailed) {
    body = (
      <Typography sx={{ py: 3, textAlign: "center" }}>
        <strong>{label}</strong> could not be loaded. The file may have been
        removed from the server.
      </Typography>
    );
  } else if (isImage) {
    body = (
      <img
        src={url}
        alt={label}
        onError={() => setLoadFailed(true)}
        style={{ maxWidth: "100%", maxHeight: "70vh", display: "block", margin: "0 auto" }}
      />
    );
  } else if (isPdf) {
    body = (
      <iframe
        title={label}
        src={url}
        style={{ width: "100%", height: "70vh", border: "none" }}
      />
    );
  } else if (isOffice) {
    body = (
      <iframe
        title={label}
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
        style={{ width: "100%", height: "70vh", border: "none" }}
      />
    );
  } else {
    body = (
      <Typography sx={{ py: 3, textAlign: "center" }}>
        Preview isn't available for this file type. Use "Open in new tab".
      </Typography>
    );
  }

  const viewer = (
    <Dialog open={open} onClose={close} fullWidth maxWidth={url && !loadFailed ? "md" : "xs"}>
      <DialogTitle>{url && !loadFailed ? label : "Document not available"}</DialogTitle>
      <DialogContent dividers>{body}</DialogContent>
      <DialogActions>
        {url && !loadFailed && (
          <Button onClick={() => window.open(url, "_blank", "noopener")}>
            Open in new tab
          </Button>
        )}
        <Button onClick={close} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { openDoc, viewer };
}
