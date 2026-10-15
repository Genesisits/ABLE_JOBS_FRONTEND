/* eslint-disable */
import React, { useState } from 'react';
import './employerregister.css';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Grid ,IconButton} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {Box,Snackbar,Alert,CircularProgress} from "@mui/material";
import { EMPLOYER_REGISTER } from '../endpoints';
import { Password } from "@mui/icons-material";
import { InputAdornment} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; 

const industries = [
    { id: "1", name: "IT and IT Services", abbreviation: "IT and IT Services" },
    {
      id: "1",
      name: "Banking, Financial Service, and Insurance",
      abbreviation: "Banking, Financial Service, and Insurance",
    },
    {
      id: "1",
      name: "Retail and E-Commerce",
      abbreviation: "Retail and E-Commerce",
    },
    { id: "1", name: "FinTech", abbreviation: "FinTech" },
    { id: "1", name: "Tele Communications", abbreviation: "Tele Communications" },
    {
      id: "1",
      name: "Healthcare and pharmaceuticals",
      abbreviation: "Healthcare and pharmaceuticals",
    },
    {
      id: "1",
      name: "Education and Training",
      abbreviation: "Education and Training",
    },
  ];

function Employerregister({ open, onClose }) {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const [company_contact, setMobileNumber] = useState("");
    const [company_email, setEmail] = useState("");
    const [company_website, setCompanywebsite] = useState("");
    const [Industry, setIndustry] = useState("");
    const [Location, setLocation] = useState("");
    const [Gst, setGst] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmpassword, setCpassword] = useState("");
    const [company_size, setCompanysize] = useState("");
    const [company_logo, setCompanylogo] = useState(null);
    
   
    const [linkedinlink, setLinkedinlink] = useState("");
   
    const [head_first_name, setHeadfirstname] = useState("");
    const [head_last_name, setHeadlastname] = useState("");
    const [represent_mail, setRepresentMail] = useState("");
    const [represent_number, setRepresentNumber] = useState("");
    const [Pan, setPan] = useState(null);
    const [profileimage, setProfileimage] = useState(null);
    const [registration, setRegistration] = useState(null);
    const [designation, setDesignation] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState("error");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleSnackbarClose = () => setSnackbarOpen(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
};
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); 
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault(); 
  };


    const handleCompanysize = (event) => setCompanysize(event.target.value);
    // const handleCompanylogo = (event) => setCompanylogo(event.target.value);
    const handleChange = (event) => setCompanyName(event.target.value);
    const handleMobile = (event) => setMobileNumber(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handleCompanywebsite = (event) => setCompanywebsite(event.target.value);
    const handleIndustry = (event) => setIndustry(event.target.value);
    const handleLocation = (event) => setLocation(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    const handleConfirmpassword = (event) => setCpassword(event.target.value);
    const handleGst = (event) => setGst(event.target.value);
    
    const handleLinkedinlink = (event) => setLinkedinlink(event.target.value);
   
    const handleHeadFirstName = (event) => setHeadfirstname(event.target.value);
    const handleHeadLastName = (event) => setHeadlastname(event.target.value);
    const handleRepresentMail = (event) => setRepresentMail(event.target.value);
    const handleRepresentNumber = (event) => setRepresentNumber(event.target.value);
    const handleDesignation = (event) => setDesignation(event.target.value);
    const handleProfileImage = (event) => setProfileimage(event.target.value);
    const handlePan = (event) => setPan(event.target.value);
    const handleRegistration = (event) => setRegistration(event.target.value);
    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);
    
    const validateForm = () => {
        const newErrors = {};
        if (!companyName) {
          newErrors.companyName = "Please enter company name";
        } else if (!/^[A-Za-z]+$/.test(companyName)) {
          newErrors.userfname = "company name must only contain letters";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!company_email) {
          newErrors.company_email = "Please enter an email.";
        } else if (!emailRegex.test(company_email)) {
          newErrors.company_email = "Please enter a valid email.";
        }
        const mobileRegex = /^[0-9]{10}$/;
        if (!company_contact) {
        newErrors.company_contact = "Please enter an company contact.";
        } else if (!mobileRegex.test(company_contact)) {
        newErrors.company_contact = "Please enter a valid company contact.";
       }
       const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,6}(\/[\w\d\-\._~:/?#[\]@!$&'()*+,;=.]*)?$/;
       if (!company_website) {
        newErrors.company_website = "Please enter an company website.";
        } else if (!urlRegex.test(company_website)) {
        newErrors.company_website = "Please enter a valid company website.";
       }
       if (!Industry) {
        newErrors.Industry = "Please select industry.";
      }
      if (!Location) {
        newErrors.Location = "Please enter location";
      } else if (!/^[A-Za-z]+$/.test(Location)) {
        newErrors.Location = "location must only contain letters";
      }
      if (!company_size) {
        newErrors.company_size = "Please select company size.";
      }
      if (!password || password.length < 6) {
        newErrors.password = "Password should be at least 6 characters long.";
      }
      if (password !== confirmpassword) {
        newErrors.confirmpassword = "Passwords do not match.";
      }
      const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+$/;
      if (!linkedinlink) {
        newErrors.linkedinlink = "Please enter an link.";
        } else if (!urlRegex.test(linkedinlink)) {
        newErrors.linkedinlink = "Please enter a valid link.";
       }
       if (!head_first_name) {
        newErrors.head_first_name = "Please enter HR first name";
      } else if (!/^[A-Za-z]+$/.test(head_first_name)) {
        newErrors.head_first_name = "HR First name must only contain letters";
      }
      if (!head_last_name) {
        newErrors.head_last_name = "Please enter HR last name";
      } else if (!/^[A-Za-z]+$/.test(head_last_name)) {
        newErrors.head_last_name = "HR last name must only contain letters";
      }
    const represent_mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!represent_mail) {
        newErrors.represent_mail = "Please enter an HR email.";
    } else if (!emailRegex.test(represent_mail)) {
        newErrors.represent_mail = "Please enter a valid HR email.";
      }
    
    const mobilenumberRegex = /^[0-9]{10}$/;
    if (!represent_number) {
      newErrors.represent_number = "Please enter an HR mobile number.";
    } else if (!mobileRegex.test(represent_number)) {
      newErrors.represent_number = "Please enter a valid HR mobile number.";
    }
    if (!designation) {
        newErrors.designation = "Please enter designation";
      } else if (!/^[A-Za-z]+$/.test(designation)) {
        newErrors.designation = "designation must only contain letters";
      }
      if (!Pan) {
        newErrors.Pan = "Please upload your Pan Card.";
      }
      if (!Gst) {
        newErrors.Gst = "Please upload your gst.";
      }
      if (!company_logo) {
        newErrors.company_logo = "Please upload company logo.";
      }
      if (!registration) {
        newErrors.registration = "Please upload registration.";
      }
      setErrors(newErrors); 
        return newErrors ;
    
    
      };
    //   const Register = () => {
        const handleSubmit = (event) => {
            event.preventDefault();
        setLoading(true);
        let payload = {
            "company_name": companyName,
            "email": company_email,
            "company_contact": company_contact,
            "company_size": company_size,
            "industry": Industry,
            "location": Location,
            "gst_file": Gst,
            "password": password,
            "company_website": company_website,
            "company_logo": company_logo,
           
            "linkedinlink": linkedinlink,
            
            "head_first_name": head_first_name,
            "head_last_name": head_last_name,
            "head_email": represent_mail,
            "head_contact": represent_number,
            "head_designation": designation,
            "pan": Pan,
            "registration_certificate": registration,
            "profile_image":profileimage,
        };
        console.log(payload);

        axios.post(`${EMPLOYER_REGISTER}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setShowPopup(true);
            setPopupMessage(`User successfully registered! Please check "${company_email}"!`);
            setTimeout(() => {
              setShowPopup(false);
              navigate('/login');
            }, 4000); 
          })
        .catch((error) => {
        let errorMessage = "An error occurred. Please try again.";
        if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMessage =
                "Bad Request: Email already registered.";
              break;
            case 401:
              errorMessage = "Unauthorized: Please log in and try again.";
              break;
            case 404:
              errorMessage =
                "Not Found: The requested resource could not be found.";
              break;
            case 500:
              errorMessage =
                "Internal Server Error: Something went wrong on the server.";
              break;
            default:
              errorMessage = `Error: Something went wrong. Status code: ${error.response.status}`;
          }
        }
        setShowPopup(true); 
        setPopupMessage(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };
        // const validationErrors = validateForm();
        // if (Object.keys(validationErrors).length === 0) {
        //     Register(); 
        // }
    // };
    const handleCompanylogo = (event) => {
      const file = event.target.files[0];
  
      if (file) {
          const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
          if (!allowedTypes.includes(file.type)) {
              setErrors((prevErrors) => ({
                  ...prevErrors,
                  company_logo: "Please upload a valid image file (jpeg, png, gif, jpg).",
              }));
              setCompanylogo(null);
              return;
          }
  
          // Clear the error if a valid image file is selected
          setErrors((prevErrors) => ({
              ...prevErrors,
              company_logo: null,
          }));
          setCompanylogo(file);
      } else {
          setCompanylogo(null);
      }
  };
  
    const theme = createTheme();

    return (
        
            <div>
             <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle style={{textAlign:'center'}}>Employer Registration</DialogTitle>
            <ThemeProvider theme={theme}>
            {loading && (
            <div className="full-page-spinner">
              <CircularProgress color="primary" size={50} />
            </div>
          )}
          <Box sx={{ width: "100%", margin: "0%" }}>
                  {showPopup && (
                    <div className="popup">
                      <p style={{ fontSize: "medium", fontFamily: "sans-serif" }}>
                        {popupMessage}
                      </p>
                      <button
                        style={{ marginLeft: "35%", width: "30%" }}
                        onClick={() => setShowPopup(false)}
                      >
                        Close
                      </button>
                    </div>
                  )}
                  <Box
                    sx={{
                      position: "sticky",
                      top: "12%",
                      zIndex: 1,
                      backgroundColor: "white",
                    }}
                  ></Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
                    <DialogContent>
                        <Grid container spacing={2} rowSpacing={0}> 
                            <Grid item xs={4}>
                                <TextField
                                    label="Company Name"
                                    value={companyName}
                                    onChange={handleChange}
                                    fullWidth
                                    error={!!errors.companyName}
                                    helperText={errors.companyName}
                                    margin="dense"
                                    className="custom-input"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Company EMail"
                                    value={company_email}
                                    onChange={handleEmail}
                                    fullWidth
                                    error={!!errors.company_email}
                                    helperText={errors.company_email}
                                    margin="dense"
                                    className="custom-input"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Company Contact"
                                    value={company_contact}
                                    onChange={handleMobile}
                                    fullWidth
                                    error={!!errors.company_contact}
                                    helperText={errors.company_contact}
                                    margin="dense"
                                    className="custom-input"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Company Website"
                                    value={company_website}
                                    onChange={handleCompanywebsite}
                                    fullWidth
                                    error={!!errors.company_website}
                                    helperText={errors.company_website}
                                    margin="dense"
                                    className="custom-input"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    label="Industry"
                                    value={Industry}
                                    onChange={handleIndustry}
                                    fullWidth
                                    error={!!errors.Industry}
                                    helperText={errors.Industry}
                                    select
                                    margin="dense"
                                    className="custom-input1"

                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: '43px',
                                            marginTop: '12px',
                                            
                                            '& .MuiSelect-select': {
                                                padding: '10px', 
                                            },
                                            backgroundColor: '#fff',
                                            '& fieldset': {
                                                borderColor: '#ccc',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#888',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#000',
                                            },
                                        },

                                    }}
                                >
                                   {industries.map((Industrie) => (
                <MenuItem key={Industrie.id} value={Industrie.abbreviation}>
                  {Industrie.name}
                </MenuItem>
              ))}
                                </TextField>

                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Location"
                                    value={Location}
                                    onChange={handleLocation}
                                    fullWidth
                                    error={!!errors.Location}
                                    helperText={errors.Location}
                                    margin="dense"
                                    className="custom-input"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Company Size"
                                    value={company_size}
                                    onChange={handleCompanysize}
                                    select
                                    fullWidth
                                    error={!!errors.company_size}
                                    helperText={errors.company_size}
                                    margin="dense"
                                    className="custom-input1"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: '43px',
                                            marginTop: '12px',
                                            
                                            '& .MuiSelect-select': {
                                                padding: '10px',
                                            },
                                        },
                                    }}
                                >

                                    <MenuItem value="1-10">1-10</MenuItem>
                                    <MenuItem value="11-50">11-50</MenuItem>
                                    <MenuItem value="51-200">51-200</MenuItem>
                                    <MenuItem value="200+">200+</MenuItem>

                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                    <TextField
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{width:'110%'}}                         
                      fullWidth
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors.password}
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
                  marginLeft: '-16px',
                  
                  
                  
                
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

                            
                            <Grid item xs={4}>
                                <TextField
                                    label="Confirm Password"
                                    value={confirmpassword}
                                    onChange={handleConfirmpassword}
                                    type="password"
                                    fullWidth
                                    error={!!errors.confirmpassword}
                                    helperText={errors.confirmpassword}
                                    margin="dense"
                                    className="custom-input"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '& input': {
                                                padding: '10px 12px', 
                                                fontSize: '0.875rem', 
                                            },
                                            '& .MuiInputBase-root': {
                height: '45px', 
            },
            marginTop: '8px',
                                        },
                                    }}
                                />
                            </Grid>

                           
                            <Grid item xs={4}>
                                <TextField
                                    label="Linkedin Links"
                                    value={linkedinlink}
                                    onChange={handleLinkedinlink}
                                    fullWidth
                                    error={!!errors.linkedinlink}
                                    helperText={errors.linkedinlink}
                                    margin="dense"
                                    className="custom-input"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="HR First Name"
                                    value={head_first_name}
                                    onChange={handleHeadFirstName}
                                    fullWidth
                                    error={!!errors.head_first_name}
                                    helperText={errors.head_first_name}
                                    margin="dense"
                                    className="custom-input"
                                    sx={{

                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        },

                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="HR Last Name"
                                    value={head_last_name}
                                    onChange={handleHeadLastName}
                                    fullWidth
                                    error={!!errors.head_last_name}
                                    helperText={errors.head_last_name}
                                    margin="dense"
                                    className="custom-input"
                                    sx={{

                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        },

                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="HR Mail"
                                    value={represent_mail}
                                    onChange={handleRepresentMail}
                                    fullWidth
                                    error={!!errors.represent_mail}
                                    helperText={errors.represent_mail}
                                    margin="dense"
                                    className="custom-input"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="HR Number"
                                    value={represent_number}
                                    onChange={handleRepresentNumber}
                                    fullWidth
                                    error={!!errors.represent_number}
                                    helperText={errors.represent_number}
                                    margin="dense"
                                    className="custom-input"
                                    sx={{

                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        },

                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Designation"
                                    value={designation}
                                    onChange={handleDesignation}
                                    fullWidth
                                    error={!!errors.designation}
                                    helperText={errors.designation}
                                    margin="dense"
                                    className="custom-input"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <label>Company Logo</label>
                                <TextField
    onChange={handleCompanylogo}
    fullWidth
    type="file"
    margin="dense"
    error={!!errors.company_logo}
    helperText={errors.company_logo}
    className="custom-input"
    sx={{
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent',
            },
        },
    }}
/>
                            </Grid>
                            <Grid item xs={4}>
                                <label>GST</label>
                                <TextField
                                    type="file"
                                    onChange={(event) => setGst(event.target.files[0])}
                                    fullWidth
                                    error={!!errors.Gst}
                                    helperText={errors.Gst}
                                    margin="dense"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className="custom-input"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#fff',
                                            '& fieldset': {
                                                borderColor: '#ccc',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#888',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#000',
                                            },
                                        },
                                        '& input[type="file"]': {
                                            display: 'block',
                                            cursor: 'pointer',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <label>PAN</label>
                                <TextField
                                    type="file"
                                    onChange={(event) => setPan(event.target.files[0])}
                                    fullWidth
                                    error={!!errors.Pan}
                                    helperText={errors.Pan}
                                    margin="dense"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className="custom-input"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#fff',
                                            '& fieldset': {
                                                borderColor: '#ccc',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#888',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#000',
                                            },
                                        },
                                        '& input[type="file"]': {
                                            display: 'block',
                                            cursor: 'pointer',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <label>Registration</label>
                                <TextField
                                    type="file"
                                    onChange={(event) => setRegistration(event.target.files[0])}
                                    fullWidth
                                    error={!!errors.registration}
                                    helperText={errors.registration}
                                    margin="dense"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className="custom-input"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#fff',
                                            '& fieldset': {
                                                borderColor: '#ccc',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#888',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#000',
                                            },
                                        },
                                        '& input[type="file"]': {
                                            display: 'block',
                                            cursor: 'pointer',
                                        },
                                    }}
                                />
                            </Grid>
                            
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="secondary">Cancel</Button>
                        <Button onClick={handleSubmit} color="primary">Register</Button>
                    </DialogActions>
                    </Box>
                    </ThemeProvider>
                </Dialog>
            </div>
    );
}


export default Employerregister;
