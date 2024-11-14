import React, { useState } from "react";
import "./resetpassword.css";
import mail from '../../images/forgetPassword.jpg'
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
import { FORGOT_PASSWORD } from '../../endpoints';

function ResetPassword() {
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
        setMessage(error.message
           || 'An error occurred. Please try again later.');
      }
      setShow(true);  // To show the error message
    });
  }
  return (
    <div className="resetpassword">
      <div className="flex-item1">
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <h3 style={{color:'blue',paddingTop:'10px'}}>Reset Password</h3>
            <TextField
              label="Enter your Password"
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
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
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
            <button onClick={handleSubmit}>submit</button>
          </Grid>
        </Grid>
        {/* {
        show === true ? <p style={{color:'red'}}>{message}</p> : ''
      } */}
      </div>
    </div>
  );
}

export default ResetPassword;
