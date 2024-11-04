import React, { useState } from 'react';
import './employerregister.css';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { EMPLOYER_REGISTER } from '../endpoints';

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
    // const [fblinks, setFblinks] = useState("");
    // const [instalinks, setInstalinks] = useState("");
    const [linkedinlink, setLinkedinlink] = useState("");
    // const [xlink, setXlink] = useState("");
    const [head_first_name, setHeadfirstname] = useState("");
    const [head_last_name, setHeadlastname] = useState("");
    const [represent_mail, setRepresentMail] = useState("");
    const [represent_number, setRepresentNumber] = useState("");
    const [Pan, setPan] = useState(null);
    const [registration, setRegistration] = useState(null);
    const [designation, setDesignation] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const handleCompanysize = (event) => setCompanysize(event.target.value);
    const handleCompanylogo = (event) => setCompanylogo(event.target.value);
    const handleChange = (event) => setCompanyName(event.target.value);
    const handleMobile = (event) => setMobileNumber(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handleCompanywebsite = (event) => setCompanywebsite(event.target.value);
    const handleIndustry = (event) => setIndustry(event.target.value);
    const handleLocation = (event) => setLocation(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    const handleConfirmpassword = (event) => setCpassword(event.target.value);
    const handleGst = (event) => setGst(event.target.value);
    // const handleFblink = (event) => setFblinks(event.target.value);
    // const handleInstalink = (event) => setInstalinks(event.target.value);
    const handleLinkedinlink = (event) => setLinkedinlink(event.target.value);
    // const handleXlink = (event) => setXlink(event.target.value);
    const handleHeadFirstName = (event) => setHeadfirstname(event.target.value);
    const handleHeadLastName = (event) => setHeadlastname(event.target.value);
    const handleRepresentMail = (event) => setRepresentMail(event.target.value);
    const handleRepresentNumber = (event) => setRepresentNumber(event.target.value);
    const handleDesignation = (event) => setDesignation(event.target.value);
    const handlePan = (event) => setPan(event.target.value);
    const handleRegistration = (event) => setRegistration(event.target.value);
    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    const Register = () => {
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
            // "fblink": fblinks,
            // "instalink": instalinks,
            "linkedinlink": linkedinlink,
            // "xlink": xlink,
            "head_first_name": head_first_name,
            "head_last_name": head_last_name,
            "head_email": represent_mail,
            "head_contact": represent_number,
            "head_designation": designation,
            "pan": Pan,
            "registration_certificate": registration,
        };
        console.log(payload);

        axios.post(`${EMPLOYER_REGISTER}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            // Handle success
            console.log(response.data);
            onClose();
        })
        .catch(error => {
            // Handle error
            console.error(error);
        });
    };

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <div>
               

            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Employer Registration</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} rowSpacing={0}> {/* Grid container for 3 inputs in a row */}
                            <Grid item xs={4}>
                                <TextField
                                    label="Company Name"
                                    value={companyName}
                                    onChange={handleChange}
                                    fullWidth
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
                                    select
                                    margin="dense"
                                    className="custom-input1"

                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: '43px',
                                            marginTop: '12px',
                                            // Control the height here
                                            '& .MuiSelect-select': {
                                                padding: '10px', // Adjust padding to reduce the height
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
                                    <MenuItem value="1-10">1-10</MenuItem>
                                    <MenuItem value="11-50">11-50</MenuItem>
                                    <MenuItem value="51-200">51-200</MenuItem>
                                    <MenuItem value="200+">200+</MenuItem>
                                </TextField>

                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Location"
                                    value={Location}
                                    onChange={handleLocation}
                                    fullWidth
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
                                    margin="dense"
                                    className="custom-input1"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: '43px',
                                            marginTop: '12px',
                                            // Control the height here
                                            '& .MuiSelect-select': {
                                                padding: '10px', // Adjust padding to reduce the height
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
                                    onChange={handlePassword}
                                    type="password"
                                    fullWidth
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
                                    label="Confirm Password"
                                    value={confirmpassword}
                                    onChange={handleConfirmpassword}
                                    type="password"
                                    fullWidth
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
                                    label="Linkedin Links"
                                    value={linkedinlink}
                                    onChange={handleLinkedinlink}
                                    fullWidth
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
                                    // label="Company Logo"
                                    onChange={(event) => setCompanylogo(event.target.files[0])}
                                    fullWidth
                                    type="file"
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
                                <label>GST</label>
                                <TextField
                                    type="file"
                                    onChange={(event) => setGst(event.target.files[0])}
                                    fullWidth
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
                        <Button onClick={Register} color="primary">Register</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </ThemeProvider>
    );
}

export default Employerregister;
