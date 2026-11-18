import React from "react";
import { Dialog, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import "./findajob.css"; // jd-* styles

// Purple modal shell shared by the resume dialogs (same look as the Job Details dialog).
// Styles live in findajob.css under the `jd-` prefix.
export default function PurpleDialog({ open, onClose, title, icon, width = 640, loading = false, children, actions }) {
  return (
    <Dialog
      open={!!open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        className: "jd-paper",
        style: { width: `min(${width}px, calc(100% - 32px))`, maxWidth: "none" },
      }}
    >
      <div className="jd-header">
        <svg className="jd-swoosh" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 100 C 170 100, 300 70, 400 0" fill="none" stroke="#fbbf24" strokeWidth="7" />
        </svg>
        <span className="jd-header-icon-wrap">{icon}</span>
        <span className="jd-header-bar" />
        <h2 className="jd-header-title">{title}</h2>
        <button type="button" className="jd-x" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
      </div>

      <div className="jd-body">
        {children}
        {actions ? <div className="jd-actions">{actions}</div> : null}
      </div>

      {loading && (
        <div className="jd-loading">
          <CircularProgress size={48} />
          <p>Please wait...</p>
        </div>
      )}
    </Dialog>
  );
}

// Styled file chooser (hidden native input inside a clickable card)
export function FilePick({ file, accept, onChange, label, hint, icon }) {
  return (
    <label className="jd-drop">
      <input
        type="file"
        accept={accept}
        hidden
        onChange={(e) => onChange(e.target.files[0] || null)}
      />
      <span className="jd-chip">{icon || <UploadFileIcon />}</span>
      <span className="jd-drop-text">
        <strong title={file ? file.name : undefined}>{file ? file.name : label}</strong>
        <small>
          {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB · click to change` : hint}
        </small>
      </span>
    </label>
  );
}
