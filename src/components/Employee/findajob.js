import * as React from 'react';
import Layout from '../sidenav/Layout';
import Paper from '@mui/material/Paper';
import { GET_JOB } from './../../endpoints';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './findajob.css';

function Findjob() {
  const [rows, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [companyQuery, setCompanyQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [uniqueCompanies, setUniqueCompanies] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

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

  const handleApplyNow = () => {
    alert("Apply Now clicked!");
  };

  const filteredRows = rows.filter(job => 
    (job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
    job.company_name.toLowerCase().includes(companyQuery.toLowerCase()) &&
    job.location.toLowerCase().includes(locationQuery.toLowerCase())
  );

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
              <div style={{ flex: 1, fontFamily: 'sans-serif', color: 'black' }}>
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
                <div>
                  <label>Job Title:</label>
                  <input type="text" value={selectedJob.job_title} readOnly />
                </div>
                <div>
                  <label>Company:</label>
                  <input type="text" value={selectedJob.company_name} readOnly />
                </div>
                <div>
                  <label>Location:</label>
                  <input type="text" value={selectedJob.location} readOnly />
                </div>
                <div>
                  <label>Employment Type:</label>
                  <input type="text" value={selectedJob.employment_type} readOnly />
                </div>
                <div>
                  <label>Skills:</label>
                  <input type="text" value={selectedJob.skills} readOnly />
                </div>
                <div>
                  <label>Department:</label>
                  <input type="text" value={selectedJob.department} readOnly />
                </div>
                <div>
                  <label>Industry:</label>
                  <input type="text" value={selectedJob.industry} readOnly />
                </div>
                <div>
                  <label>Work Mode:</label>
                  <input type="text" value={selectedJob.work_mode} readOnly />
                </div>
               
                <div>
                  <label>Salary Offered:</label>
                  <input type="text" value={selectedJob.salary_offered} readOnly />
                </div>
                <div>
                  <label>Experience Required:</label>
                  <input type="text" value={selectedJob.experience_required} readOnly />
                </div>
                <div>
                  <label>Notice Period:</label>
                  <input type="text" value={selectedJob.notice_period} readOnly />
                </div>
                <div>
                  <label>Description:</label>
                  <input type="text" value={selectedJob.description} readOnly />
                </div>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Close</Button>
            <Button onClick={handleApplyNow} color="secondary" variant="contained">Apply Now</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Layout>
  );
}

export default Findjob;
