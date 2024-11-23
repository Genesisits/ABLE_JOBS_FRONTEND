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
} from "@mui/material";
import { CircularProgress } from "@mui/material"; // Import CircularProgress
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FORGOT_PASSWORD } from '../endpoints';

function ForgetPassword() {
  const [email, setEmail] = useState("");
  let [message, setMessage] = useState('');
  let [show, setShow] = useState(false);
  let [loading, setLoading] = useState(false);  // Add loading state
  
  const handleSubmit = () => {
    setLoading(true);  // Start loading
    let payload = {
      "email": email
    }
    axios.post(`${FORGOT_PASSWORD}`, payload)
      .then(response => {
        setShow(true);
        setMessage(response.data.message);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setMessage('Email not found. Please check your email address and try again.');
        } else {
          setMessage(error.message || 'An error occurred. Please try again later.');
        }
        setShow(true);  // Show the error message
      })
      .finally(() => {
        setLoading(false);  // Stop loading
      });
  };

  return (
    <div className="container-fp">
      {/* Full-page loading spinner */}
      {loading && (
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      )}

      <div className="flex-item-fp">
        <Grid container spacing={1}>
          <Grid item xs={11}>
            <h3 style={{ color: 'blue' }}>Forget Password</h3>
            <p>Please enter your email address. You will <br />receive a link to create a new password via email.</p>
            <input
            type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
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
            <button onClick={handleSubmit}>
              Send Link
              <FontAwesomeIcon icon={faEnvelope} style={{ marginLeft: '8px', color: 'white' }} />
            </button>
          </Grid>
        </Grid>
        {show === true ? <p style={{ color: 'red' }}>{message}</p> : ''}
      </div>
      <div className="flex-item-fp">
        <img src={mail} alt="Mail" className="imageDetails" />
      </div>
    </div>
  );
}

export default ForgetPassword;
  