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
} from "@mui/material";
import { CountryDropdown, StateDropdown } from "react-country-state-dropdown";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { VOLUNTEER_REGISTER } from "../endpoints";
import { Password } from "@mui/icons-material";

function Volunteer() {
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
  const [purpose, setPurpose] = useState("")
  const [Adhar, setAadhar] = useState(null);
  const [qualification, setQualification] = useState("");
//   const [languages_known, setKnownLanguages] = useState("");
  const [pancard, setPancard] = useState(null);
  const [no_of_hours, setNOH] = useState("")
//   const [experience, setExperience] = useState("");
//   const [skills, setSkills] = useState("")
//   const [willing_to_relocate, setWillingToRelocate] = useState(false);
//   const [availability_of_work, setWorkAvailability] = useState("");
  const handleSetCountry = (e, value) => setCountry(value);
  const handleSetState = (e, value) => setState(value);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("first_name", userfname);
    formData.append("last_name", userlname);
    formData.append("email", useremail);
    formData.append("password", userpassword);
    formData.append("mobile_number", usermobile);
    formData.append("address", useraddress);
    formData.append("country", country.name);
    formData.append("state", state.name);
    // formData.append("willing_to_relocate", willing_to_relocate);
    // formData.append("languages_known", languages_known);
    formData.append("qualification", qualification)
    // formData.append("availability_of_work", availability_of_work);
    // formData.append("job_experience", experience);
    // formData.append("skills",skills)
    formData.append("purpose", purpose);
    formData.append("no_of_hours", no_of_hours);
    formData.append("aadhaar_card", Adhar);
    formData.append("pan_card", pancard);
    formData.append("resume", resume);
    axios
    .post(`${VOLUNTEER_REGISTER}`, formData, {
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
                label="Email"
                value={useremail}
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
            <Grid item xs={4}>
              <TextField
                label="Password"
                value={userpassword}
                onChange={(e) => setPassword(e.target.value)}
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
            <Grid item xs={4}>
              <TextField
                label="Mobile Number"
                value={usermobile}
                onChange={(e) => setMobile(e.target.value)}
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
            <Grid item xs={3}>
              <TextField
                label="Number Of Hours"
                value={no_of_hours}
                onChange={(e) => setNOH(e.target.value)}
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
            <Grid item xs={3}>
            <FormControl fullWidth>
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
              </FormControl>
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
                  />
                </span>
                <span>
                  <StateDropdown
                    clearable
                    searchable
                    country={country}
                    value={state}
                    onChange={handleSetState}
                    style={{ color: "black", width: "240px" }}
                  />
                </span>
              </div>
            </Grid>
            {/* <Grid item xs={4}>
              <TextField
                label="Languages Known"
                value={languages_known}
                onChange={(e) => setKnownLanguages(e.target.value)}
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
            <Grid item xs={4}>
              <TextField
                label="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                // margin="dense"
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
            <Grid item xs={4}>
              <TextField
                label="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                // margin="dense"
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
            </Grid>            */}
            {/* <Grid item xs={4}>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid> */}
           
            {/* <Grid item xs={4}>
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
            </Grid> */}
          </Grid>
          

          <Grid container spacing={6}>
            <Grid item xs={4}>
              <label>Pan Card</label>
              <TextField
                type="file"
                onChange={(event) => setPancard(event.target.files[0])}
                fullWidth
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
            <Grid item xs={6}>
          <TextField
            label="Address"
            value={useraddress}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="dense"
            multiline
            rows={3} // Specifies 4 rows
          />
          </Grid>
          <Grid item xs={6}>
            <TextField
            label="Purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            fullWidth
            margin="dense"
            multiline
            rows={3} // Specifies 4 rows
          />
            </Grid>
          </Grid>
         
          <Button onClick={handleSubmit}>Register</Button>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default Volunteer;