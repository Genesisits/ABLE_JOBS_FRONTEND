import React, { useState } from "react";
import "./resetpassword.css";
import { TextField, Button, Grid, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { RESET_PASSWORD } from "../../endpoints";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmpassword] = useState("");
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");
  const [Errmessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [errors, setErrors] = useState({});
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
};
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); 
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword); 
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault(); 
  };
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault(); 
  };

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
        setMessage1("");
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      })
      .catch((error) => {
        setMessage("");
        setMessage1("")
        if (error.response && error.response.data && error.response.data.message && error.response.status === 400) {
          // const backendMessage = error.response.data.detail || "Verification link has expired, Please Try Again"
          setErrMessage(error.response.data.message);
          // setErrMessage(backendMessage)
        } else {
          const backendMessage = error.response.data.detail || "Verification link has expired, Please Try Again"
          setMessage1(backendMessage);
          setMessage("");
          setErrMessage("");
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
        {message1 && <p style={{ color: "red" }}>{message1}</p>}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3 style={{ color: "blue", paddingTop: "10px" }}>Reset Password</h3>
            <TextField
                                  label="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  style={{width:'110%'}}                         
                                  fullWidth
                                  variant="outlined"
                                  // error={!!errors.password}
                                  // helperText={errors.password}
                                  className="custom-input"
                                  // margin="dense"
                                  type={showPassword ? 'text' : 'password'} 
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            onClick={handleClickShowPassword}  
                            onMouseDown={handleMouseDownPassword} 
                            sx={{
                              padding: 0, 
                              color: 'rgba(0, 0, 0, 0.54)', 
                              fontSize: '1.5rem', 
                             
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              marginLeft: '-26px',
                             }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />} 
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
                                      "& input": {
                                        padding: '10px 12px', 
                                        fontSize: '0.875rem', 
                                      },
                                    },
                                    '& .MuiInputBase-root': {
                                      height: '45px', 
                                    },
                                    marginTop: '16px',
                                  }}
                                />
          </Grid>
          <Grid item xs={12}>
          <TextField
                      label="Confirm Password"
                      value={confirm_password}
                      onChange={(e) => setConfirmpassword(e.target.value)}
                      style={{width:'110%'}}                         
                      fullWidth
                      variant="outlined"
                      // error={!!errors.password}
                      // helperText={errors.password}
                      className="custom-input"
                      // margin="dense"
                      type={showConfirmPassword ? 'text' : 'password'} 
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={handleClickShowConfirmPassword}  
                onMouseDown={handleMouseDownPassword1} 
                sx={{
                  padding: 0, 
                  color: 'rgba(0, 0, 0, 0.54)', 
                  fontSize: '1.5rem', 
                 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginLeft: '-26px',
                  
                  
                  
                
                }}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />} 
              </IconButton>
            </InputAdornment>
          ),
        }}
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
                          "& input": {
                            padding: '10px 12px', 
                            fontSize: '0.875rem', 
                          },
                        },
                        '& .MuiInputBase-root': {
                          height: '45px', 
                        },
                        marginTop: '16px',
                      }}
                    />
          </Grid>
           <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              style={{ height: "45px",marginLeft:'25%' }}
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
