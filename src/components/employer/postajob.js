import * as React from 'react';
import { useState ,useEffect } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { CREATE_JOB, UPDATE_JOB } from '../../endpoints';
import './jobs.css';

const customStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  height: '650px',
  p: 4,
};

export default function Postajob({ modalIsOpen, closeModal,selectedJob  }) {
  const [work_mode, setWorkmode] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [job_title, setJobrole] = useState('');
  const [employment_type, setJobtype] = useState('');
  const [department, setDepartment] = useState('');
  const [industry, setindustry] = useState('');
  const [state, setState] = useState('');
  const [disability, setdisability] = useState('');
  const [companywebsite, setcompanywebsite] = useState('');
  const [experience_required, setExperiencerequired] = useState('');
  const [salary_offered, setSalary] = useState('');
  const [skills, setRTS] = useState('');
  const [location, setLocation] = useState('');
  const [description, setJobdescription] = useState('');
  const [notice_period, setNoticeperiod] = useState('');
  const [number_of_positions, setNofPositions] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [jobid, setJobid] = useState('');

  useEffect(() => {
    if (selectedJob) {
      setIsEditing(true);
      setJobid(selectedJob.code);
      setCompanyName(selectedJob.company_name);
      setJobrole(selectedJob.job_title);
      setDepartment(selectedJob.department);
      setSalary(selectedJob.salary_offered);
      setLocation(selectedJob.location);
      setJobtype(selectedJob.employment_type);
      setindustry(selectedJob.industry);
      setState(selectedJob.state);
      setRTS(selectedJob.skills);
      setNofPositions(selectedJob.number_of_positions);
      setExperiencerequired(selectedJob.experience_required);
      setWorkmode(selectedJob.work_mode);
      setcompanywebsite(selectedJob.company_website);
      setdisability(selectedJob.disability_eligible);
      setNoticeperiod(selectedJob.notice_period);
      setJobdescription(selectedJob.description);
    } else {
      setIsEditing(false); // Reset for new job
    }
  },[selectedJob]);

  const handleNext = () => {
    const payload = {
      company_name,
      employment_type,
      skills,
      industry,
      work_mode,
      state,
      location,
      description,
      salary_offered,
      department,
      disability_eligible: disability,
      experience_required,
      company_website: companywebsite,
      number_of_positions,
      notice_period,
      job_title,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    };

    if (isEditing) {
      // Editing existing job
      axios
        .put(`${UPDATE_JOB}${jobid}/`, payload, config)
        .then((response) => {
          console.log('Job updated:', response);
        })
        .catch((error) => {
          console.log('Error updating job:', error);
        });
    } else {
      // Creating new job
      axios
        .post(`${CREATE_JOB}`, payload, config)
        .then((response) => {
          console.log('Job added:', response);
        })
        .catch((error) => {
          console.log('Error adding job:', error);
        });
    }

    closeModal(); // Close modal after submission
  };

  return (
    <Modal
      open={modalIsOpen}
      onClose={closeModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="employ">
        <Box sx={customStyles}>
          <h2 style={{ margin: '0', textAlign: 'center' }}>
            {isEditing ? 'Edit Job' : 'Add Job'}
          </h2>

          {/* Row 1 */}
          <div className="employ-row">
            <input
              type="text"
              placeholder="Company Name"
              value={company_name}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Job Role"
              value={job_title}
              onChange={(e) => setJobrole(e.target.value)}
            />
            <input
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          {/* Row 2 */}
          <div className="employ-row">
            <input
              type="text"
              placeholder="Salary"
              value={salary_offered}
              onChange={(e) => setSalary(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <select
              value={employment_type}
              onChange={(e) => setJobtype(e.target.value)}
            >
              <option disabled>Job Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Freelance</option>
              <option>Temporary</option>
              <option>Internship</option>
            </select>
          </div>

          {/* Row 3 */}
          <div className="employ-row">
            <input
              type="text"
              placeholder="Industry"
              value={industry}
              onChange={(e) => setindustry(e.target.value)}
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <input
              type="text"
              placeholder="Required Technology Stack"
              value={skills}
              onChange={(e) => setRTS(e.target.value)}
            />
          </div>

          {/* Row 4 */}
          <div className="employ-row">
            <input
              type="text"
              placeholder="Number of Positions"
              value={number_of_positions}
              onChange={(e) => setNofPositions(e.target.value)}
            />
            <input
              type="text"
              placeholder="Experience Required"
              value={experience_required}
              onChange={(e) => setExperiencerequired(e.target.value)}
            />
            <select
              value={work_mode}
              onChange={(e) => setWorkmode(e.target.value)}
            >
              <option disabled>Mode of Work</option>
              <option>On-site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>

          {/* Row 5 */}
          <div className="employ-row">
            <input
              type="text"
              placeholder="Company Website"
              value={companywebsite}
              onChange={(e) => setcompanywebsite(e.target.value)}
            />
            <select
              value={disability}
              onChange={(e) => setdisability(e.target.value)}
            >
              <option disabled>Disability Eligible</option>
              <option>Visual impairment</option>
              <option>Low vision</option>
              <option>Mental Illness</option>
              <option>Cerebral Palsy</option>
              <option>Acid Attack Victim</option>
              <option>Hemophilia</option>
            </select>
            <input
              type="text"
              value={notice_period}
              onChange={(e) => setNoticeperiod(e.target.value)}
              placeholder="Notice Period"
            />
          </div>

          {/* Job Description */}
          <textarea
            value={description}
            onChange={(e) => setJobdescription(e.target.value)}
            placeholder="Job Description"
            rows="4"
          />

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button variant="outlined" color="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {isEditing ? 'Update' : 'Save'}
            </Button>
          </div>
        </Box>
      </div>
    </Modal>
  );
}
