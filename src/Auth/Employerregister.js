import React, { useState, useEffect } from 'react';
import './employerregister.css';
import one from "../../src/images/reg.jpg";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import { EMPLOYER_REGISTER, REGISTER } from '../endpoints';

function Employerregister() {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const [company_contact, setmobileNumber] = useState("")
    const [company_email, setEmail] = useState("")
    const [hemail, setHemail] = useState("")
    const [head_first_name, setUserfname] = useState("")
    const [head_last_name,setLastname] = useState("")
    const [hcontact,setHcontact] = useState("")
    const [password,setPassword] = useState("")
    const [confirmpassword, setCpassword] = useState("")
    const [company_size, setCompanysize] = useState("")

  
    const handleOTP = () => {
        // navigate('/verify')
    }
    const handleCompanysize = (event) => {
      setCompanysize(event.target.value); 
    }
    const handleFirstname = (event) => {
      setUserfname(event.target.value); 
  }
    const handleChange = (event) => {
        setCompanyName(event.target.value); 
    }
    const handleMobile = (event) => {
        setmobileNumber(event.target.value)
    }
    const handleEmail = (event) => {
      setEmail(event.target.value)
    }
    const handleHemail = (event) => {
      setHemail(event.target.value)
  }
   const handleHeadcontacts = (event) => {
      setHcontact(event.target.value)
  }
  const handleLastname = (event) => {
    setLastname(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
  const handleConfirmpassword = (event) => {
    setCpassword(event.target.value)
}
const Register = () => {
 let payload = {
    "company_name": companyName,
    "company_contact": company_contact,
    "email": company_email,
    "company_size": company_size,
    "head_first_name": head_first_name,
    "head_last_name": head_last_name,
    "head_email":  hemail,
    "head_contact": hcontact,
    "password": password
 }
  console.log(payload)
  axios.post(`${EMPLOYER_REGISTER}`,payload)
  .then(response => {
     
  })
  .catch(error => {
     
  });
}

  

    return (
      <div className="image-container">
        <img src={one} alt="Background" />
        <div className="gradient-overlay">
          <h3>Employer Registration</h3>
          <div className='ereg'>
            {/* Controlled input for company name */}
            <input 
              type='text' 
              placeholder='company name' 
              value={companyName}  
              onChange={handleChange} 
            />
            <input type='number'
            placeholder='contact number'
            value={company_contact}
            onChange={handleMobile}
            />
          </div>
          <div className='ereg'>
              <input type='text' placeholder='company email' value={company_email} onChange={handleEmail}/>
              <input type='text' placeholder='company size' value={company_size} onChange={handleCompanysize}/>
          </div>
          <h4>Head of the company</h4>
          <div className='ereg'>
              <input type='text' placeholder='First' value={head_first_name} onChange={handleFirstname}/>
              <input type='text' placeholder='Last name' value={head_last_name} onChange={handleLastname}/>
          </div>
          <div className='ereg'>
              <input type='email' placeholder='Head Email' value={hemail} onChange={handleHemail}/>
              <input type='number' placeholder='Head contact' value={hcontact} onChange={handleHeadcontacts}/>
          </div>
          <div className='ereg'>
              <input type='password' placeholder='Password' value={password} onChange={handlePassword}/>
              <input type='password' placeholder='Confirm Password' value={confirmpassword} onChange={handleConfirmpassword}/>
          </div>
          <Button onClick={Register}>Register</Button>
        </div>
      </div>
    );
}


export default Employerregister;
