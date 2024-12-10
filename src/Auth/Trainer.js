import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Grid,
  Box,
  TextField,
  Dialog,
  DialogActions,
  Button,
  Checkbox,
  Select,
  MenuItem,
  DialogTitle,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import { CountryDropdown, StateDropdown } from "react-country-state-dropdown";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { TRAINER_REGISTER } from "../endpoints";
import { Password } from "@mui/icons-material";
const countryStateData = {
  USA: [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ],
  Canada: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
  ],
  India: [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Lakshadweep",
    "Puducherry",
    "Ladakh",
  ],
  Australia: [
    "New South Wales",
    "Victoria",
    "Queensland",
    "Western Australia",
    "South Australia",
    "Tasmania",
    "Northern Territory",
    "Australian Capital Territory",
  ],
  UnitedKingdom: ["England", "Scotland", "Wales", "Northern Ireland"],
  Germany: [
    "Baden-Württemberg",
    "Bavaria",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hesse",
    "Lower Saxony",
    "Mecklenburg-Western Pomerania",
    "North Rhine-Westphalia",
    "Rhineland-Palatinate",
    "Saarland",
    "Saxony",
    "Saxony-Anhalt",
    "Schleswig-Holstein",
    "Thuringia",
  ],
  China: [
    "Anhui",
    "Beijing",
    "Chongqing",
    "Fujian",
    "Gansu",
    "Guangdong",
    "Guangxi",
    "Guizhou",
    "Hainan",
    "Hebei",
    "Heilongjiang",
    "Henan",
    "Hong Kong",
    "Hubei",
    "Hunan",
    "Inner Mongolia",
    "Jiangsu",
    "Jiangxi",
    "Jilin",
    "Liaoning",
    "Macau",
    "Ningxia",
    "Qinghai",
    "Shaanxi",
    "Shandong",
    "Shanghai",
    "Shanxi",
    "Sichuan",
    "Tianjin",
    "Tibet",
    "Xinjiang",
    "Yunnan",
    "Zhejiang",
  ],
  Brazil: [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ],
  SouthAfrica: [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "North West",
    "Northern Cape",
    "Western Cape",
  ],
};
function Trainer({ open, onClose }) {
  const theme = createTheme();
  const [userfname, setUserfname] = useState("");
  const [userlname, setUserlname] = useState("");
  const [useremail, setEmail] = useState("");
  const [usermobile, setMobile] = useState("");
  const [useraddress, setAddress] = useState("");
  const [userpassword, setPassword] = useState("");
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [states, setStates] = useState([]);
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const handleSnackbarClose = () => setSnackbarOpen(false);
  const [loading, setLoading] = useState(false)

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setCountry(country);
    setStates(countryStateData[country] || []); // Update states based on selected country
    setState(""); // Reset state selection
  };

  const handleSubmit = () => {
    if (!userfname || !userlname) {
      setSnackbarMessage("First and Last name are required!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (!useremail.includes("@")) {
      setSnackbarMessage("Invalid email format!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (!userpassword || userpassword.length < 6) {
      setSnackbarMessage("Password must be at least 6 characters long!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (!usermobile || usermobile.length < 10) {
      setSnackbarMessage("Enter a valid mobile number!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (!languages_known) {
      setSnackbarMessage("Enter atleast one language");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (!qualification) {
      setSnackbarMessage("Enter your qualification");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (!experience) {
      setSnackbarMessage("Enter your experience");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (!skills) {
      setSnackbarMessage("Enter atleast one skill");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (!country || !state) {
      setSnackbarMessage("Please select both country and state!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (!resume || !pancard || !Adhar) {
      setSnackbarMessage("Upload all required documents (Resume, PAN, Aadhaar)!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (!useraddress) {
      setSnackbarMessage("Enter Address");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    setLoading(true)
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
    formData.append("skills", skills)
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
        setSnackbarMessage("Registration successful!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setTimeout(() => {
          onClose(false)
        }, 1000)
        console.log(response.data);
      })
      .catch((error) => {
        setSnackbarMessage("Registration failed. Try again!");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.error(error);
      }).finally(() => {
        setLoading(false)
      })
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle style={{ textAlign: 'center' }}>Trainer Registration</DialogTitle>
      <div>
        <ThemeProvider theme={theme}>
          {loading && (
            <div className="full-page-spinner">
              <CircularProgress color="primary" size={50} />
            </div>
          )}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <Box style={{ margin: "1% 10%" }}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
                <FormControl fullWidth>
                  <Select
                    value={country || ""}
                    onChange={handleCountryChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Select Country" }}
                    sx={{
                      margin: "10px 0px",
                      height: 45,
                      padding: "4px 10px",
                      fontSize: "0.875rem",
                      "&.Mui-focused": {
                        outline: "2px solid #3f51b5",
                        outlineOffset: "2px",
                      },
                      height: "40px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <MenuItem value="">Select Country</MenuItem>
                    {Object.keys(countryStateData).map((countryName) => (
                      <MenuItem key={countryName} value={countryName}>
                        {countryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Select
                    value={state || ""}
                    onChange={(e) => setState(e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Select State" }}
                    disabled={!country}
                    sx={{
                      margin: "10px 0px",
                      height: 45,
                      padding: "4px 10px",
                      fontSize: "0.875rem",
                      "&.Mui-focused": {
                        outline: "2px solid #3f51b5",
                        outlineOffset: "2px",
                      },
                      height: "40px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <MenuItem value="">Select State</MenuItem>
                    {states.map((stateName) => (
                      <MenuItem key={stateName} value={stateName}>
                        {stateName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
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
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <Select
                    value={availability_of_work}
                    onChange={(e) => setWorkAvailability(e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}

                    sx={{
                      margin: "10px 0px",
                      height: 45,
                      padding: "4px 10px",
                      fontSize: "0.875rem",
                      "&.Mui-focused": {
                        outline: "2px solid #3f51b5",
                        outlineOffset: "2px",
                      },
                      height: "40px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <MenuItem value="">Availability of Work</MenuItem>
                    <MenuItem value="hybrid">Hybrid</MenuItem>
                    <MenuItem value="remote">Remote</MenuItem>
                    <MenuItem value="location-based">Location based</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <Select
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      margin: "10px 0px",
                      height: 45,
                      padding: "4px 10px",
                      fontSize: "0.875rem",
                      "&.Mui-focused": {
                        outline: "2px solid #3f51b5",
                        outlineOffset: "2px",
                      },
                      height: "40px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <MenuItem value="">Qualification</MenuItem>
                    <MenuItem value="10th equivalent">10th/ Equivalent</MenuItem>
                    <MenuItem value="12th equivalent">12th /Equivalent</MenuItem>
                    <MenuItem value="degree equivalent">Degree/ Equivalent</MenuItem>
                  </Select>
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
            />
            {/* </Grid> */}
            {/* <Button onClick={handleSubmit}>Register</Button> */}
            <DialogActions>
              <Button onClick={onClose} color="secondary">Cancel</Button>
              <Button onClick={handleSubmit} color="primary">Register</Button>
            </DialogActions>
          </Box>
        </ThemeProvider>
      </div>
    </Dialog>
  );
}

export default Trainer;