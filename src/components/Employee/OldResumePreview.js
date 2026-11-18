import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "axios";

// Preview of the resume the student uploaded earlier (PDF is shown inline;
// Word files cannot be rendered by the browser, so we show the name + a link).
export default function OldResumePreview({ url, name }) {
  const [blobUrl, setBlobUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const isPdf = /\.pdf$/i.test(name || url || "");

  useEffect(() => {
    if (!url || !isPdf) return undefined;
    let cancelled = false;
    let created = "";
    setLoading(true);
    setBlobUrl("");
    axios
      .get(url, { responseType: "blob" })
      .then((res) => {
        if (cancelled) return;
        created = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
        setBlobUrl(created);
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
      if (created) URL.revokeObjectURL(created);
    };
  }, [url, isPdf]);

  return (
    <div className="jd-preview">
      <div className="jd-preview-head">
        <span className="jd-chip"><DescriptionIcon /></span>
        <div className="jd-preview-name">
          <strong>Saved resume</strong>
          <span title={name || ""}>{name || "Your saved resume"}</span>
        </div>
        <a className="jd-mini" href={url} target="_blank" rel="noopener noreferrer">
          Open in new tab <OpenInNewIcon />
        </a>
      </div>
      <div className="jd-preview-frame">
        {!isPdf ? (
          <div className="jd-preview-msg">
            Preview is only available for PDF files. Use “Open in new tab” to view this resume.
          </div>
        ) : loading ? (
          <div className="jd-preview-msg"><CircularProgress size={36} /></div>
        ) : blobUrl ? (
          <iframe title="Your saved resume" src={blobUrl} />
        ) : (
          <div className="jd-preview-msg">
            The preview could not be loaded. Use “Open in new tab” to view it.
          </div>
        )}
      </div>
    </div>
  );
}
