import React, { useState } from "react";
import "./forgetpassword.css";
import mail from "../images/forgetPassword.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Grid, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import { FORGOT_PASSWORD } from "../endpoints";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    const payload = { email };

    axios
      .post(`${FORGOT_PASSWORD}`, payload)
      .then((response) => {
        setShow(true);
        setMessage(response.data.message);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setMessage(
            "Email not found. Please check your email address and try again."
          );
        } else {
          setMessage(
            error.message || "An error occurred. Please try again later."
          );
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

      {/* Left side: Text and form */}
      <div className="flex-item-fp">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <h3 style={{ color: "blue", textAlign: "center" }}>
              Forget Password
            </h3>
            <p className="instructions" style={{ textAlign: "center" }}>
              Please enter your email address. You will <br />
              receive a link to create a new password via email.
            </p>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="column"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} style={{ width: "100%" }}>
              <TextField
                variant="outlined"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                className="custom-input"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none", // Remove the outline
                    },
                    "&:hover fieldset": {
                      border: "none", // Remove hover outline
                    },
                    "&.Mui-focused fieldset": {
                      border: "none", // Remove focus outline
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <button
                onClick={handleSubmit}
                style={{
                  width: "150px",
                  height: "40px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "block",
                  margin: "0 auto", // Center the button horizontally
                }}
              >
                Send Link
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ marginLeft: "8px", color: "white" }}
                />
              </button>
            </Grid>
          </Grid>
        </Grid>
        {show && (
          <p style={{ color: "red", textAlign: "center" }}>{message}</p>
        )}
      </div>

      {/* Right side: Image */}
      <div className="flex-item-fp">
        <img src={mail} alt="Mail" className="imageDetails" />
      </div>
    </div>
  );
}

export default ForgetPassword;
