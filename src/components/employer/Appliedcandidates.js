import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import GroupsIcon from "@mui/icons-material/Groups";
import axios from "axios";
import { APPLIED_CANDIDATES, SHORTLIST_CANDIDATES, ERESUME } from "../../endpoints";
import VideoResumePlayerDialog from "./VideoResumePlayerDialog";
import PdfResumeViewerDialog from "./PdfResumeViewerDialog";
import PurpleDialog from "../Employee/PurpleDialog";
import "./shortlistedcandidates.css";

const initials = (name) =>
  (name || "?").trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

export default function AppliedCandidatesDialog({ open, onClose, jobCode }) {
  const [loading, setLoading] = useState(false);
  const [appliedCandidates, setAppliedCandidates] = useState([]);
  const [player, setPlayer] = useState({ open: false, url: null, name: "" });
  const [pdf, setPdf] = useState({ open: false, url: null, name: "" });

  // Fetch applied candidates
  useEffect(() => {
    if (open && jobCode) {
      setLoading(true);
      axios
        .get(`${APPLIED_CANDIDATES}${jobCode}`)
        .then((response) => {
          setAppliedCandidates(Array.isArray(response.data) ? response.data : []);
        })
        .catch((error) => {
          console.error("Error fetching candidates:", error);
          setAppliedCandidates([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, jobCode]);

  // Toggle active status
  const handleActive = (row) => {
    const updatedCandidates = appliedCandidates.map((candidate) =>
      candidate.application_code === row.application_code
        ? { ...candidate, shortlisted_status: !candidate.shortlisted_status }
        : candidate
    );
    setAppliedCandidates(updatedCandidates);

    axios
      .put(`${SHORTLIST_CANDIDATES}${row.application_code}/`, {
        shortlisted_status: !row.shortlisted_status,
      })
      .catch((error) => {
        console.error("Error updating candidate status:", error);
        // Revert toggle in case of error
        setAppliedCandidates((prevState) =>
          prevState.map((candidate) =>
            candidate.application_code === row.application_code
              ? { ...candidate, shortlisted_status: !candidate.shortlisted_status }
              : candidate
          )
        );
      });
  };

  // Get the student's resume data. Uses the URL already on the list row when
  // there is one; otherwise asks the server (/eresume/<application_code>/) for the
  // student's latest upload, so a missing/stale value on the row never hides a file.
  const fetchResumeData = (candidate) =>
    axios
      .get(`${ERESUME}${candidate.application_code}/`)
      .then((response) => response.data || {})
      .catch((error) => {
        console.error("Error fetching student resume data:", error);
        return {};
      });

  const handleOpenVideo = async (candidate) => {
    const name = candidate.employee_name || "";
    if (candidate.video_resume_url) {
      setPlayer({ open: true, url: candidate.video_resume_url, name });
      return;
    }
    const data = await fetchResumeData(candidate);
    setPlayer({ open: true, url: data.video_resume_url || null, name });
  };

  const handleOpenPdf = async (candidate) => {
    const name = candidate.employee_name || "";
    if (candidate.resume_url) {
      setPdf({ open: true, url: candidate.resume_url, name });
      return;
    }
    const data = await fetchResumeData(candidate);
    setPdf({ open: true, url: data.resume_url || null, name });
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    onClose();
    setAppliedCandidates([]);
  };

  return (
    <>
      <PurpleDialog
        open={open}
        onClose={handleCloseDialog}
        title="Applied Candidates"
        icon={<GroupsIcon />}
        width={900}
        loading={loading}
        actions={
          <button type="button" className="jd-btn jd-btn-outline" onClick={handleCloseDialog}>
            <CloseIcon /> Close
          </button>
        }
      >
        <div className="sc-list">
          {appliedCandidates.length > 0 ? (
            appliedCandidates.map((candidate) => {
              const status = candidate.onboarded_status
                ? "Onboarded"
                : candidate.shortlisted_status
                  ? "Shortlisted"
                  : "Applied";
              const appliedOn = candidate.applied_at
                ? new Date(candidate.applied_at).toLocaleDateString()
                : "-";
              return (
                <div className="sc-row" key={candidate.application_code}>
                  <span className="sc-avatar" aria-hidden="true">{initials(candidate.employee_name)}</span>
                  <div className="sc-info">
                    <span className="sc-name" title={candidate.employee_name}>{candidate.employee_name || "-"}</span>
                    <span className="sc-meta" title={candidate.employee_email}>
                      {candidate.employee_email || "-"} &middot; Applied {appliedOn}
                    </span>
                    <span className="sc-meta">Code: {candidate.application_code}</span>
                  </div>
                  <span className={`sc-status is-${status.toLowerCase()}`}>{status}</span>
                  <div className="sc-actions">
                    <button
                      type="button"
                      className="sc-act"
                      onClick={() => handleOpenPdf(candidate)}
                      title="View resume"
                      aria-label="View resume"
                    >
                      <VisibilityIcon />
                    </button>
                    <button
                      type="button"
                      className="sc-act"
                      onClick={() => handleOpenVideo(candidate)}
                      title={candidate.video_resume_url === null ? "No video resume" : "Watch video resume"}
                      aria-label="Watch video resume"
                    >
                      <PlayArrowIcon />
                    </button>
                    {candidate.onboarded_status ? (
                      <button type="button" className="sc-pill sc-pill-done" disabled>
                        <CheckCircleIcon /> Onboarded
                      </button>
                    ) : candidate.shortlisted_status ? (
                      <button type="button" className="sc-pill sc-pill-remove" onClick={() => handleActive(candidate)}>
                        <PersonRemoveIcon /> Remove Shortlist
                      </button>
                    ) : (
                      <button type="button" className="sc-pill sc-pill-add" onClick={() => handleActive(candidate)}>
                        <CheckCircleIcon /> Approve Shortlist
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="sc-empty">{loading ? "Loading candidates..." : "No applied candidates found."}</div>
          )}
        </div>
      </PurpleDialog>

      <PdfResumeViewerDialog
        open={pdf.open}
        url={pdf.url}
        candidateName={pdf.name}
        onClose={() => setPdf({ open: false, url: null, name: "" })}
      />
      <VideoResumePlayerDialog
        open={player.open}
        url={player.url}
        candidateName={player.name}
        onClose={() => setPlayer({ open: false, url: null, name: "" })}
      />
    </>
  );
}