import * as React from 'react';
import Layout from '../sidenav/Layout';
import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
import './findajob.css'

function Findjob(){
    return(
        <Layout>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div className="search-container">
                    {/* Search Bar with Dropdowns */}
                    <div className="search-bar1">
                        <input
                            type="text"
                            placeholder="Enter skills / designations / companies"
                            className="search-input"
                            Style={{width:'30%'}}
                        />
                        
                        {/* <label className="dropdown-label">
                            Sort by company: */}
                            <input 
                                type="text" 
                                list="company-options" 
                                placeholder="Type or select a company" 
                                className="dropdown-input"
                                style={{width:'60%'}}
                            />
                            <datalist id="company-options">
                                <option value="Company 1" />
                                <option value="Company 2" />
                            </datalist>
                        {/* </label> */}

                        {/* Another custom dropdown with typing and selection */}
                        {/* <label className="dropdown-label">
                            Sort by job: */}
                            <input 
                                type="text" 
                                list="job-options" 
                                placeholder="Type or select a job" 
                                className="dropdown-input"
                                style={{width:'50%'}}
                            />
                            <datalist id="job-options">
                                <option value="Job 1" />
                                <option value="Job 2" />
                            </datalist>
                        {/* </label> */}
                        <button className="search-button">Search</button>
                    </div>
                </div>
      <div>
          <div style={{border:'1px solid #6c757d', margin:'20px 50px', display:'flex',flexDirection: 'row', justifyContent: 'space-evenly', borderRadius:'5px'}}>
            <span style={{fontFamily: 'sans-serif', color: 'black'}}>
              <h6>Sales Drive</h6>
              <p>Godrej Properties</p>
            </span>
            <span style={{fontFamily:'sans-serif', color: 'black'}}>
              <h6>Multiple Locations</h6>
              <p>5 Days ago</p>
            </span>
            <span>
              <button className='findajob_button'>Apply Now</button>
            </span>
          </div>
          <div style={{border:'1px solid #6c757d', margin:'20px 50px', display:'flex',flexDirection: 'row', justifyContent: 'space-evenly', borderRadius:'5px'}}>
            <span style={{fontFamily: 'sans-serif', color: 'black'}}>
              <h6>Sales Drive</h6>
              <p>Godrej Properties</p>
            </span>
            <span style={{fontFamily:'sans-serif', color: 'black'}}>
              <h6>Multiple Locations</h6>
              <p>5 Days ago</p>
            </span>
            <span>
              <button className='findajob_button'>Apply Now</button>
            </span>
          </div>
        </div>
      </Paper>
    </Layout>
    )

}
export default Findjob