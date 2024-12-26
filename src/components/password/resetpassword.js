import React, { useState } from "react";
import "./resetpassword.css";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { RESET_PASSWORD } from "../../endpoints";
import { useLocation,useNavigate } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmpassword] = useState("");
  const [message, setMessage] = useState("");
  const [Errmessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (password !== confirm_password) {
      setErrMessage("Passwords do not match. Please try again.");
      return;
    }
    const url = `${RESET_PASSWORD}${token}/`;
    const payload = {
      new_password: password,
      confirm_password: confirm_password,
    };

    setLoading(true);
    axios
      .post(url, payload)
      .then((response) => {
        setMessage(response.data.message || "Password reset successful!");
        setErrMessage("");
        setTimeout(() => {
          // setShowPopup(false);
          navigate('/login');
        }, 4000); 
      })
      .catch((error) => {
        setMessage("");
        if (error.response && error.response.data && error.response.data.message) {
        } else {
          setMessage("An error occurred. Please try again later.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="resetpassword">
      <div className="flex-item">
      {message && <p style={{ color: "green" }}>{message}</p>}
      {Errmessage && <p style={{ color: "red" }}>{Errmessage}</p>}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3 style={{ color: "blue", paddingTop: "10px" }}>Reset Password</h3>
            <TextField
              label="Enter your Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              className="custom-input"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              type="password"
              value={confirm_password}
              onChange={(e) => setConfirmpassword(e.target.value)}
              fullWidth
              className="custom-input"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ResetPassword;
