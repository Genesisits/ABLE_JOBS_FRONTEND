import React, { useState } from "react";
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { VOLUNTEER_REGISTER } from "../endpoints";
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

function Volunteer({ open, onClose }) {
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
  const [purpose, setPurpose] = useState("");
  const [qualification, setQualification] = useState("");
  const [no_of_hours, setNOH] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
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
    hours: V.num(no_of_hours, "Number of hours", 1, 999),
    qualification: V.req(qualification, "Qualification"),
    country: V.req(country, "Country"),
    state: V.req(state, "State"),
    pan: V.file(pancard, "PAN card"),
    aadhaar: V.file(Adhar, "Aadhaar card"),
    resume: V.file(resume, "resume"),
    address: V.min(useraddress, "Address", 5),
    purpose: V.min(purpose, "Purpose", 5),
  });
  const { errors, clr, chg, blur, submit } = useFieldErrors(getErrors);

  const handleSnackbarClose = () => setOpenSnackbar(false);

  const handleCountryChange = (e) => {
    const value = e.target.value;
    setCountry(value);
    setStates(countryStateData[value] || []);
    setState("");
  };

  const handleSubmit = () => {
    if (!submit()) {
      setSnackbarMessage("Please fix the highlighted fields.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
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
    formData.append("qualification", qualification);
    formData.append("purpose", purpose);
    formData.append("no_of_hours", no_of_hours);
    formData.append("aadhaar_card", Adhar);
    formData.append("pan_card", pancard);
    formData.append("resume", resume);
    axios
      .post(`${VOLUNTEER_REGISTER}`, formData, {
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
      <RegDialogTitle onClose={onClose}>Volunteer Registration</RegDialogTitle>

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
        open={openSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />

      <DialogContent className="reg-content">
        <Grid container spacing={2}>
          {/* Account */}
          <Grid item xs={12} sm={6} md={4}>
            <RegField
              label="First name"
              hint="Your first name"
              value={userfname}
              onChange={chg(setUserfname, "fname", clean.name)} onBlur={() => blur("fname")} error={errors.fname}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RegField
              label="Last name"
              hint="Your last name"
              value={userlname}
              onChange={chg(setUserlname, "lname", clean.name)} onBlur={() => blur("lname")} error={errors.lname}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RegField
              label="Email"
              type="email"
              hint="Email address used to sign in"
              value={useremail}
              onChange={chg(setEmail, "email")} onBlur={() => blur("email")} error={errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RegPassword
              label="Password"
              hint="At least 6 characters"
              value={userpassword}
              onChange={chg(setPassword, "password")} onBlur={() => blur("password")} error={errors.password}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RegField
              label="Mobile Number"
              hint="10-digit mobile number" inputProps={{ inputMode: "numeric", maxLength: 10 }}
              value={usermobile}
              onChange={chg(setMobile, "mobile", clean.digits)} onBlur={() => blur("mobile")} error={errors.mobile}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RegField
              label="Number Of Hours"
              hint="Hours you can volunteer"
              value={no_of_hours}
              onChange={chg(setNOH, "hours", clean.hours)} onBlur={() => blur("hours")} error={errors.hours}
            />
          </Grid>

          {/* Qualification & location */}
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

          {/* Address & purpose */}
          <Grid item xs={12} sm={6}>
            <RegField
              label="Address"
              hint="Full postal address"
              value={useraddress}
              onChange={chg(setAddress, "address")} onBlur={() => blur("address")} error={errors.address}
              multiline
              minRows={3}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RegField
              label="Purpose"
              hint="Why you want to volunteer"
              value={purpose}
              onChange={chg(setPurpose, "purpose")} onBlur={() => blur("purpose")} error={errors.purpose}
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

export default Volunteer;
