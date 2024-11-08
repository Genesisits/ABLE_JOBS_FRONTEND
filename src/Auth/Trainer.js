import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Grid,
  Box,
  TextField,
  Button,
  Checkbox,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { CountryDropdown, StateDropdown } from "react-country-state-dropdown";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { TRAINER_REGISTER } from "../endpoints";
import { Password } from "@mui/icons-material";
import { InputAdornment} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import icons


function Trainer() {
  const theme = createTheme();
  const [userfname, setUserfname] = useState("");
  const [userlname, setUserlname] = useState("");
  const [useremail, setEmail] = useState("");
  const [usermobile, setMobile] = useState("");
  const [useraddress, setAddress] = useState("");
  const [userpassword, setPassword] = useState("");
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [resume, setResume] = useState(null);
  const [Adhar, setAadhar] = useState(null);
  const [qualification, setQualification] = useState("");
  const [languages_known, setKnownLanguages] = useState("");
  const [pancard, setPancard] = useState(null);
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("")
  const [willing_to_relocate, setWillingToRelocate] = useState(false);
  const [availability_of_work, setWorkAvailability] = useState("");
  const handleSetCountry = (e, value) => setCountry(value);
  const handleSetState = (e, value) => setState(value);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
};
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault(); // Prevent the mouse down event from triggering the input focus
  };
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!userfname) {
      newErrors.userfname = "Please enter first name";
    } else if (!/^[A-Za-z]+$/.test(userfname)) {
      newErrors.userfname = "First name must only contain letters";
    }
    if (!userlname) {
      newErrors.userlname = "Please enter last name";
    } else if (!/^[A-Za-z]+$/.test(userlname)) {
      newErrors.userfname = "last name must only contain letters";
    }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!useremail) {
      newErrors.useremail = "Please enter an email.";
  } else if (!emailRegex.test(useremail)) {
      newErrors.useremail = "Please enter a valid email.";
    }

  const mobileRegex = /^[0-9]{10}$/;
  if (!usermobile) {
    newErrors.usermobile = "Please enter an mobile number.";
} else if (!mobileRegex.test(usermobile)) {
    newErrors.usermobile = "Please enter a valid mobile number.";
  }
    
    
    if (!userpassword || userpassword.length < 6) {
      newErrors.userpassword = "Password should be at least 6 characters long.";
    }
    if (!languages_known) {
      newErrors.languages_known = " please enter Languages known.";
    }
    if (!experience || isNaN(experience) || experience <= 0) {
      newErrors.experience = "Please enter valid experience.";
    }
    
    if (!skills) {
      newErrors.skills = "Please enter skills";
    } else if (!/^[A-Za-z]+$/.test(userlname)) {
      newErrors.skills= "skills must only contain letters";
    }
    if (!availability_of_work) {
      newErrors.availability_of_work = "Please select availability of work.";
    }
    if (!qualification) {
      newErrors.qualification = "Please select your qualification.";
    }
    if (!pancard) {
      newErrors.pancard = "Please upload your Pan Card.";
    }
    if (!Adhar) {
      newErrors.Adhar = "Please upload your Aadhar Card.";
    }
    if (!resume) {
      newErrors.resume = "Please upload your Resume.";
    }
    if (!useraddress) {
      newErrors.useraddress = " please enter your Address.";
    }
    if (!country) {
      newErrors.country = "Please select your country.";
    }
    if (!state) {
      newErrors.state = "Please select your state.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }


  
    const formData = new FormData();
    formData.append("first_name", userfname);
    formData.append("last_name", userlname);
    formData.append("email", useremail);
    formData.append("password", userpassword);
    formData.append("mobile_number", usermobile);
    formData.append("address", useraddress);
    formData.append("country", country.name);
    formData.append("state", state.name);
    formData.append("willing_to_relocate", willing_to_relocate);
    formData.append("languages_known", languages_known);
    formData.append("qualification", qualification)
    formData.append("availability_of_work", availability_of_work);
    formData.append("job_experience", experience);
    formData.append("skills",skills)
    formData.append("aadhaar_card", Adhar);
    formData.append("pan_card", pancard);
    formData.append("resume", resume);
    axios
    .post(`${TRAINER_REGISTER}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <div style={{ marginTop: "2%" }}>
      <ThemeProvider theme={theme}>
        <Box style={{ margin: "5% 10%" }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                label="First name"
                value={userfname}
                onChange={(e) => setUserfname(e.target.value)}
                fullWidth
                error={!!errors.userfname}
                helperText={errors.userfname}
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
              <TextField
                label="Last name"
                value={userlname}
                onChange={(e) => setUserlname(e.target.value)}
                fullWidth
                error={!!errors.userlname}
                helperText={errors.userlname}
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
              <TextField
                label="Email"
                value={useremail}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                error={!!errors.useremail}
                helperText={errors.useremail}
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
                    <TextField
                      label="Password"
                      value={userpassword}
                      onChange={(e) => setPassword(e.target.value)}
                    
                      fullWidth
                      variant="outlined"
                      error={!!errors.userpassword}
                      helperText={errors.userpassword}
                      className="custom-input"
                      // margin="dense"
                      type={showPassword ? 'text' : 'password'} // Toggle password field type
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={handleClickShowPassword}  // Toggle password visibility
                onMouseDown={handleMouseDownPassword}  // Prevent focus change on mouse down
                edge="end"
                sx={{
                  padding: 0, // Remove default padding to keep icon within the input field
                  color: 'rgba(0, 0, 0, 0.54)', // Default icon color (can be customized)
                  fontSize: '1.5rem', // Adjust icon size to fit within the input field
                 
                  display: 'flex', // Ensure the icon is vertically centered
                  alignItems: 'center', // Align the icon vertically within the field
                  justifyContent: 'center', // Align the icon horizontall
                  marginLeft: '-16px',
                  
                  
                  
                
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />} {/* Toggle the eye icon */}
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
                            padding: '10px 12px', // Adjust padding (same as email and mobile)
                            fontSize: '0.875rem', // Smaller font size (similar to other fields)
                          },
                        },
                        '& .MuiInputBase-root': {
                          height: '45px', // Ensure consistent height with other fields
                        },
                      }}
                    />
                  </Grid>
            <Grid item xs={6}>
              <TextField
                label="Mobile Number"
                value={usermobile}
                onChange={(e) => setMobile(e.target.value)}
                fullWidth
                error={!!errors.usermobile}
                helperText={errors.usermobile}
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
            <Grid>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "20px",
                  justifyContent: "space-evenly",
                }}
              >
                <span>
                  <CountryDropdown
                    clearable
                    searchable
                    value={country}
                    onChange={handleSetCountry}
                    style={{
                      color: "black",
                      width: "240px",
                      marginRight: "10px",
                      
                    }}
                    error={!!errors.country}
                  />
                   {errors.country && <div style={{ color: "red" }}>{errors.country}</div>}
                </span>
                <span>
                  <StateDropdown
                    clearable
                    searchable
                    country={country}
                    value={state}
                    onChange={handleSetState}
                    style={{ color: "black", width: "240px" }}
                    error={!!errors.state}
                  />
                  {errors.state && <div style={{ color: "red" }}>{errors.state}</div>}
                </span>
              </div>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Languages Known"
                value={languages_known}
                onChange={(e) => setKnownLanguages(e.target.value)}
                fullWidth
                error={!!errors.languages_known}
                helperText={errors.languages_known}
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
            <Grid item xs={4}>
              <TextField
                label="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                // margin="dense"
                fullWidth
                error={!!errors.experience}
                helperText={errors.experience}
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
            <Grid item xs={4}>
              <TextField
                label="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                // margin="dense"
                fullWidth
                error={!!errors.skills}
                helperText={errors.skills}
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
            <Grid item xs={4}>
              <FormControl fullWidth error={!!errors.availability_of_work}>
                <Select
                  value={availability_of_work}
                  onChange={(e) => setWorkAvailability(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    margin: "10px 0px",
                    height: 45, // Adjust the height
                    padding: "4px 10px", // Reduce padding
                    fontSize: "0.875rem", // Adjust font size if needed
                  }}
                  
                >
                  <MenuItem value="">Availability of Work</MenuItem>
                  <MenuItem value="hybrid">Hybrid</MenuItem>
                  <MenuItem value="remote">Remote</MenuItem>
                  <MenuItem value="location-based">Location based</MenuItem>
                </Select>
                {errors.availability_of_work && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.availability_of_work}
                  </div>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={4}>
            <FormControl fullWidth error={!!errors.qualification}>
                <Select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    margin: "10px 0px",
                    height: 45, // Adjust the height
                    padding: "4px 10px", // Reduce padding
                    fontSize: "0.875rem", // Adjust font size if needed
                  }}
                >
                  <MenuItem value="">Qualification</MenuItem>
                  <MenuItem value="10th equivalent">10th/ Equivalent</MenuItem>
                  <MenuItem value="12th equivalent">12th /Equivalent</MenuItem>
                  <MenuItem value="degree equivalent">Degree/ Equivalent</MenuItem>
                </Select>
                {errors.qualification && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.qualification}
                  </div>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                required
                control={
                  <Checkbox
                    hecked={willing_to_relocate}
                    onChange={(e) => setWillingToRelocate(e.target.checked)}
                  />
                }
                label="Willing to relocate"
                componentsProps={{
                  typography: { color: "black" },
                }}
              />
            </Grid>
          </Grid>
          

          <Grid container spacing={6}>
            <Grid item xs={4}>
              <label>Pan Card</label>
              <TextField
                type="file"
                onChange={(event) => setPancard(event.target.files[0])}
                fullWidth
                error={!!errors.pancard}
                helperText={errors.pancard}
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                className="custom-input"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#888",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#000",
                    },
                  },
                  '& input[type="file"]': {
                    display: "block",
                    cursor: "pointer",
                  },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <label>Adhar Card</label>
              <TextField
                type="file"
                onChange={(event) => setAadhar(event.target.files[0])}
                fullWidth
                error={!!errors.Adhar}
                helperText={errors.Adhar}
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                className="custom-input"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#888",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#000",
                    },
                  },
                  '& input[type="file"]': {
                    display: "block",
                    cursor: "pointer",
                  },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <label>Resume</label>
              <TextField
                type="file"
                onChange={(event) => setResume(event.target.files[0])}
                fullWidth
                error={!!errors.resume}
                helperText={errors.resume}
                className="custom-input"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#888",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#000",
                    },
                  },
                  '& input[type="file"]': {
                    display: "block",
                    cursor: "pointer",
                  },
                }}
              />
            </Grid>
          </Grid>
          {/* <Grid item xs={}> */}
          <TextField
            label="Address"
            value={useraddress}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="dense"
            multiline
            rows={3} // Specifies 4 rows
            error={!!errors.useraddress}
            helperText={errors.useraddress}
          />
          {/* </Grid> */}
          <Button onClick={handleSubmit}>Register</Button>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default Trainer;