import React, { useState } from "react";
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Checkbox,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { TRAINER_REGISTER } from "../endpoints";
import { CenterPopup } from "../components/notify/Notify";
import { useNavigate } from "react-router-dom";
import {
  RegDialogTitle,
  RegField,
  RegSelect,
  RegPassword,
  RegFile,
  useIsMobile,
} from "./FormParts";
import countryStateData from "./countryStateData";
import { V, clean, useFieldErrors } from "./validation";


function Trainer({ open, onClose }) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [userfname, setUserfname] = useState("");
  const [userlname, setUserlname] = useState("");
  const [useremail, setEmail] = useState("");
  const [usermobile, setMobile] = useState("");
  const [useraddress, setAddress] = useState("");
  const [userpassword, setPassword] = useState("");
  // country / state are plain strings (the names chosen in the drop-downs)
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [resume, setResume] = useState(null);
  const [Adhar, setAadhar] = useState(null);
  const [pancard, setPancard] = useState(null);
  const [qualification, setQualification] = useState("");
  const [languages_known, setKnownLanguages] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [willing_to_relocate, setWillingToRelocate] = useState(false);
  const [availability_of_work, setWorkAvailability] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const getErrors = () => ({
    fname: V.name(userfname, "First name"),
    lname: V.name(userlname, "Last name"),
    email: V.email(useremail),
    password: V.password(userpassword),
    mobile: V.mobile(usermobile),
    country: V.req(country, "Country"),
    state: V.req(state, "State"),
    languages: V.req(languages_known, "Languages"),
    experience: V.num(experience, "Experience", 0, 60),
    skills: V.req(skills, "Skills"),
    availability: V.req(availability_of_work, "Availability"),
    qualification: V.req(qualification, "Qualification"),
    pan: V.file(pancard, "PAN card"),
    aadhaar: V.file(Adhar, "Aadhaar card"),
    resume: V.file(resume, "resume"),
    address: V.min(useraddress, "Address", 5),
  });
  const { errors, clr, chg, blur, submit } = useFieldErrors(getErrors);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleCountryChange = (e) => {
    const value = e.target.value;
    setCountry(value);
    setStates(countryStateData[value] || []);
    setState("");
  };

  const showError = (message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  const handleSubmit = () => {
    if (!submit()) return showError("Please fix the highlighted fields.");

    setLoading(true);
    const formData = new FormData();
    formData.append("first_name", userfname);
    formData.append("last_name", userlname);
    formData.append("email", useremail);
    formData.append("password", userpassword);
    formData.append("mobile_number", usermobile);
    formData.append("address", useraddress);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("willing_to_relocate", willing_to_relocate);
    formData.append("languages_known", languages_known);
    formData.append("qualification", qualification);
    formData.append("availability_of_work", availability_of_work);
    formData.append("job_experience", experience);
    formData.append("skills", skills);
    formData.append("aadhaar_card", Adhar);
    formData.append("pan_card", pancard);
    formData.append("resume", resume);
    axios
      .post(`${TRAINER_REGISTER}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setShowPopup(true);
        setPopupMessage(`User successfully registered! Please check "${useremail}"!`);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/login");
        }, 4000);
      })
      .catch((error) => {
        let errorMessage = "An error occurred. Please try again.";
        if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMessage = "Bad Request: Email already registered.";
              break;
            case 401:
              errorMessage = "Unauthorized: Please log in and try again.";
              break;
            case 404:
              errorMessage = "Not Found: The requested resource could not be found.";
              break;
            case 500:
              errorMessage = "Internal Server Error: Something went wrong on the server.";
              break;
            default:
              errorMessage = `Error: Something went wrong. Status code: ${error.response.status}`;
          }
        }
        setShowPopup(true);
        setPopupMessage(errorMessage);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Dialog open={!!open} onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile}>
      <RegDialogTitle onClose={onClose}>Trainer Registration</RegDialogTitle>

      {loading && (
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      )}

      <CenterPopup
        open={showPopup}
        severity={/successfully/i.test(popupMessage) ? "success" : "error"}
        title={/successfully/i.test(popupMessage) ? "Registration successful" : "Registration failed"}
        message={popupMessage}
        onClose={() => setShowPopup(false)}
      />
      <CenterPopup
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />

      <DialogContent className="reg-content">
        <Grid container spacing={2}>
          {/* Account */}
          <Grid item xs={12} sm={6}>
            <RegField
              label="First name"
              hint="Your first name"
              value={userfname}
              onChange={chg(setUserfname, "fname", clean.name)} onBlur={() => blur("fname")} error={errors.fname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RegField
              label="Last name"
              hint="Your last name"
              value={userlname}
              onChange={chg(setUserlname, "lname", clean.name)} onBlur={() => blur("lname")} error={errors.lname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RegField
              label="Email"
              type="email"
              hint="Email address used to sign in"
              value={useremail}
              onChange={chg(setEmail, "email")} onBlur={() => blur("email")} error={errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RegPassword
              label="Password"
              hint="At least 6 characters"
              value={userpassword}
              onChange={chg(setPassword, "password")} onBlur={() => blur("password")} error={errors.password}
            />
          </Grid>

          {/* Contact & location */}
          <Grid item xs={12} sm={6} md={4}>
            <RegField
              label="Mobile Number"
              hint="10-digit mobile number" inputProps={{ inputMode: "numeric", maxLength: 10 }}
              value={usermobile}
              onChange={chg(setMobile, "mobile", clean.digits)} onBlur={() => blur("mobile")} error={errors.mobile}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RegSelect
              label="Country"
              hint="Country you live in"
              value={country}
              onChange={(e) => { handleCountryChange(e); clr("country"); }} error={errors.country}
            >
              {Object.keys(countryStateData).map((countryName) => (
                <MenuItem key={countryName} value={countryName}>
                  {countryName}
                </MenuItem>
              ))}
            </RegSelect>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RegSelect
              label="State"
              hint={country ? "State / province" : "Select a country first"}
              value={state}
              onChange={chg(setState, "state")} error={errors.state}
              disabled={!country}
            >
              {states.map((stateName) => (
                <MenuItem key={stateName} value={stateName}>
                  {stateName}
                </MenuItem>
              ))}
            </RegSelect>
          </Grid>

          {/* Professional details */}
          <Grid item xs={12} sm={6} md={4}>
            <RegField
              label="Languages Known"
              hint="Separate languages with commas"
              value={languages_known}
              onChange={chg(setKnownLanguages, "languages", clean.list)} onBlur={() => blur("languages")} error={errors.languages}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RegField
              label="Experience"
              hint="Years of experience"
              value={experience}
              onChange={chg(setExperience, "experience", clean.years)} onBlur={() => blur("experience")} error={errors.experience}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RegField
              label="Skills"
              hint="Separate skills with commas"
              value={skills}
              onChange={chg(setSkills, "skills")} onBlur={() => blur("skills")} error={errors.skills}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RegSelect
              label="Availability of Work"
              hint="How you can work"
              value={availability_of_work}
              onChange={chg(setWorkAvailability, "availability")} onBlur={() => blur("availability")} error={errors.availability}
            >
              <MenuItem value="hybrid">Hybrid</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="location-based">Location based</MenuItem>
            </RegSelect>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RegSelect
              label="Qualification"
              hint="Highest qualification"
              value={qualification}
              onChange={chg(setQualification, "qualification")} onBlur={() => blur("qualification")} error={errors.qualification}
            >
              <MenuItem value="10th equivalent">10th / Equivalent</MenuItem>
              <MenuItem value="12th equivalent">12th / Equivalent</MenuItem>
              <MenuItem value="degree equivalent">Degree / Equivalent</MenuItem>
            </RegSelect>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="reg-check">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={willing_to_relocate}
                    onChange={(e) => setWillingToRelocate(e.target.checked)}
                  />
                }
                label="Willing to relocate"
              />
            </div>
          </Grid>

          {/* Documents */}
          <Grid item xs={12} sm={6} md={4}>
            <RegFile hint="PAN Card" onChange={(e) => { setPancard(e.target.files[0]); clr("pan"); }} error={errors.pan} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RegFile hint="Aadhaar Card" onChange={(e) => { setAadhar(e.target.files[0]); clr("aadhaar"); }} error={errors.aadhaar} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RegFile hint="Resume" onChange={(e) => { setResume(e.target.files[0]); clr("resume"); }} error={errors.resume} />
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <RegField
              label="Address"
              hint="Full postal address"
              value={useraddress}
              onChange={chg(setAddress, "address")} onBlur={() => blur("address")} error={errors.address}
              multiline
              minRows={3}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className="reg-actions">
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Trainer;
