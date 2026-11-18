import React, { useEffect, useState, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import "./notify.css";

/* ------------------------------------------------------------------ *
 *  Centered pop-up notifications for the whole app.
 *
 *  1) Anywhere in code (no state needed):
 *       import { notify } from "../notify/Notify";
 *       notify.success("Resume uploaded successfully!");
 *       notify.error("Could not apply for this job.");
 *       notify.warning("Your resume is missing.", { title: "Resume missing" });
 *       notify.info("Your quote is being prepared…", { autoHide: 3000 });
 *
 *  2) Controlled, when a page already keeps its own state:
 *       <CenterPopup open={open} severity="error" message={msg}
 *                    onClose={() => setOpen(false)} />
 *
 *  <NotificationHost /> is mounted once in App.js and shows the pop-ups
 *  created by notify.*, one after another if several arrive together.
 * ------------------------------------------------------------------ */

const DEFAULT_TITLES = {
  success: "Success",
  error: "Something went wrong",
  warning: "Please note",
  info: "Information",
};

// Success / info messages close by themselves; errors and warnings wait for OK.
const DEFAULT_AUTO_HIDE = { success: 6000, info: 6000, error: 0, warning: 0 };

const ICONS = {
  success: <path d="M5 12.5l4.2 4.2L19 7" />,
  error: <path d="M7 7l10 10M17 7L7 17" />,
  warning: <path d="M12 6.5v7M12 17.4v.1" />,
  info: <path d="M12 11v6M12 7.6v.1" />,
};

const toText = (message) => {
  if (message === null || message === undefined) return "";
  if (typeof message === "string" || typeof message === "number") return String(message);
  if (React.isValidElement(message)) return message;
  try {
    return JSON.stringify(message);
  } catch (e) {
    return String(message);
  }
};

export function CenterPopup({
  open,
  message,
  severity = "info",
  title,
  onClose,
  autoHide,
  buttonText = "OK",
}) {
  const kind = ICONS[severity] ? severity : "info";
  const hideAfter = autoHide === undefined ? DEFAULT_AUTO_HIDE[kind] : autoHide;

  useEffect(() => {
    if (!open || !hideAfter || !onClose) return undefined;
    const t = setTimeout(onClose, hideAfter);
    return () => clearTimeout(t);
  }, [open, hideAfter, onClose, message]);

  const text = toText(message);

  return (
    <Dialog
      open={Boolean(open && text !== "")}
      onClose={onClose}
      scroll="body"
      sx={{ zIndex: 2600 }}
      BackdropProps={{ className: "cp-backdrop" }}
      PaperProps={{ className: `cp-card cp-${kind}`, role: "alertdialog" }}
    >
      <div className="cp-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor"
          strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          {ICONS[kind]}
        </svg>
      </div>
      <h2 className="cp-title">{title || DEFAULT_TITLES[kind]}</h2>
      <p className="cp-message">{text}</p>
      <button type="button" className="cp-btn" onClick={onClose} autoFocus>
        {buttonText}
      </button>
      {open && hideAfter > 0 && (
        <span className="cp-timer" style={{ animationDuration: `${hideAfter}ms` }} />
      )}
    </Dialog>
  );
}

/* ---------- imperative API ---------- */
const listeners = new Set();
let counter = 0;

const emit = (severity, message, opts = {}) => {
  if (listeners.size === 0) {
    // Host not mounted yet – fall back so the message is never lost.
    window.alert(typeof message === "string" ? message : toText(message));
    return null;
  }
  const item = { id: ++counter, severity, message, ...opts };
  listeners.forEach((fn) => fn(item));
  return item.id;
};

export const notify = (message, opts = {}) => emit(opts.severity || "info", message, opts);
notify.success = (message, opts) => emit("success", message, opts);
notify.error = (message, opts) => emit("error", message, opts);
notify.warning = (message, opts) => emit("warning", message, opts);
notify.info = (message, opts) => emit("info", message, opts);

export function NotificationHost() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const add = (item) => setQueue((q) => [...q, item]);
    listeners.add(add);
    return () => listeners.delete(add);
  }, []);

  const current = queue[0];

  const handleClose = useCallback(() => {
    setQueue((q) => {
      if (q[0] && typeof q[0].onClose === "function") q[0].onClose();
      return q.slice(1);
    });
  }, []);

  return (
    <CenterPopup
      key={current ? current.id : "idle"}
      open={Boolean(current)}
      message={current ? current.message : ""}
      severity={current ? current.severity : "info"}
      title={current ? current.title : undefined}
      autoHide={current ? current.autoHide : undefined}
      buttonText={current ? current.buttonText : undefined}
      onClose={handleClose}
    />
  );
}

export default CenterPopup;
