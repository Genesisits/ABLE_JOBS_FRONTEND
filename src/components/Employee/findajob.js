/* eslint-disable */
import * as React from "react";
import Layout from "../sidenav/Layout";
import Paper from "@mui/material/Paper";
import { GET_JOB, APPLY_JOB, UPLOAD_RESUME } from "./../../endpoints";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Typography, CircularProgress, Box, Modal } from "@mui/material";
import "./findajob.css";
import { useLocation } from "react-router-dom";

const customStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  height: "650px",
  p: 4,
};

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

  const location = useLocation();
  useEffect(() => {
    if (location.state?.fromLogin && !localStorage.getItem("findjobReloaded")) {
      localStorage.setItem("findjobReloaded", "true"); // Set reload flag
      window.location.reload(); // Reload the page
    }
  }, [location.state]);
  useEffect(() => {
    axios
      .get(GET_JOB)
      .then((response) => {
        const jobData = response.data;

        // Filter out jobs with activation_status: false
        const activeJobs = jobData.filter((job) => job.activation_status);

        setData(activeJobs);

        const companies = [
          ...new Set(activeJobs.map((job) => job.company_name)),
        ];
        const locations = [...new Set(activeJobs.map((job) => job.location))];
        const skills = [
          ...new Set(
            activeJobs.flatMap((job) =>
              job.skills.split(",").map((skill) => skill.trim())
            )
          ),
        ];
        const jobTitles = [...new Set(activeJobs.map((job) => job.job_title))];

        setUniqueCompanies(companies);
        setUniqueLocations(locations);
        setUniqueSkills([...skills, ...jobTitles]);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
      });
  }, []);

  const handleUploadNewResume = () => {
    setUploadDialogOpen(true); // Open the upload dialog
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Store the selected file
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("resume", selectedFile); // Append the file to FormData

    try {
      const response = await axios.post(UPLOAD_RESUME, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert("Resume uploaded successfully!");
        setUploadDialogOpen(false);
        ApplyJob();
      } else {
        alert("Failed to upload resume. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading resume. Please try again later.");
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
      } else {
        alert("Failed to apply for the job.");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setErrorMessage(
        error.response?.data?.detail ||
          "You have already applied for this job"
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
    setConfirmDialogOpen(true);
  };

  const filteredRows = rows.filter(
    (job) =>
      (job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
      job.company_name.toLowerCase().includes(companyQuery.toLowerCase()) &&
      job.location.toLowerCase().includes(locationQuery.toLowerCase()) &&
      (job.skills.toLowerCase().includes(skillsQuery.toLowerCase()) ||
        job.job_title.toLowerCase().includes(skillsQuery.toLowerCase()))
  );
  const closeSuccessModal = () => {
    setSuccess(false);
    // closeModal();
  };
  return (
    <Layout>
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        aria-labelledby="upload-resume-title"
      >
        <DialogTitle id="upload-resume-title">Upload New Resume</DialogTitle>
        <DialogContent className="dialog-content">
          <Typography className="file-label">
            Select your resume file to upload:
          </Typography>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleFileUpload}
            color="primary"
            className="upload-button"
            startIcon={
              <UploadFileIcon fontSize="small" className="upload-icon" />
            }
          >
            Upload & Apply
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Resume Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
            Do you want to continue with the existing resume or upload a new
            one?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUseExistingResume} color="primary">
            Use Existing Resume
          </Button>
          <Button onClick={handleUploadNewResume} color="secondary">
            Upload New Resume
          </Button>
        </DialogActions>
      </Dialog>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <div className="search-container">
          <div className="search-bar1">
            <input
              type="text"
              list="company-options"
              placeholder="Type or select a company"
              className="dropdown-input"
              style={{ width: "27%" }}
              value={companyQuery}
              onChange={(e) => setCompanyQuery(e.target.value)}
            />
            <datalist id="company-options">
              {uniqueCompanies.map((company, index) => (
                <option key={index} value={company} />
              ))}
            </datalist>

            <input
              type="text"
              list="location-options"
              placeholder="Type or select a location"
              className="dropdown-input"
              style={{ width: "27%" }}
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
            />
            <datalist id="location-options">
              {uniqueLocations.map((location, index) => (
                <option key={index} value={location} />
              ))}
            </datalist>
            <input
              type="text"
              list="skills-options"
              placeholder="Type or select a skill/Designation"
              className="dropdown-input"
              style={{ width: "35%" }}
              value={skillsQuery}
              onChange={(e) => setSkillsQuery(e.target.value)}
            />
            <datalist id="skills-options">
              {uniqueSkills.map((skill, index) => (
                <option key={index} value={skill} />
              ))}
            </datalist>

            <button className="search-button">Search</button>
          </div>
        </div>

        <div className="job-container">
          {filteredRows.length > 0 ? (
            filteredRows.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-details">
                  <p>{job.job_title}</p>
                  <p>{job.company_name}</p>
                </div>
                <div className="job-info">
                  <p>{job.location}</p>
                  <p>{job.employment_type}</p>
                </div>
                <div className="job-info">
                  <p>{job.industry}</p>
                  <p>{job.work_mode}</p>
                </div>
                <div className="button-container">
                  <button
                    className="findajob_button"
                    onClick={() => handleOpenDialog(job)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-jobs">No Jobs Found Here</div>
          )}
        </div>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>Job Details</DialogTitle>
          <DialogContent>
            {selectedJob && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr ",
                  gap: "8px",
                }}
              >
                <p>
                  <strong>Job Title:</strong> {selectedJob.job_title}
                </p>
                <p>
                  <strong>Company:</strong> {selectedJob.company_name}
                </p>
                <p>
                  <strong>Location:</strong> {selectedJob.location}
                </p>
                <p>
                  <strong>Employment Type:</strong>{" "}
                  {selectedJob.employment_type}
                </p>
                <p>
                  <strong>Skills Required:</strong> {selectedJob.skills}
                </p>
                <p>
                  <strong>Department:</strong> {selectedJob.department}
                </p>
                <p>
                  <strong>Industry:</strong> {selectedJob.industry}
                </p>
                <p>
                  <strong>Work Mode:</strong> {selectedJob.work_mode}
                </p>
                <p>
                  <strong>Salary Offered:</strong> {selectedJob.salary_offered}
                </p>
                <p>
                  <strong>Experience Required:</strong>{" "}
                  {selectedJob.experience_required}
                </p>
                <p>
                  <strong>Company Website:</strong>{" "}
                  <a
                    href={selectedJob.company_website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedJob.company_website}
                  </a>
                </p>
                <p>
                  <strong>Number of Positions:</strong>{" "}
                  {selectedJob.number_of_positions}
                </p>
                <p>
                  <strong>Notice Period:</strong> {selectedJob.notice_period}
                </p>
                <p>
                  <strong>Job Code:</strong> {selectedJob.code}
                </p>
                <p>
                  <strong>Description:</strong> {selectedJob.description}
                </p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
            <Button
              onClick={handleApplyNow}
              color="secondary"
              variant="contained"
            >
              Apply Now
            </Button>
          </DialogActions>
        </Dialog>
        <Modal
          open={success}
          onClose={closeSuccessModal}
          aria-labelledby="success-modal-title"
          aria-describedby="success-modal-description"
        >
          <Box
            sx={{
              ...customStyles,
              width: "40%",
              height: "auto",
              textAlign: "center",
            }}
          >
            <Typography id="success-modal-title" variant="h6" component="h2">
              {"Job Applied Successfully!"}
            </Typography>
            <Typography
              id="success-modal-description"
              sx={{ mt: 2, fontSize: "16px" }}
            >
              The job applied successfully.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={closeSuccessModal}
              sx={{ mt: 3 }}
            >
              Close
            </Button>
          </Box>
        </Modal>
        <Modal
          open={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
          aria-labelledby="error-modal-title"
          aria-describedby="error-modal-description"
        >
          <Box
            sx={{
              ...customStyles,
              width: "40%",
              height: "auto",
              textAlign: "center",
            }}
          >
            <Typography
              id="error-modal-title"
              variant="h6"
              component="h2"
              color="error"
            >
              Error
            </Typography>
            <Typography
              id="error-modal-description"
              sx={{ mt: 2, fontSize: "16px" }}
            >
              {errorMessage}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setErrorModalOpen(false)}
              sx={{ mt: 3 }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Paper>
    </Layout>
  );
}

export default Findjob;
