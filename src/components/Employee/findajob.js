import * as React from "react";
import Layout from "../sidenav/Layout";
import { GET_JOB, APPLY_JOB, APPLIED_JOB, UPLOAD_RESUME, MY_RESUME } from "./../../endpoints";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import VideoResumeField from "./VideoResumeField";
import OldResumePreview from "./OldResumePreview";
import PurpleDialog, { FilePick } from "./PurpleDialog";
import DescriptionIcon from "@mui/icons-material/Description";
import VideocamIcon from "@mui/icons-material/Videocam";
import { notify, CenterPopup } from "../notify/Notify";
import "./findajob.css";
import "../ajhdash/dashboard-theme.css";
import "../employer/jobs-cards.css";
import BusinessIcon from "@mui/icons-material/Business";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessibleIcon from "@mui/icons-material/Accessible";
import StarIcon from "@mui/icons-material/Star";
import BoltIcon from "@mui/icons-material/Bolt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import SettingsIcon from "@mui/icons-material/Settings";
import FactoryIcon from "@mui/icons-material/Factory";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PaymentsIcon from "@mui/icons-material/Payments";
import PublicIcon from "@mui/icons-material/Public";
import GroupsIcon from "@mui/icons-material/Groups";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { USE_DEMO_DATA, DEMO_JOBS } from "../employer/demoData";
import { useLocation } from "react-router-dom";

// "New Job" = posted within the last 7 days. "Featured" needs a `featured` flag from the API.
const isNewJob = (job) => {
  if (!job.posted_date) return false;
  const days = (Date.now() - new Date(job.posted_date).getTime()) / 86400000;
  return days >= 0 && days <= 7;
};

// One "icon chip + Label: value" row of the Job Details dialog
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

function Findjob({ closeModal }) {
  const [rows, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [companyQuery, setCompanyQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [uniqueCompanies, setUniqueCompanies] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [skillsQuery, setSkillsQuery] = useState("");
  const [uniqueSkills, setUniqueSkills] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected resume file
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // State for the video resume (file or 1-min recording)
  const [appliedCodes, setAppliedCodes] = useState([]); // job codes this student already applied to
  const [savedResume, setSavedResume] = useState(null); // { resume_url, resume_name } of the old resume
  const [noResumeDialogOpen, setNoResumeDialogOpen] = useState(false); // "resume not found" popup
  const [checkingResume, setCheckingResume] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.fromLogin && !localStorage.getItem("findjobReloaded")) {
      localStorage.setItem("findjobReloaded", "true"); // Set reload flag
      window.location.reload(); // Reload the page
    }
  }, [location.state]);
  // Show every job employers have added (deactivated jobs are hidden)
  const loadJobs = (jobData) => {
    const activeJobs = jobData.filter((job) => job.activation_status);
    setData(activeJobs);
    setUniqueCompanies([...new Set(activeJobs.map((job) => job.company_name))]);
    setUniqueLocations([...new Set(activeJobs.map((job) => job.location))]);
    const skills = activeJobs.flatMap((job) =>
      (job.skills || "").split(",").map((skill) => skill.trim()).filter(Boolean)
    );
    const jobTitles = activeJobs.map((job) => job.job_title);
    setUniqueSkills([...new Set([...skills, ...jobTitles])]);
  };

  useEffect(() => {
    axios
      .get(GET_JOB)
      .then((response) => {
        const apiJobs = Array.isArray(response.data) ? response.data : [];
        loadJobs(apiJobs.length === 0 && USE_DEMO_DATA ? DEMO_JOBS : apiJobs);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
        // Backend unreachable: show the jobs employers added (sample data)
        if (USE_DEMO_DATA) loadJobs(DEMO_JOBS);
      });
  }, []);

  // Remember which jobs this student has already applied to (from the database)
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    axios
      .get(APPLIED_JOB, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (Array.isArray(res.data)) setAppliedCodes(res.data.map((j) => j.code));
      })
      .catch(() => { });
  }, []);

  const handleUploadNewResume = () => {
    setConfirmDialogOpen(false);
    setNoResumeDialogOpen(false);
    setUploadDialogOpen(true); // Open the upload dialog
  };

  const handleFileChange = (file) => {
    setSelectedFile(file || null); // Store the selected file
  };

  const handleFileUpload = async () => {
    // A resume file is needed unless the student already has one saved
    if (!selectedFile && !savedResume) {
      notify.warning("Please select your resume file (PDF or Word) to continue.", { title: "Resume required" });
      return;
    }

    const token = localStorage.getItem("access_token");
    const formData = new FormData();
    if (selectedFile) formData.append("resume", selectedFile); // Append the file to FormData
    if (selectedVideo) formData.append("video_resume", selectedVideo); // 1-minute video resume

    try {
      const response = await axios.post(UPLOAD_RESUME, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        notify.success("Resume uploaded successfully!");
        setUploadDialogOpen(false);
        setSelectedFile(null);
        setSelectedVideo(null);
        ApplyJob(); // resume is now on the server, so the apply call will pass
      } else {
        notify.error("Failed to upload resume. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      notify.error("Error uploading resume. Please try again later.");
    }
  };

  const handleOpenDialog = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
  };
  const ApplyJob = async () => {
    if (!selectedJob) return;

    const token = localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        APPLY_JOB,
        { job_code: selectedJob.code },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setSuccess(true);
        setConfirmDialogOpen(false);
        setOpenDialog(false);
        setAppliedCodes((prev) => [...prev, selectedJob.code]);
      } else {
        notify.error("Failed to apply for the job.");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setConfirmDialogOpen(false);
      if (error.response?.data?.code === "resume_missing") {
        setSavedResume(null);
        setNoResumeDialogOpen(true);
        return;
      }
      setErrorMessage(
        error.response?.data?.error ||
        error.response?.data?.detail ||
        "Could not apply for this job. Please try again."
      );
      setErrorModalOpen(true);
    }
  };
  const handleUseExistingResume = () => {
    setConfirmDialogOpen(false);
    ApplyJob();
  };

  // const handleUploadNewResume = () => {
  //   setConfirmDialogOpen(false);
  //   // Logic for uploading a new resume
  //   alert("Navigate to upload new resume screen!");
  // };

  const handleApplyNow = async () => {
    if (selectedJob?.isDemo) {
      // Sample rows are not in the database, so the server would answer 404.
      setErrorMessage(
        "This is a sample job shown because no real jobs were returned by the server. Ask an employer to post a job, then apply to it."
      );
      setErrorModalOpen(true);
      return;
    }
    // Look up the resume this student uploaded before
    const token = localStorage.getItem("access_token");
    setCheckingResume(true);
    try {
      const res = await axios.get(MY_RESUME, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data?.has_resume) {
        setSavedResume({ resume_url: res.data.resume_url, resume_name: res.data.resume_name });
        setConfirmDialogOpen(true); // shows the old resume preview
      } else {
        setSavedResume(null);
        setNoResumeDialogOpen(true); // "resume not found, please upload"
      }
    } catch (error) {
      console.error("Could not check resume:", error);
      notify.error("Could not check your resume. Please try again.");
    } finally {
      setCheckingResume(false);
    }
  };

  const filteredRows = rows.filter(
    (job) =>
      ((job.job_title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.company_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.location || "").toLowerCase().includes(searchQuery.toLowerCase())) &&
      (job.company_name || "").toLowerCase().includes(companyQuery.toLowerCase()) &&
      (job.location || "").toLowerCase().includes(locationQuery.toLowerCase()) &&
      ((job.skills || "").toLowerCase().includes(skillsQuery.toLowerCase()) ||
        (job.job_title || "").toLowerCase().includes(skillsQuery.toLowerCase()))
  );
  const closeSuccessModal = () => {
    setSuccess(false);
    // closeModal();
  };
  return (
    <Layout bare>
      {/* Upload (or replace) the resume while applying */}
      <PurpleDialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        title="Upload Resume"
        icon={<UploadFileIcon />}
        actions={
          <>
            <button type="button" className="jd-btn jd-btn-outline" onClick={() => setUploadDialogOpen(false)}>
              <CloseIcon /> Cancel
            </button>
            <button type="button" className="jd-btn jd-btn-fill" onClick={handleFileUpload}>
              <CheckIcon /> Upload &amp; Apply
            </button>
          </>
        }
      >
        <p className="jd-lead">
          {savedResume
            ? "Choose a new resume to replace your old one. We will apply for this job with it."
            : "Please upload your resume to apply for this job."}
        </p>

        <div className="jd-section">
          <div className="jd-section-title">
            <DescriptionIcon /> Resume <em>(PDF or Word)</em>
            {!savedResume && <span className="jd-req">*</span>}
          </div>
          <FilePick
            file={selectedFile}
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            label="Click to choose your resume"
            hint="PDF, DOC or DOCX"
          />
          {savedResume && !selectedFile && (
            <div className="jd-saved">Current resume: {savedResume.resume_name}</div>
          )}
        </div>

        <div className="jd-section">
          <div className="jd-section-title">
            <VideocamIcon /> Video resume <em>(optional, up to 1 minute)</em>
          </div>
          <div className="jd-video">
            <VideoResumeField
              value={selectedVideo}
              onChange={setSelectedVideo}
              onError={(m) => notify.error(m)}
            />
          </div>
        </div>
      </PurpleDialog>

      {/* Old resume found: preview it and let the student reuse or replace it */}
      <PurpleDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        title="Your Resume"
        icon={<DescriptionIcon />}
        width={860}
        actions={
          <>
            <button type="button" className="jd-btn jd-btn-outline" onClick={handleUploadNewResume}>
              <UploadFileIcon /> Upload New Resume
            </button>
            <button type="button" className="jd-btn jd-btn-fill" onClick={handleUseExistingResume}>
              <CheckIcon /> Apply With This Resume
            </button>
          </>
        }
      >
        <p className="jd-lead">
          We found the resume you uploaded earlier. Apply with this resume, or upload a new one.
        </p>
        {savedResume && (
          <OldResumePreview url={savedResume.resume_url} name={savedResume.resume_name} />
        )}
      </PurpleDialog>

      {/* No resume on file: tell the student to upload one while applying */}
      <PurpleDialog
        open={noResumeDialogOpen}
        onClose={() => setNoResumeDialogOpen(false)}
        title="Resume not found"
        icon={<ErrorOutlineIcon />}
        actions={
          <>
            <button type="button" className="jd-btn jd-btn-outline" onClick={() => setNoResumeDialogOpen(false)}>
              <CloseIcon /> Cancel
            </button>
            <button type="button" className="jd-btn jd-btn-fill" onClick={handleUploadNewResume}>
              <UploadFileIcon /> Upload Resume
            </button>
          </>
        }
      >
        <div className="jd-notice">
          <ErrorOutlineIcon />
          <p>Your resume was not there. Please upload your resume while applying for this job.</p>
        </div>
      </PurpleDialog>
      <>
        <div className="ajh-search" role="search">
          <label className="ajh-field" title="">
            <ApartmentIcon />
            <input
              type="text"
              title=""
              list="company-options"
              placeholder="Type or select a company"
              aria-label="Company"
              value={companyQuery}
              onChange={(e) => setCompanyQuery(e.target.value)}
            />
            <KeyboardArrowDownIcon />
          </label>
          <datalist id="company-options">
            {uniqueCompanies.map((company, index) => (
              <option key={index} value={company} />
            ))}
          </datalist>

          <label className="ajh-field" title="">
            <PlaceIcon />
            <input
              type="text"
              title=""
              list="location-options"
              placeholder="Type or select a location"
              aria-label="Location"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
            />
            <KeyboardArrowDownIcon />
          </label>
          <datalist id="location-options">
            {uniqueLocations.map((location, index) => (
              <option key={index} value={location} />
            ))}
          </datalist>

          <label className="ajh-field" title="">
            <StarIcon />
            <input
              type="text"
              title=""
              list="skills-options"
              placeholder="Type or select a skill/Designation"
              aria-label="Skill or designation"
              value={skillsQuery}
              onChange={(e) => setSkillsQuery(e.target.value)}
            />
            <KeyboardArrowDownIcon />
          </label>
          <datalist id="skills-options">
            {uniqueSkills.map((skill, index) => (
              <option key={index} value={skill} />
            ))}
          </datalist>

          <button type="button" className="ajh-btn">
            <SearchIcon /> Search
          </button>
        </div>

        <div className="ajh-list">
          {filteredRows.length > 0 ? (
            filteredRows.map((job) => (
              <article key={job.code || job.id} className="ajh-card">
                <div className="ajh-logo">
                  <div>
                    {job.company_logo ? (
                      <img src={job.company_logo} alt="" style={{ maxWidth: 90, maxHeight: 60 }} />
                    ) : (
                      <div className="ajh-logo-badge">{(job.company_name || "?").charAt(0)}</div>
                    )}
                    <small className="ajh-logo-name">{job.company_name}</small>
                  </div>
                </div>

                <div className="ajh-body">
                  <h3 className="ajh-title">{job.job_title}</h3>
                  <div className="ajh-company">
                    <BusinessIcon fontSize="small" /> {job.company_name}
                  </div>
                  <div className="ajh-meta">
                    <span><PlaceIcon /> {job.location}</span>
                    <span><AccessTimeIcon /> {job.employment_type}</span>
                    <span><AccessibleIcon /> Open to Differently Abled</span>
                  </div>
                  <div className="ajh-tags">
                    {job.industry && <span className="ajh-tag">{job.industry}</span>}
                    {job.work_mode && <span className="ajh-tag">{job.work_mode}</span>}
                  </div>
                </div>

                {job.featured ? (
                  <span className="ajh-badge featured"><StarIcon fontSize="small" /> Featured Job</span>
                ) : isNewJob(job) ? (
                  <span className="ajh-badge new"><BoltIcon fontSize="small" /> New Job</span>
                ) : null}

                <div className="ajh-actions">
                  <button type="button" className="ajh-btn" onClick={() => handleOpenDialog(job)}>
                    View Details <ArrowForwardIcon />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="ajh-empty">No Jobs Found Here</div>
          )}
        </div>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
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
            <button type="button" className="jd-x" onClick={handleCloseDialog} aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          {selectedJob && (
            <div className="jd-body">
              <div className="jd-grid">
                <div className="jd-col">
                  <DetailRow icon={<WorkOutlineIcon />} label="Job Title">{selectedJob.job_title}</DetailRow>
                  <DetailRow icon={<ApartmentIcon />} label="Company">{selectedJob.company_name}</DetailRow>
                  <DetailRow icon={<PlaceIcon />} label="Location">{selectedJob.location}</DetailRow>
                  <DetailRow icon={<AccessTimeIcon />} label="Employment Type">{selectedJob.employment_type}</DetailRow>
                  <DetailRow icon={<SettingsIcon />} label="Skills Required">{selectedJob.skills}</DetailRow>
                  <DetailRow icon={<CorporateFareIcon />} label="Department">{selectedJob.department}</DetailRow>
                </div>
                <div className="jd-col">
                  <DetailRow icon={<FactoryIcon />} label="Industry">{selectedJob.industry}</DetailRow>
                  <DetailRow icon={<HomeWorkIcon />} label="Work Mode">{selectedJob.work_mode}</DetailRow>
                  <DetailRow icon={<PaymentsIcon />} label="Salary Offered">{selectedJob.salary_offered}</DetailRow>
                  <DetailRow icon={<StarIcon />} label="Experience Required">{selectedJob.experience_required}</DetailRow>
                  <DetailRow icon={<PublicIcon />} label="Company Website">
                    {selectedJob.company_website ? (
                      <a href={selectedJob.company_website} target="_blank" rel="noopener noreferrer">
                        {selectedJob.company_website} <OpenInNewIcon className="jd-link-icon" />
                      </a>
                    ) : null}
                  </DetailRow>
                  <DetailRow icon={<GroupsIcon />} label="Number of Positions">{selectedJob.number_of_positions}</DetailRow>
                </div>
              </div>

              <div className="jd-about">
                <VerifiedUserIcon className="jd-about-icon" />
                <span className="jd-about-bar" />
                <div className="jd-about-text">
                  <h4>About the Job</h4>
                  <p>{(selectedJob.description || "").trim() || "Be a part of our growing team and build your career with us."}</p>
                  <small>
                    {selectedJob.notice_period ? (
                      <span><ScheduleIcon fontSize="inherit" /> Notice period: {selectedJob.notice_period}</span>
                    ) : null}
                    {selectedJob.code ? <span>Job code: {selectedJob.code}</span> : null}
                  </small>
                </div>
              </div>

              <div className="jd-actions">
                <button type="button" className="jd-btn jd-btn-outline" onClick={handleCloseDialog}>
                  <CloseIcon /> Close
                </button>
                <button
                  type="button"
                  className="jd-btn jd-btn-fill"
                  onClick={handleApplyNow}
                  disabled={checkingResume || appliedCodes.includes(selectedJob.code)}
                >
                  <CheckIcon />
                  {appliedCodes.includes(selectedJob.code)
                    ? "Applied"
                    : checkingResume
                      ? "Checking resume..."
                      : "Apply Now"}
                </button>
              </div>
            </div>
          )}
        </Dialog>
        <CenterPopup
          open={success}
          severity="success"
          title="Job Applied Successfully!"
          message="The job applied successfully."
          onClose={closeSuccessModal}
        />
        <CenterPopup
          open={errorModalOpen}
          severity="error"
          title="Could not apply"
          message={errorMessage}
          onClose={() => setErrorModalOpen(false)}
        />
      </>
    </Layout>
  );
}

export default Findjob;