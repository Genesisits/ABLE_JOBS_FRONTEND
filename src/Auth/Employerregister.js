import React, { useState } from 'react';
import './employerregister.css';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, MenuItem, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { CenterPopup } from "../components/notify/Notify";
import { EMPLOYER_REGISTER } from '../endpoints';
import { RegDialogTitle, RegField, RegSelect, RegPassword, RegFile, useIsMobile } from './FormParts';
import { V, clean } from "./validation";

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
    const isMobile = useIsMobile();
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
    const [loading, setLoading] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState("error");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleSnackbarClose = () => setSnackbarOpen(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");


    const set = (setter, key, fmt = (v) => v) => (e) => {
        setter(fmt(e.target.value));
        setErrors((p) => ({ ...p, [key]: undefined }));
    };
    const handleCompanysize = set(setCompanysize, "company_size");
    // const handleCompanylogo = (event) => setCompanylogo(event.target.value);
    const handleChange = set(setCompanyName, "companyName");
    const handleMobile = set(setMobileNumber, "company_contact", clean.digits);
    const handleEmail = set(setEmail, "company_email");
    const handleCompanywebsite = set(setCompanywebsite, "company_website");
    const handleIndustry = set(setIndustry, "Industry");
    const handleLocation = set(setLocation, "Location", clean.name);
    const handlePassword = set(setPassword, "password");
    const handleConfirmpassword = set(setCpassword, "confirmpassword");
    const handleGst = (event) => setGst(event.target.value);
    
    const handleLinkedinlink = set(setLinkedinlink, "linkedinlink");
   
    const handleHeadFirstName = set(setHeadfirstname, "head_first_name", clean.name);
    const handleHeadLastName = set(setHeadlastname, "head_last_name", clean.name);
    const handleRepresentMail = set(setRepresentMail, "represent_mail");
    const handleRepresentNumber = set(setRepresentNumber, "represent_number", clean.digits);
    const handleDesignation = set(setDesignation, "designation", clean.name);
    const handleProfileImage = (event) => setProfileimage(event.target.value);
    const handlePan = (event) => setPan(event.target.value);
    const handleRegistration = (event) => setRegistration(event.target.value);
    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);
    
    const validateForm = () => {
      const e = {
        companyName: V.req(companyName, "Company name"),
        company_email: V.email(company_email, "Company email"),
        company_contact: V.mobile(company_contact, "Company contact"),
        company_website: V.url(company_website, "Company website"),
        Industry: V.req(Industry, "Industry"),
        Location: V.name(Location, "Location"),
        company_size: V.req(company_size, "Company size"),
        password: V.password(password),
        confirmpassword: !confirmpassword ? "Please confirm your password." : password !== confirmpassword ? "Passwords do not match." : undefined,
        linkedinlink: V.url(linkedinlink, "LinkedIn link"),
        head_first_name: V.name(head_first_name, "HR first name"),
        head_last_name: V.name(head_last_name, "HR last name"),
        represent_mail: V.email(represent_mail, "HR email"),
        represent_number: V.mobile(represent_number, "HR mobile number"),
        designation: V.name(designation, "Designation"),
        Pan: V.file(Pan, "PAN card"),
        Gst: V.file(Gst, "GST certificate"),
        company_logo: V.file(company_logo, "company logo"),
        registration: V.file(registration, "registration certificate"),
      };
      const newErrors = Object.fromEntries(Object.entries(e).filter(([, m]) => m));
      setErrors(newErrors); 
        return newErrors ;
    
    
      };
    //   const Register = () => {
        const handleSubmit = (event) => {
            event.preventDefault();
        if (Object.keys(validateForm()).length) return;
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
  

    return (
        <Dialog open={!!open} onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile}>
            <RegDialogTitle onClose={onClose}>Employer Registration</RegDialogTitle>

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
                    {/* Company */}
                    <Grid item xs={12} sm={6} md={4}>
                        <RegField label="Company Name" hint="Registered company name"
                            value={companyName} onChange={handleChange}
                            error={errors.companyName} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegField label="Company Email" type="email" hint="Official company email"
                            value={company_email} onChange={handleEmail}
                            error={errors.company_email} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegField label="Company Contact" hint="10-digit company phone number"
                            value={company_contact} onChange={handleMobile}
                            error={errors.company_contact} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegField label="Company Website" hint="e.g. www.yourcompany.com"
                            value={company_website} onChange={handleCompanywebsite}
                            error={errors.company_website} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegSelect label="Industry" hint="Industry your company works in"
                            value={Industry} onChange={handleIndustry}
                            error={errors.Industry}>
                            {industries.map((Industrie) => (
                                <MenuItem key={Industrie.name} value={Industrie.abbreviation}>
                                    {Industrie.name}
                                </MenuItem>
                            ))}
                        </RegSelect>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegField label="Location" hint="City where the company is based"
                            value={Location} onChange={handleLocation}
                            error={errors.Location} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegSelect label="Company Size" hint="Number of employees"
                            value={company_size} onChange={handleCompanysize}
                            error={errors.company_size}>
                            <MenuItem value="1-10">1-10</MenuItem>
                            <MenuItem value="11-50">11-50</MenuItem>
                            <MenuItem value="51-200">51-200</MenuItem>
                            <MenuItem value="200+">200+</MenuItem>
                        </RegSelect>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegField label="LinkedIn Link" hint="Company LinkedIn page URL"
                            value={linkedinlink} onChange={handleLinkedinlink}
                            error={errors.linkedinlink} />
                    </Grid>

                    {/* Account */}
                    <Grid item xs={12} sm={6} md={4}>
                        <RegPassword label="Password" hint="At least 6 characters"
                            value={password} onChange={handlePassword}
                            error={errors.password} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegPassword label="Confirm Password" hint="Re-enter the same password"
                            value={confirmpassword} onChange={handleConfirmpassword}
                            error={errors.confirmpassword} />
                    </Grid>

                    {/* HR contact */}
                    <Grid item xs={12} sm={6} md={4}>
                        <RegField label="HR First Name" hint="HR representative's first name"
                            value={head_first_name} onChange={handleHeadFirstName}
                            error={errors.head_first_name} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegField label="HR Last Name" hint="HR representative's last name"
                            value={head_last_name} onChange={handleHeadLastName}
                            error={errors.head_last_name} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegField label="HR Mail" type="email" hint="HR representative's email"
                            value={represent_mail} onChange={handleRepresentMail}
                            error={errors.represent_mail} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegField label="HR Number" hint="HR representative's 10-digit mobile"
                            value={represent_number} onChange={handleRepresentNumber}
                            error={errors.represent_number} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegField label="Designation" hint="HR representative's job title"
                            value={designation} onChange={handleDesignation}
                            error={errors.designation} />
                    </Grid>

                    {/* Documents */}
                    <Grid item xs={12} sm={6} md={4}>
                        <RegFile hint="Company Logo (JPG, PNG or GIF)"
                            onChange={handleCompanylogo} error={errors.company_logo} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegFile hint="GST Certificate"
                            onChange={(event) => setGst(event.target.files[0])} error={errors.Gst} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegFile hint="PAN Card"
                            onChange={(event) => setPan(event.target.files[0])} error={errors.Pan} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <RegFile hint="Registration Certificate"
                            onChange={(event) => setRegistration(event.target.files[0])} error={errors.registration} />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions className="reg-actions">
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Register</Button>
            </DialogActions>
        </Dialog>
    );
}
export default Employerregister;
