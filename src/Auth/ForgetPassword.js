import React, { useState } from "react";
import "./forgetpassword.css";
import mail from "../images/forgetPassword.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  Grid,
  Box,
  TextField,
  Button,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FORGOT_PASSWORD } from '../endpoints';

function ForgetPassword() {
  const [email, setEmail] = useState("");
  let [message, setMessage] = useState('')
  let [show, setShow] = useState(false)
  const handleSubmit = () => {
    let payload = {
       "email": email
    }
    axios.post(`${FORGOT_PASSWORD}`,payload)
    .then(response => {
     setShow(true)
     setMessage(response.data.message)
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        setMessage('Email not found. Please check your email address and try again.');
      } else {
        setMessage(error.message || 'An error occurred. Please try again later.');
      }
      setShow(true);  // To show the error message
    });
  }
  return (
    <div className="container">
      <div className="flex-item">
        <Grid container spacing={1}>
          <Grid item xs={11}>
          <h3 style={{color:'blue'}}>Forget Password</h3>
          <p>Please enter your email address. You will <br/>receive a link to create a new password via email.</p>
            <TextField
              label="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              // margin="dense"
              className="custom-input"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <button onClick={handleSubmit}>send Link
            <FontAwesomeIcon icon={faEnvelope} style={{ marginLeft: '8px',color:'white' }} /></button>
          </Grid>
        </Grid>
        {
        show === true ? <p style={{color:'red'}}>{message}</p> : ''
      }
      </div>
      <div className="flex-item">
        <img src={mail} alt="Mail" className="imageDetails" />
      </div>
    </div>
  );
}

export default ForgetPassword;
