import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import GroupsIcon from "@mui/icons-material/Groups";
import axios from "axios";
import { USE_DEMO_DATA, DEMO_SHORTLISTED } from "./demoData";
import VideoResumePlayerDialog from "./VideoResumePlayerDialog";
import PdfResumeViewerDialog from "./PdfResumeViewerDialog";
import PurpleDialog from "../Employee/PurpleDialog";
import "./shortlistedcandidates.css";
import { ONBOARD_CANDIDATE, SHORTLIST_CANDIDATES, SHORTLIST_ONBOARD } from "../../endpoints"; // Correct endpoint import

const initials = (name) =>
  (name || "?").trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

export default function ShortListedCandidates({ open, onClose, jobCode }) {
  const [loading, setLoading] = useState(false)
  const [appliedCandidates, setAppliedCandidates] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [player, setPlayer] = useState({ open: false, url: null, name: "" });
  const [pdf, setPdf] = useState({ open: false, url: null, name: "" });


  useEffect(() => {
    if (open && jobCode) {
      setLoading(true)
      axios.get(`${SHORTLIST_ONBOARD}${jobCode}`)
        .then((response) => {
          const data = Array.isArray(response.data) ? response.data : [];
          setAppliedCandidates(data.length === 0 && USE_DEMO_DATA ? DEMO_SHORTLISTED : data);
        })
        .catch((error) => {
          console.error("Error fetching candidates:", error);
          if (USE_DEMO_DATA) setAppliedCandidates(DEMO_SHORTLISTED);
        }).finally(() => {
          setLoading(false)
        })
    }
  }, [open, jobCode]);

  const handleActive = (row) => {

    const updatedCandidates = appliedCandidates.map(candidate => {
      if (candidate.application_code === row.application_code) {

        return {
          ...candidate,
          onboarded_status: !candidate.onboarded_status,
        };
      }
      return candidate;
    });


    setAppliedCandidates(updatedCandidates);


    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    axios
      .put(`${ONBOARD_CANDIDATE}${row.application_code}/`)
      .then((response) => {

        console.log(response);
      })
      .catch((error) => {

        console.error("Error onboarding candidate:", error);

        setAppliedCandidates(prevState =>
          prevState.map(candidate =>
            candidate.application_code === row.application_code
              ? { ...candidate, onboarded_status: !candidate.onboarded_status }
              : candidate
          )
        );
      });
  };


  const handleCloseDialog = () => {
    onClose();
    setAppliedCandidates([]);
    setSelectedJob(null);
  };

  const handleOpenPdf = (candidate) =>
    setPdf({
      open: true,
      url: candidate.resume_url || null,
      name: candidate.employee_name || "",
    });

  const handleOpenVideo = (candidate) =>
    setPlayer({
      open: true,
      url: candidate.video_resume_url || null,
      name: candidate.employee_name || "",
    });

  return (
    <>
      <PurpleDialog
        open={open}
        onClose={handleCloseDialog}
        title="Shortlisted Candidates"
        icon={<GroupsIcon />}
        width={760}
        loading={loading}
        actions={
          <button type="button" className="jd-btn jd-btn-outline" onClick={handleCloseDialog}>
            <CloseIcon /> Close
          </button>
        }
      >
        <div className="sc-list">
          {appliedCandidates.length > 0 ? (
            appliedCandidates.map((candidate, index) => (
              <div className="sc-row" key={candidate.application_code || index}>
                <span className="sc-avatar" aria-hidden="true">{initials(candidate.employee_name)}</span>
                <div className="sc-info">
                  <span className="sc-name" title={candidate.employee_name}>{candidate.employee_name || "-"}</span>
                  <span className="sc-meta">
                    {candidate.job_title || "-"} &middot; {candidate.application_code}
                  </span>
                </div>
                <div className="sc-actions">
                  <button
                    type="button"
                    className="sc-act"
                    onClick={() => handleOpenPdf(candidate)}
                    disabled={!candidate.resume_url}
                    title={candidate.resume_url ? "View resume" : "No resume"}
                    aria-label="View resume"
                  >
                    <VisibilityIcon />
                  </button>
                  <button
                    type="button"
                    className="sc-act"
                    onClick={() => handleOpenVideo(candidate)}
                    disabled={!candidate.video_resume_url}
                    title={candidate.video_resume_url ? "Watch video resume" : "No video resume"}
                    aria-label="Watch video resume"
                  >
                    <PlayArrowIcon />
                  </button>
                  <label className={`sc-onboard${candidate.onboarded_status ? " is-done" : ""}`}>
                    <Switch
                      checked={!!candidate.onboarded_status}
                      onChange={() => handleActive(candidate)}
                      inputProps={{ "aria-label": "Onboard candidate" }}
                      size="small"
                      disabled={!!candidate.onboarded_status}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": { color: "#3a0ca3" },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#3a0ca3" },
                      }}
                    />
                    {candidate.onboarded_status ? "Onboarded" : "Onboard"}
                  </label>
                </div>
              </div>
            ))
          ) : (
            <div className="sc-empty">{loading ? "Loading candidates..." : "No shortlisted candidates yet."}</div>
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