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
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import { CountryDropdown, StateDropdown } from "react-country-state-dropdown";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { VOLUNTEER_REGISTER } from "../endpoints";
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

function Volunteer({ open, onClose }) {
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
  const [purpose, setPurpose] = useState("");
  const [Adhar, setAadhar] = useState(null);
  const [qualification, setQualification] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [loading, setLoading] = useState(false)
  //   const [languages_known, setKnownLanguages] = useState("");
  const [pancard, setPancard] = useState(null);
  const [no_of_hours, setNOH] = useState("");
  //   const [experience, setExperience] = useState("");
  //   const [skills, setSkills] = useState("")
  //   const [willing_to_relocate, setWillingToRelocate] = useState(false);
  //   const [availability_of_work, setWorkAvailability] = useState("");
  const handleSetCountry = (e, value) => setCountry(value);
  const handleSetState = (e, value) => setState(value);

  const handleSnackbarClose = () => setOpenSnackbar(false);
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setCountry(country);
    setStates(countryStateData[country] || []); // Update states based on selected country
    setState(""); // Reset state selection
  };
  const handleSubmit = () => {

    if (!resume || !Adhar || !pancard || !userfname || !userlname || !useremail || !userpassword || !usermobile || !useraddress || !country || !state || !qualification || !purpose || !no_of_hours) {
      setSnackbarMessage("Please fill all the required fields.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
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
    // formData.append("willing_to_relocate", willing_to_relocate);
    // formData.append("languages_known", languages_known);
    formData.append("qualification", qualification);
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
        if (response.status === 201) {
          // Success - Show a message
          setSnackbarMessage("Registration successful! You have been successfully registered.");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          onClose(); // Close dialog on success
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 400) {
          // Check if the error is due to email already existing
          if (error.response.data.email && error.response.data.email[0] === "volunteer with this email already exists.") {
            setSnackbarMessage("Email already exists. Please use a different email.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
          } else {
            setSnackbarMessage("Registration failed. Please try again.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
          }
        } else {
          setSnackbarMessage("Registration failed. Please try again.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      }).finally(() => {
        setLoading(false)
      })
  };

  return (
    <div style={{ marginTop: "2%" }}>

      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        {loading && (
          <div className="full-page-spinner">
            <CircularProgress color="primary" size={50} />
          </div>
        )}
        <DialogTitle style={{ textAlign: 'center' }}>Volunteer Registration</DialogTitle>
        <ThemeProvider theme={theme}>
          <Box style={{ margin: "2% 5%" }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Select
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        // margin: "10px 0px",
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
                      <MenuItem value="10th equivalent">
                        10th/ Equivalent
                      </MenuItem>
                      <MenuItem value="12th equivalent">
                        12th /Equivalent
                      </MenuItem>
                      <MenuItem value="degree equivalent">
                        Degree/ Equivalent
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
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
              </Grid>
            </Grid>

            <Grid container spacing={2}>
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

            {/* <Button onClick={handleSubmit}>Register</Button> */}
            <DialogActions>
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Register
              </Button>
            </DialogActions>
          </Box>
        </ThemeProvider>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Volunteer;
