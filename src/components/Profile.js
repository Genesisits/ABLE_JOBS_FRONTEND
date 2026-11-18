import React, { useState, useEffect, useRef } from "react";
import "./profile.css";
import avatar from "../images/avatar.webp";
import Layout from "./sidenav/Layout";
import { CenterPopup } from "./notify/Notify";
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
import {
  EMPLOYEE_FIELDS,
  EMPLOYER_FIELDS,
  REQUIRED_FIELDS,
  fieldInputProps,
  sanitizers,
  validators,
  validateFields,
} from "./profileValidation";
const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#fafbff",
    "& fieldset": { borderColor: "#d5d9e8" },
    "&:hover fieldset": { borderColor: "#7883c0" },
    "&.Mui-focused fieldset": { borderColor: "#5a67b5", borderWidth: "2px" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#5a67b5" },
  // validation errors: red border, red label, red message below the field
  "& .MuiOutlinedInput-root.Mui-error fieldset, & .MuiOutlinedInput-root.Mui-error:hover fieldset":
    { borderColor: "#d32f2f" },
  "& .MuiInputLabel-root.Mui-error, & .MuiInputLabel-root.Mui-focused.Mui-error":
    { color: "#d32f2f" },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#d32f2f",
    marginLeft: "4px",
    fontSize: "12px",
  },
};
const sectionTitleSx = {
  fontWeight: 600,
  fontSize: "15px",
  color: "#3b4380",
  borderBottom: "1px solid #e3e6f2",
  pb: 0.5,
  mt: 1,
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
  const [imgVersion, setImgVersion] = useState(Date.now());
  const [imageFile, setImageFile] = useState(null); // For handling image upload
  const accessToken = localStorage.getItem("access_token");
  const hasFetched = useRef(false);
  const [confirmOpen, setConfirmOpen] = useState(false); // photo preview popup
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false); // image upload only (keeps the page mounted)
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
    title: undefined,
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
    setErrors({});
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setErrors({});
    setOpenDialog(false);
  };

  // Block invalid characters while typing and clear that field's error.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitize = sanitizers[name];
    const next = sanitize && typeof value === "string" ? sanitize(value) : value;
    setUser((prevUser) => ({ ...prevUser, [name]: next }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  // Validate a single field when the user leaves it.
  const handleBlur = (e) => {
    const { name } = e.target;
    const message = validators[name]?.(user[name]);
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleSaveChanges = async () => {
    // Validate before anything else so the dialog stays open on errors.
    const fields = userType === "Employee" ? EMPLOYEE_FIELDS : EMPLOYER_FIELDS;
    const newErrors = validateFields(fields, user);
    setErrors(newErrors);
    const firstInvalid = fields.find((f) => newErrors[f]);
    if (firstInvalid) {
      setTimeout(
        () => document.querySelector(`[name="${firstInvalid}"]`)?.focus(),
        0
      );
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      const restrictedFields = [
        "company_logo",
        "gst_file",
        "pan",
        "registration_certificate",
        "profile_image", // URL string, uploaded separately
      ];

      Object.entries(user).forEach(([key, value]) => {
        if (!restrictedFields.includes(key)) {
          formData.append(key, typeof value === "string" ? value.trim() : value); // Attach only non-restricted fields
        }
      });

      const response = await axios.patch(PROFILE_UPDATE, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data", // Required for FormData
        },
      });

      if (response.status === 200) {
        setUser((prev) => ({ ...prev, ...(response.data.user_profile || {}), profile_image: prev.profile_image }));
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

  const MAX_IMAGE_MB = 5;
  const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  const clearPreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
    setImageFile(null);
  };

  // Free the preview URL if the page is left while a preview is open.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Step 1: user picks a file -> validate it -> open the preview popup.
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    e.target.value = ""; // lets the same file be chosen again later
    if (!file) return;

    if (!validImageTypes.includes(file.type)) {
      setSnackbar({
        open: true,
        title: "Invalid file",
        message: "Please upload a valid image file (JPEG, PNG, WEBP, or GIF).",
        severity: "error",
      });
      return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setSnackbar({
        open: true,
        title: "Image too large",
        message: `Please choose an image smaller than ${MAX_IMAGE_MB} MB.`,
        severity: "error",
      });
      return;
    }

    clearPreview();
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setConfirmOpen(true);
  };

  const handleImageCancel = () => {
    if (uploading) return;
    setConfirmOpen(false);
    clearPreview();
  };

  // Step 2: user confirms in the popup -> upload -> success / error popup.
  const handleImageUpload = async () => {
    if (!imageFile) {
      setSnackbar({
        open: true,
        title: "No image selected",
        message: "Please select an image to upload.",
        severity: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    setUploading(true);
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
        setImgVersion(Date.now());
        setConfirmOpen(false);
        clearPreview();
        setSnackbar({
          open: true,
          title: "Profile photo updated",
          message: "Your new profile photo has been saved successfully.",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          title: "Update failed",
          message: "Unexpected response from the server. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        title: "Update failed",
        message:
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to upload image. Please try again.",
        severity: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "", title: undefined });
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
                  ? `${user.profile_image}${user.profile_image.includes("?") ? "&" : "?"}t=${imgVersion}`
                  : avatar
              }
              alt="Profile"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = avatar; }}
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
          <CenterPopup
            open={snackbar.open}
            severity={snackbar.severity || "info"}
            title={snackbar.title}
            message={snackbar.message}
            onClose={handleCloseSnackbar}
          />
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
                    <span className="info-label">Hr FirstName:</span>
                    <span className="info-value">{user.head_first_name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Hr LastName:</span>
                    <span className="info-value">{user.head_last_name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Hr Designation:</span>
                    <span className="info-value">{user.head_designation}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Hr Contact:</span>
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
        </div>
      </div>

      {/* ---------- profile photo preview / confirm popup ---------- */}
      <Dialog
        open={confirmOpen}
        onClose={handleImageCancel}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: "16px" } }}
      >
        <DialogTitle
          sx={{ fontWeight: 600, color: "#3b4380", borderBottom: "1px solid #e3e6f2" }}
        >
          Update Profile Photo
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", pt: "24px !important" }}>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Selected profile preview"
              style={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #e3e6f2",
              }}
            />
          )}
          <Typography sx={{ mt: 2, fontWeight: 600, wordBreak: "break-word" }}>
            {imageFile?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
            Do you want to use this photo as your profile picture?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: "1px solid #e3e6f2" }}>
          <Button
            onClick={handleImageCancel}
            disabled={uploading}
            sx={{ color: "#555", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleImageUpload}
            disabled={uploading}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              background: "linear-gradient(45deg,#7883c0,#5a67b5)",
              px: 3,
              minWidth: 140,
            }}
          >
            {uploading ? (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            ) : (
              "Update Photo"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: "16px" } }}
      >
        <DialogTitle sx={{ fontWeight: 600, color: "#3b4380", borderBottom: "1px solid #e3e6f2" }}>
          Update Profile
        </DialogTitle>
        {userType === "Employee" && (
          <DialogContent sx={{ pt: "20px !important" }}>
            <Grid container spacing={2.5}>
              <Grid item xs={12}><Typography sx={sectionTitleSx}>Personal Details</Typography></Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  value={user.first_name ?? ""}
                  name="first_name"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("first_name")}
                  onBlur={handleBlur}
                  error={Boolean(errors.first_name)}
                  helperText={errors.first_name}
                  inputProps={fieldInputProps.first_name}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  value={user.last_name ?? ""}
                  name="last_name"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("last_name")}
                  onBlur={handleBlur}
                  error={Boolean(errors.last_name)}
                  helperText={errors.last_name}
                  inputProps={fieldInputProps.last_name}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile Number"
                  fullWidth
                  value={user.mobile_number ?? ""}
                  name="mobile_number"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("mobile_number")}
                  onBlur={handleBlur}
                  error={Boolean(errors.mobile_number)}
                  helperText={errors.mobile_number}
                  inputProps={fieldInputProps.mobile_number}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}><Typography sx={sectionTitleSx}>Work & Other Details</Typography></Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Skills"
                  fullWidth
                  value={user.skills ?? ""}
                  name="skills"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("skills")}
                  onBlur={handleBlur}
                  error={Boolean(errors.skills)}
                  helperText={errors.skills}
                  inputProps={fieldInputProps.skills}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  fullWidth
                  value={user.address ?? ""}
                  name="address"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("address")}
                  onBlur={handleBlur}
                  error={Boolean(errors.address)}
                  helperText={errors.address}
                  inputProps={fieldInputProps.address}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Country"
                  fullWidth
                  value={user.country ?? ""}
                  name="country"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("country")}
                  onBlur={handleBlur}
                  error={Boolean(errors.country)}
                  helperText={errors.country}
                  inputProps={fieldInputProps.country}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="State"
                  fullWidth
                  value={user.state ?? ""}
                  name="state"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("state")}
                  onBlur={handleBlur}
                  error={Boolean(errors.state)}
                  helperText={errors.state}
                  inputProps={fieldInputProps.state}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Availability of Work"
                  fullWidth
                  value={user.availability_of_work ?? ""}
                  name="availability_of_work"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("availability_of_work")}
                  onBlur={handleBlur}
                  error={Boolean(errors.availability_of_work)}
                  helperText={errors.availability_of_work}
                  inputProps={fieldInputProps.availability_of_work}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Disability"
                  fullWidth
                  value={user.disability ?? ""}
                  name="disability"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("disability")}
                  onBlur={handleBlur}
                  error={Boolean(errors.disability)}
                  helperText={errors.disability}
                  inputProps={fieldInputProps.disability}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Job Experiences"
                  fullWidth
                  value={user.job_experiences ?? ""}
                  name="job_experiences"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("job_experiences")}
                  onBlur={handleBlur}
                  error={Boolean(errors.job_experiences)}
                  helperText={errors.job_experiences}
                  inputProps={fieldInputProps.job_experiences}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Languages Known"
                  fullWidth
                  value={user.languages_known ?? ""}
                  name="languages_known"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("languages_known")}
                  onBlur={handleBlur}
                  error={Boolean(errors.languages_known)}
                  helperText={errors.languages_known}
                  inputProps={fieldInputProps.languages_known}
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
          <DialogContent sx={{ pt: "20px !important" }}>
            <Grid container spacing={2.5}>
              <Grid item xs={12}><Typography sx={sectionTitleSx}>Company Details</Typography></Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company Name"
                  fullWidth
                  value={user.company_name ?? ""}
                  name="company_name"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("company_name")}
                  onBlur={handleBlur}
                  error={Boolean(errors.company_name)}
                  helperText={errors.company_name}
                  inputProps={fieldInputProps.company_name}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  fullWidth
                  value={user.location ?? ""}
                  name="location"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("location")}
                  onBlur={handleBlur}
                  error={Boolean(errors.location)}
                  helperText={errors.location}
                  inputProps={fieldInputProps.location}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  fullWidth
                  value={user.email ?? ""}
                  name="email"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("email")}
                  onBlur={handleBlur}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  inputProps={fieldInputProps.email}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact"
                  fullWidth
                  value={user.company_contact ?? ""}
                  name="company_contact"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("company_contact")}
                  onBlur={handleBlur}
                  error={Boolean(errors.company_contact)}
                  helperText={errors.company_contact}
                  inputProps={fieldInputProps.company_contact}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Industry"
                  fullWidth
                  value={user.industry ?? ""}
                  name="industry"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("industry")}
                  onBlur={handleBlur}
                  error={Boolean(errors.industry)}
                  helperText={errors.industry}
                  inputProps={fieldInputProps.industry}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Website"
                  fullWidth
                  value={user.company_website ?? ""}
                  name="company_website"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("company_website")}
                  onBlur={handleBlur}
                  error={Boolean(errors.company_website)}
                  helperText={errors.company_website}
                  inputProps={fieldInputProps.company_website}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}><Typography sx={sectionTitleSx}>Hr of Company</Typography></Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hr First Name"
                  fullWidth
                  value={user.head_first_name ?? ""}
                  name="head_first_name"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("head_first_name")}
                  onBlur={handleBlur}
                  error={Boolean(errors.head_first_name)}
                  helperText={errors.head_first_name}
                  inputProps={fieldInputProps.head_first_name}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hr Last Name"
                  fullWidth
                  value={user.head_last_name ?? ""}
                  name="head_last_name"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("head_last_name")}
                  onBlur={handleBlur}
                  error={Boolean(errors.head_last_name)}
                  helperText={errors.head_last_name}
                  inputProps={fieldInputProps.head_last_name}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hr Email"
                  fullWidth
                  value={user.head_email ?? ""}
                  name="head_email"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("head_email")}
                  onBlur={handleBlur}
                  error={Boolean(errors.head_email)}
                  helperText={errors.head_email}
                  inputProps={fieldInputProps.head_email}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hr Contact"
                  fullWidth
                  value={user.head_contact ?? ""}
                  name="head_contact"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("head_contact")}
                  onBlur={handleBlur}
                  error={Boolean(errors.head_contact)}
                  helperText={errors.head_contact}
                  inputProps={fieldInputProps.head_contact}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hr Designation"
                  fullWidth
                  value={user.head_designation ?? ""}
                  name="head_designation"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("head_designation")}
                  onBlur={handleBlur}
                  error={Boolean(errors.head_designation)}
                  helperText={errors.head_designation}
                  inputProps={fieldInputProps.head_designation}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Linkedin Link"
                  fullWidth
                  value={user.linkedinlink ?? ""}
                  name="linkedinlink"
                  onChange={handleInputChange}
                  required={REQUIRED_FIELDS.has("linkedinlink")}
                  onBlur={handleBlur}
                  error={Boolean(errors.linkedinlink)}
                  helperText={errors.linkedinlink}
                  inputProps={fieldInputProps.linkedinlink}
                  sx={textFieldStyles}
                />
              </Grid>
            </Grid>
          </DialogContent>
        )}

        <DialogActions sx={{ p: 2, borderTop: "1px solid #e3e6f2" }}>
          <Button onClick={handleDialogClose} sx={{ color: "#555", textTransform: "none" }}>Cancel</Button>
          <Button onClick={handleSaveChanges} variant="contained" sx={{ textTransform: "none", borderRadius: "8px", background: "linear-gradient(45deg,#7883c0,#5a67b5)", px: 3 }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Profile;