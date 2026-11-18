import React from "react";
import { Dialog } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsIcon from "@mui/icons-material/Settings";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import FactoryIcon from "@mui/icons-material/Factory";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PaymentsIcon from "@mui/icons-material/Payments";
import StarIcon from "@mui/icons-material/Star";
import PublicIcon from "@mui/icons-material/Public";
import GroupsIcon from "@mui/icons-material/Groups";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import "./findajob.css"; // jd-* styles (purple Job Details modal)

// One "icon chip + Label: value" row
function DetailRow({ icon, label, children }) {
  return (
    <div className="jd-row">
      <span className="jd-chip">{icon}</span>
      <div className="jd-text">
        <strong className="jd-label">{label}:</strong>
        <span className="jd-value">{children || "-"}</span>
      </div>
    </div>
  );
}

/**
 * Purple "Job Details" modal.
 * Props:
 *  - open, onClose, job
 *  - primaryLabel   text of the filled button (default "Applied")
 *  - onPrimary      click handler for the filled button
 *  - primaryDisabled disable the filled button (default true -> status badge look)
 */
export default function JobDetailsDialog({
  open,
  onClose,
  job,
  primaryLabel = "Applied",
  onPrimary,
  primaryDisabled = true,
}) {
  return (
    <Dialog
      open={!!open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ className: "jd-paper" }}
    >
      <div className="jd-header">
        <svg className="jd-swoosh" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 100 C 170 100, 300 70, 400 0" fill="none" stroke="#fbbf24" strokeWidth="7" />
        </svg>
        <WorkOutlineIcon className="jd-header-icon" />
        <span className="jd-header-bar" />
        <h2 className="jd-header-title">Job Details</h2>
        <button type="button" className="jd-x" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
      </div>

      {job && (
        <div className="jd-body">
          <div className="jd-grid">
            <div className="jd-col">
              <DetailRow icon={<WorkOutlineIcon />} label="Job Title">{job.job_title}</DetailRow>
              <DetailRow icon={<ApartmentIcon />} label="Company">{job.company_name}</DetailRow>
              <DetailRow icon={<PlaceIcon />} label="Location">{job.location}</DetailRow>
              <DetailRow icon={<AccessTimeIcon />} label="Employment Type">{job.employment_type}</DetailRow>
              <DetailRow icon={<SettingsIcon />} label="Skills Required">{job.skills}</DetailRow>
              <DetailRow icon={<CorporateFareIcon />} label="Department">{job.department}</DetailRow>
            </div>
            <div className="jd-col">
              <DetailRow icon={<FactoryIcon />} label="Industry">{job.industry}</DetailRow>
              <DetailRow icon={<HomeWorkIcon />} label="Work Mode">{job.work_mode}</DetailRow>
              <DetailRow icon={<PaymentsIcon />} label="Salary Offered">{job.salary_offered}</DetailRow>
              <DetailRow icon={<StarIcon />} label="Experience Required">{job.experience_required}</DetailRow>
              <DetailRow icon={<PublicIcon />} label="Company Website">
                {job.company_website ? (
                  <a href={job.company_website} target="_blank" rel="noopener noreferrer">
                    {job.company_website} <OpenInNewIcon className="jd-link-icon" />
                  </a>
                ) : null}
              </DetailRow>
              <DetailRow icon={<GroupsIcon />} label="Number of Positions">{job.number_of_positions}</DetailRow>
            </div>
          </div>

          <div className="jd-about">
            <VerifiedUserIcon className="jd-about-icon" />
            <span className="jd-about-bar" />
            <div className="jd-about-text">
              <h4>About the Job</h4>
              <p>{(job.description || "").trim() || "Be a part of our growing team and build your career with us."}</p>
              <small>
                {job.notice_period ? (
                  <span><ScheduleIcon fontSize="inherit" /> Notice period: {job.notice_period}</span>
                ) : null}
                {job.code ? <span>Job code: {job.code}</span> : null}
              </small>
            </div>
          </div>

          <div className="jd-actions">
            <button type="button" className="jd-btn jd-btn-outline" onClick={onClose}>
              <CloseIcon /> Close
            </button>
            <button
              type="button"
              className="jd-btn jd-btn-fill"
              onClick={onPrimary}
              disabled={primaryDisabled}
            >
              <CheckIcon /> {primaryLabel}
            </button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
