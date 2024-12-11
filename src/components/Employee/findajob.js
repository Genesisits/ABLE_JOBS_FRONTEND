import * as React from 'react';
import Layout from '../sidenav/Layout';
import Paper from '@mui/material/Paper';
import { GET_JOB } from './../../endpoints';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Typography } from "@mui/material";
import './findajob.css';
import { useLocation } from 'react-router-dom';

function Findjob({ closeModal }) {
  const [rows, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [companyQuery, setCompanyQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [skillsQuery, setSkillsQuery] = useState("");
  const [uniqueCompanies, setUniqueCompanies] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [uniqueSkills, setUniqueSkills] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromLogin && !localStorage.getItem('findjobReloaded')) {
      localStorage.setItem('findjobReloaded', 'true');
      window.location.reload();
    }
  }, [location.state]);

  useEffect(() => {
    axios.get(GET_JOB)
      .then(response => {
        const jobData = response.data;
        setData(jobData);

        const companies = [...new Set(jobData.map(job => job.company_name))];
        const locations = [...new Set(jobData.map(job => job.location))];
        const skills = [...new Set(jobData.flatMap(job => job.skills.split(',').map(skill => skill.trim())))];
        const jobTitles = [...new Set(jobData.map(job => job.job_title))];
        
        setUniqueCompanies(companies);
        setUniqueLocations(locations);
        setUniqueSkills([...skills, ...jobTitles]);
      });
  }, []);

  const filteredRows = rows.filter(job =>
    (job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
    job.company_name.toLowerCase().includes(companyQuery.toLowerCase()) &&
    job.location.toLowerCase().includes(locationQuery.toLowerCase()) &&
    (job.skills.toLowerCase().includes(skillsQuery.toLowerCase()) || 
     job.job_title.toLowerCase().includes(skillsQuery.toLowerCase()))
  );

  return (
    <Layout>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <div className="search-container">
          <div className="search-bar1">
            {/* <input
              type="text"
              placeholder="Enter skills / designations / companies"
              className="search-input"
              style={{ width: '20%' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            /> */}

            <input
              type="text"
              list="company-options"
              placeholder="Type or select a company"
              className="dropdown-input"
              style={{ width: '27%' }}
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
              style={{ width: '27%' }}
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
              style={{ width: '35%' }}
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

        <div style={{ maxHeight: '500px', overflowY: 'scroll', marginTop: '20px', padding: '0 20px' }}>
          {filteredRows.length > 0 ? (
            filteredRows.map((job) => (
              <div key={job.id} style={{ border: '1px solid #6c757d', margin: '20px 50px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', borderRadius: '5px' }}>
                <div style={{ flex: 0.5, fontFamily: 'sans-serif', color: 'black' }}>
                  <p style={{ margin: 0 }}>{job.job_title}</p>
                  <p style={{ margin: 0 }}>{job.company_name}</p>
                </div>
                <div style={{ flex: 1, fontFamily: 'Serif', color: 'black' }}>
                  <p style={{ margin: 0 }}>{job.location}</p>
                  <p style={{ margin: 0 }}>{job.employment_type}</p>
                </div>
                <div style={{ flex: 0.5, textAlign: 'center' }}>
                  <button className="findajob_button" style={{ marginTop: '5%', marginLeft: '-5%' }}>
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'red', fontFamily: 'sans-serif', fontSize: '18px', fontStyle: "italic" }}>
              No Jobs Found Here
            </div>
          )}
        </div>
      </Paper>
    </Layout>
  );
}

export default Findjob;
