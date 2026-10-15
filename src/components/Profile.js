import React, { useState, useEffect, useRef } from "react";
import "./profile.css";
import avatar from "../images/avatar.webp";
import Layout from "./sidenav/Layout";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
  FormControlLabel,
  Typography,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import {
  USER_PROFILE,
  PROFILE_UPDATE,
  PROFILE_UPDATE_IMAGE,
} from "../endpoints";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { CheckBox } from "@mui/icons-material";
const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "transparent" },
    "&:hover fieldset": { borderColor: "transparent" },
    "&.Mui-focused fieldset": { borderColor: "transparent" },
  },
};
const snackbarStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1400,
};
const fieldLabels = {
  first_name: "First Name",
  last_name: "Last Name",
  mobile_number: "Mobile Number",
  skills: "Skills",
  address: "Address",
  company_name: "Company Name",
  location: "Location",
  email: "Email",
  company_contact: "Company Contact",
  industry: "Industry",
  company_website: "Company Website",
  head_first_name: "Head First Name",
  head_last_name: "Head Last Name",
  head_email: "Head Email",
  head_contact: "Head Contact",
  head_designation: "Head Designation",
  linkedinlink: "LinkedIn Link",
  country: "Country",
  state: "State",
  availability_of_work: "Availability of Work",
  disability: "Disability",
  job_experiences: "Job Experiences",
  languages_known: "Languages Known",
  willing_to_relocate: "Willing to Relocate",
};
const Profile = () => {
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    skills: "",
    address: "",
    profile_image: "",
    willing_to_relocate: false,
  });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [imageFile, setImageFile] = useState(null); // For handling image upload
  const accessToken = localStorage.getItem("access_token");
  const hasFetched = useRef(false);
  const [showSubmit, setshowSubmit] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!hasFetched.current) {
          const response = await axios.get(USER_PROFILE, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUserType(response.data.user_type);
          setUser(response.data.user_profile);
          hasFetched.current = true;
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [accessToken]);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Updating field:", name, "with value:", value);
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    const employeeRequiredFields = [
      "first_name",
      "last_name",
      "mobile_number",
      "skills",
      "address",
      "country",
      "state",
      "availability_of_work",
      "disability",
      "languages_known",
      // "willing_to_relocate",
    ];
    const employerRequiredFields = [
      "company_name",
      "location",
      "email",
      "company_contact",
      "industry",
      "company_website",
      "head_first_name",
      "head_last_name",
      "head_email",
      "head_contact",
      "head_designation",
      "linkedinlink",
    ];

    const requiredFields =
      userType === "Employee" ? employeeRequiredFields : employerRequiredFields;
    const emptyFields = requiredFields.filter((field) => {
      const fieldValue = user[field];

      if (typeof fieldValue === "string") {
        return !fieldValue.trim();
      }

      return !fieldValue;
    });

    if (emptyFields.length > 0) {
      const emptyFieldLabels = emptyFields.map(
        (field) => fieldLabels[field] || field
      );

      setSnackbar({
        open: true,
        message: `The following fields should not be empty: ${emptyFieldLabels.join(", ")}`,
        severity: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      const restrictedFields = [
        "company_logo",
        "gst_file",
        "pan",
        "registration_certificate",
      ];

      Object.entries(user).forEach(([key, value]) => {
        if (!restrictedFields.includes(key)) {
          formData.append(key, value); // Attach only non-restricted fields
        }
      });

      const response = await axios.patch(PROFILE_UPDATE, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data", // Required for FormData
        },
      });

      if (response.status === 200) {
        setUser(response.data);
        setSnackbar({
          open: true,
          message: "Profile updated successfully",
          severity: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update profile",
        severity: "error",
      });
    } finally {
      handleDialogClose();
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (file && validImageTypes.includes(file.type)) {
      setImageFile(file);
      setshowSubmit(true);
    } else {
      setSnackbar({
        open: true,
        message: "Please upload a valid image file (JPEG, PNG, WEBP, or GIF).",
        severity: "error",
      });
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setSnackbar({
        open: true,
        message: "Please select an image to upload",
        severity: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    setLoading(true);
    try {
      const response = await axios.post(PROFILE_UPDATE_IMAGE, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const { profile_image_url } = response.data;
        setUser((prevUser) => ({
          ...prevUser,
          profile_image: profile_image_url,
        }));
        setSnackbar({
          open: true,
          message: "Profile image updated successfully",
          severity: "success",
        });
        setshowSubmit(false);
      } else {
        setSnackbar({
          open: true,
          message: "Unexpected response",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to upload image",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };
  if (loading) {
    return (
      <Layout>
        <div className="profile-container">
          <CircularProgress />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="profile-container">No profile data available.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image-container">
            <img
              className="profile-image"
              src={
                user.profile_image
                  ? `${user.profile_image}?t=${new Date().getTime()}`
                  : avatar
              }
              alt="Profile"
            />
            <label htmlFor="image-upload-input" className="camera-icon">
              <CameraAltIcon />
            </label>
          </div>
          <div className="image-upload">
            <input
              accept="image/*"
              type="file"
              id="image-upload-input"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
          {userType === "Employee" && (
            <>
              <h2 className="profile-name">{`${user.first_name} ${user.last_name}`}</h2>
              <div style={{ display: "flex" }}>
                <div className="profile-info">
                  <div className="info-item">
                    <span className="info-label">Mobile Number:</span>
                    <span className="info-value">{user.mobile_number}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Country:</span>
                    <span className="info-value">{user.country}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">State:</span>
                    <span className="info-value">{user.state}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Address:</span>
                    <span className="info-value">{user.address}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Skills:</span>
                    <span className="info-value">{user.skills}</span>
                  </div>
                </div>
                <div className="profile-info1">
                  <div className="info-item">
                    <span className="info-label">Availability of Work:</span>
                    <span className="info-value">
                      {user.availability_of_work}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Disability:</span>
                    <span className="info-value">{user.disability}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Job Experiences:</span>
                    <span className="info-value">{user.job_experiences}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Languages Known:</span>
                    <span className="info-value">{user.languages_known}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">willing to relocate:</span>
                    <span className="info-value">
                      {user.willing_to_relocate === true ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {userType === "Employer" && (
            <>
              <h2 className="profile-name">{user.company_name}</h2>
              <div style={{ display: "flex" }}>
                <div className="profile-info">
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Contact:</span>
                    <span className="info-value">{user.company_contact}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Industry:</span>
                    <span className="info-value">{user.industry}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Location:</span>
                    <span className="info-value">{user.location}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Website:</span>
                    <span className="info-value">
                      <a
                        href={user.company_website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.company_website}
                      </a>
                    </span>
                  </div>
                </div>
                <div className="profile-info1">
                  <div className="info-item">
                    <span className="info-label">Company Head FirstName:</span>
                    <span className="info-value">{user.head_first_name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Company Head LastName:</span>
                    <span className="info-value">{user.head_last_name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Head Designation:</span>
                    <span className="info-value">{user.head_designation}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Head Contact:</span>
                    <span className="info-value">{user.head_contact}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Linkedin Link:</span>
                    <span className="info-value">
                      <a
                        href={user.linkedinlink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.linkedinlink}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          <button className="edit-button" onClick={handleDialogOpen}>
            Edit Profile
          </button>
          {showSubmit && (
            <Button
              onClick={handleImageUpload}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          )}
        </div>
      </div>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Update Profile</DialogTitle>
        {userType === "Employee" && (
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  value={user.first_name}
                  name="first_name"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  value={user.last_name}
                  name="last_name"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile Number"
                  fullWidth
                  value={user.mobile_number}
                  name="mobile_number"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Skills"
                  fullWidth
                  value={user.skills}
                  name="skills"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  fullWidth
                  value={user.address}
                  name="address"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Country"
                  fullWidth
                  value={user.country}
                  name="country"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="state"
                  fullWidth
                  value={user.state}
                  name="state"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Avalibility of work"
                  fullWidth
                  value={user.availability_of_work}
                  name="availability_of_work"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Disability"
                  fullWidth
                  value={user.disability}
                  name="disability"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Job Experiences"
                  fullWidth
                  value={user.job_experiences}
                  name="job_experiences"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Languages Known"
                  fullWidth
                  value={user.languages_known}
                  name="languages_known"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={user.willing_to_relocate === true}
                      onChange={(e) => {
                        handleInputChange({
                          target: {
                            name: "willing_to_relocate",
                            value: e.target.checked, // Update with true/false
                          },
                        });
                      }}
                      color="primary"
                    />
                  }
                  label={
                    <Typography sx={{ color: "black" }}>
                      Willing to Relocate
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
        )}

        {userType === "Employer" && (
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company Name"
                  fullWidth
                  value={user.company_name}
                  name="company_name"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  fullWidth
                  value={user.location}
                  name="location"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  fullWidth
                  value={user.email}
                  name="email"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact"
                  fullWidth
                  value={user.company_contact}
                  name="company_contact"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Industry"
                  fullWidth
                  value={user.industry}
                  name="industry"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Website"
                  fullWidth
                  value={user.company_website}
                  name="company_website"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Head FirstName"
                  fullWidth
                  value={user.head_first_name}
                  name="head_first_name"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Head LastName"
                  fullWidth
                  value={user.head_last_name}
                  name="head_last_name"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Head email"
                  fullWidth
                  value={user.head_email}
                  name="head_email"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Head Contact"
                  fullWidth
                  value={user.head_contact}
                  name="head_contact"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Head Designation"
                  fullWidth
                  value={user.head_designation}
                  name="head_designation"
                  onChange={handleInputChange}
                  sx={{
                    margin: "8px 0", // Add spacing between fields
                    borderRadius: "8px", // Optional: Rounded corners for input
                    "& .MuiInputBase-root": {
                      borderRadius: "8px", // Round the input box
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Linkedin Link"
                  fullWidth
                  value={user.linkedinlink}
                  name="linkedinlink"
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                />
              </Grid>
            </Grid>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Profile;
