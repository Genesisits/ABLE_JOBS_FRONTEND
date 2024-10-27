import * as React from 'react';
import Layout from '../sidenav/Layout';
import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
import './findajob.css'

function Findjob(){
    return(
        <Layout>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for a job..."
                    />
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