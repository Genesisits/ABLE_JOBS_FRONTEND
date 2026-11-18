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
import { CenterPopup } from '../components/notify/Notify';

function ForgetPassword() {
  const [email, setEmail] = useState("");
  let [message, setMessage] = useState('');
  let [show, setShow] = useState(false);
  let [isError, setIsError] = useState(false);
  let [loading, setLoading] = useState(false);  // Add loading state
  const [emailError, setEmailError] = useState("");
  const [touched, setTouched] = useState(false);
  const check = (v) => (!v.trim() ? "Email is required." : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Enter a valid email (name@example.com)." : "");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const err = check(email);
    setTouched(true);
    setEmailError(err);
    if (err) return;
    setLoading(true);  
    let payload = {
      "email": email
    }
    axios.post(`${FORGOT_PASSWORD}`, payload)
      .then(response => {
        setShow(true);
        setMessage(response.data.message);
        setIsError(false);
      })
      .catch(error => {
        setIsError(true);
        if (error.response && error.response.status === 404) {
          setMessage('Email not found. Please check your email address and try again.');
        } else {
          setMessage(error.message || 'An error occurred. Please try again later.');
        }
        setShow(true);  
      })
      .finally(() => {
        setLoading(false);  
      });
  };

  return (
    <div className="container-fp">
     
      {loading && (
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      )}

      <div className="flex-item-fp">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <h3>Forgot Password</h3>
              <p>Please enter your email address. You will <br />receive a link to create a new password via email.</p>
              <div className={`fp-field${emailError ? " is-error" : touched && email ? " is-ok" : ""}`}>
                <FontAwesomeIcon icon={faEnvelope} className="fp-icon" />
                <input
                  id="fp-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  aria-invalid={!!emailError}
                  aria-describedby="fp-hint"
                  onChange={(e) => { setEmail(e.target.value); if (touched) setEmailError(check(e.target.value)); }}
                  onBlur={() => { setTouched(true); setEmailError(check(email)); }}
                />
              </div>
              <div id="fp-hint" className={`fp-hint${emailError ? " error" : ""}`} role={emailError ? "alert" : undefined}>
                {emailError || "The email address you registered with"}
              </div>
            </Grid>
            <Grid item xs={12}>
              <button type="submit" disabled={loading}>
                Send Link
                <FontAwesomeIcon icon={faEnvelope} style={{ marginLeft: '8px', color: 'white' }} />
              </button>
            </Grid>
          </Grid>
        </form>
        <CenterPopup
          open={show === true}
          severity={isError ? 'error' : 'success'}
          title={isError ? 'Unable to send link' : 'Check your email'}
          message={message}
          onClose={() => setShow(false)}
        />
      </div>
      <div className="flex-item-fp">
        <img src={mail} alt="Mail" className="imageDetails" />
      </div>
    </div>
  );
}

export default ForgetPassword;
  