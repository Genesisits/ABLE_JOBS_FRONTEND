import * as React from 'react';
import Layout from '../sidenav/Layout';
import Paper from '@mui/material/Paper';
import { GET_JOB,APPLY_JOB } from './../../endpoints';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Typography, CircularProgress, Box, Modal} from "@mui/material";
import './findajob.css';

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
  const [success , setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  useEffect(() => {
    axios.get(GET_JOB)
      .then(response => {
        const jobData = response.data;
        setData(jobData);

        const companies = [...new Set(jobData.map(job => job.company_name))];
        const locations = [...new Set(jobData.map(job => job.location))];
        setUniqueCompanies(companies);
        setUniqueLocations(locations);
      });
  }, []);

  const handleOpenDialog = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
  };

  const handleApplyNow = async () => {
    if (!selectedJob) return;
  
    const token = localStorage.getItem("access_token");
    console.log("Token being sent:", token);
    
    const requestBody = { job_code: selectedJob.code };
    console.log("Request body:", requestBody);
    console.log("Authorization Header:", { Authorization: `Bearer ${token}` });
  
    try {
      const response = await axios.post(
        APPLY_JOB,
        requestBody,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 201) {
        setSuccess(true)
      } else {
        alert("Failed to apply for the job.");
      }
    } catch (error) {
      console.error("Full error response:", error.response);
    
      if (error.response?.status === 400 && error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
        setErrorModalOpen(true);
      } else {
        setErrorMessage(error.response?.data?.detail || "There was an error applying for the job.");
        setErrorModalOpen(true);
      }
    }
  };
  
  
  const filteredRows = rows.filter(job => 
    (job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
    job.company_name.toLowerCase().includes(companyQuery.toLowerCase()) &&
    job.location.toLowerCase().includes(locationQuery.toLowerCase())
  );
  const closeSuccessModal = () => {
    setSuccess(false);
    // closeModal();
  };
  return (
    <Layout>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <div className="search-container">
          <div className="search-bar1">
            <input
              type="text"
              placeholder="Enter skills / designations / companies"
              className="search-input"
              style={{ width: '30%' }}
              value={searchQuery}  
              onChange={(e) => setSearchQuery(e.target.value)}  
            />

            <input 
              type="text" 
              list="company-options" 
              placeholder="Type or select a company" 
              className="dropdown-input"
              style={{ width: '30%' }}
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
              style={{ width: '30%' }}
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
            />
            <datalist id="location-options">
              {uniqueLocations.map((location, index) => (
                <option key={index} value={location} />
              ))}
            </datalist>

            <button className="search-button">Search</button>
          </div>
        </div>

        <div style={{ 
          maxHeight: '500px', 
          overflowY: 'scroll',
          marginTop: '20px', 
          padding: '0 20px' 
        }}>
           {filteredRows.map(job => (
            <div 
              key={job.id} 
              style={{ 
                border: '1px solid #6c757d', 
                margin: '20px 50px', 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-evenly', 
                borderRadius: '5px' 
              }}
            >
              <div style={{ flex: 0.5, fontFamily: 'sans-serif', color: 'black' }}>
                <p style={{ margin: 0}}>{job.job_title}</p>
                <p style={{ margin: 0 }}>{job.company_name}</p>
              </div>
              <div style={{ flex: 1, fontFamily: 'Serif', color: 'black' }}>
                <p style={{ margin: 0 }}>{job.location}</p>
                <p style={{ margin: 0 }}>{job.employment_type}</p>
              </div>
              <div style={{ flex: 0.5, textAlign: 'center' }}>
                <button className='findajob_button' style={{ marginTop: '5%' ,marginLeft:'-5%' }}
                 onClick={() => handleOpenDialog(job)}
                >View</button>
              </div>
            </div>
          ))}
        </div>
        
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
          <DialogTitle>Job Details</DialogTitle>
          <DialogContent>
            {selectedJob && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr ', gap: '8px' }}>
                <p><strong>Job Title:</strong> {selectedJob.job_title}</p>
                <p><strong>Company:</strong> {selectedJob.company_name}</p>
                <p><strong>Location:</strong> {selectedJob.location}</p>
                <p><strong>Employment Type:</strong> {selectedJob.employment_type}</p>
                <p><strong>Skills Required:</strong> {selectedJob.skills}</p>
                <p><strong>Department:</strong> {selectedJob.department}</p>
                <p><strong>Industry:</strong> {selectedJob.industry}</p>
                <p><strong>Work Mode:</strong> {selectedJob.work_mode}</p>
                <p><strong>Salary Offered:</strong> {selectedJob.salary_offered}</p>
                <p><strong>Experience Required:</strong> {selectedJob.experience_required}</p>
                <p><strong>Company Website:</strong> <a href={selectedJob.company_website} target="_blank" rel="noopener noreferrer">{selectedJob.company_website}</a></p>
                <p><strong>Number of Positions:</strong> {selectedJob.number_of_positions}</p>
                <p><strong>Notice Period:</strong> {selectedJob.notice_period}</p>
                <p><strong>Job Code:</strong> {selectedJob.code}</p>
                <p><strong>Description:</strong> {selectedJob.description}</p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Close</Button>
            <Button onClick={handleApplyNow} color="secondary" variant="contained">Apply Now</Button>
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
            { "Job Applied Successfully!" }
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
    <Typography id="error-modal-title" variant="h6" component="h2" color="error">
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
