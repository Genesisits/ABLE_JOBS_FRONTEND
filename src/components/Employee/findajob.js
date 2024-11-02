import * as React from 'react';
import Layout from '../sidenav/Layout';
import Paper from '@mui/material/Paper';
import { GET_JOB } from './../../endpoints';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './findajob.css';

function Findjob() {
  const [rows, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [companyQuery, setCompanyQuery] = useState(""); // State for company dropdown search
  const [locationQuery, setLocationQuery] = useState(""); // State for location dropdown search
  const [uniqueCompanies, setUniqueCompanies] = useState([]); // Unique company names
  const [uniqueLocations, setUniqueLocations] = useState([]); // Unique locations

  useEffect(() => {
    axios.get(GET_JOB)
      .then(response => {
        const jobData = response.data;
        setData(jobData);

        // Extract unique company names and locations for dropdowns
        const companies = [...new Set(jobData.map(job => job.company_name))];
        const locations = [...new Set(jobData.map(job => job.location))];
        setUniqueCompanies(companies);
        setUniqueLocations(locations);
      });
  }, []);

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
          {/* Search Bar with Dropdowns */}
          <div className="search-bar1">
            <input
              type="text"
              placeholder="Enter skills / designations / companies"
              className="search-input"
              style={{ width: '30%' }}
              value={searchQuery}  
              onChange={(e) => setSearchQuery(e.target.value)}  
            />

            {/* Company dropdown input */}
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

            {/* Location dropdown input */}
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
                <button className='findajob_button' style={{ marginTop: '5%' ,marginLeft:'-5%' }}>View</button>
              </div>
            </div>
          ))}
        </div>
      </Paper>
    </Layout>
  );
}

export default Findjob;
