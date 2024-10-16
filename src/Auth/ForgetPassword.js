import React, { useState } from 'react'
import './forgetpassword.css'
import one from "../../src/images/passwordPage.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FORGOT_PASSWORD } from '../endpoints';

function ForgetPassword() {
  let [email, setEmail] = useState('')
  let [message, setMessage] = useState('')
  let [show, setShow] = useState(false)
    const navigate = useNavigate();

      const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleOTP = () => {
      let payload = {
         "email": email
      }
      axios.post(`${FORGOT_PASSWORD}`,payload)
      .then(response => {
       setShow(true)
       setMessage(response.data.message)
      })
      .catch(error => {
         setMessage(error.message)
      });
    }
  return (
    <div className="image-container">
    <img src={one} alt="Background" />
    <div className="gradient-overlay">
        <h3>ForgetPassword</h3>
        <p>Please enter your email address. You will <br/>receive a link to create a new password via email.</p>
      <input type="text" placeholder='Enter Email' value={email} onChange={handleEmail}/>
      <button type='submit' onClick={handleOTP}>SEND</button>
      {
        show === true ? <p style={{color:'red'}}>{message}</p> : ''
      }
    </div>
  </div>
  )
}

export default ForgetPassword