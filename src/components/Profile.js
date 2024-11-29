import React, { useState, useEffect, useRef } from 'react';
import './profile.css'; // Import the CSS file
import avatar from '../images/avatar.webp';
import Layout from './sidenav/Layout';
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
} from '@mui/material';
import axios from 'axios';
import { USER_PROFILE, PROFILE_UPDATE, PROFILE_UPDATE_IMAGE } from '../endpoints';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'transparent' },
    '&.Mui-focused fieldset': { borderColor: 'transparent' },
  },
};
const Profile = () => {
  const [userType, setUserType] = useState('');
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    skills: '',
    address: '',
    profile_image: '',
  });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [imageFile, setImageFile] = useState(null); // For handling image upload
  const accessToken = localStorage.getItem('access_token');
  const hasFetched = useRef(false);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
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
        console.error('Error fetching user profile:', error);
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
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    // setLoading(true);
    try {
      const response = await axios.patch(PROFILE_UPDATE, user, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      // setLoading(false);
      handleDialogClose();
    }
  };

  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    setLoading(true);
    try {
      const response = await axios.post(PROFILE_UPDATE_IMAGE, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const { profile_image_url } = response.data;

        // Update the user's profile image in the state
        setUser((prevUser) => ({
          ...prevUser,
          profile_image: profile_image_url,
        }));

        alert('Profile image updated successfully!');
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
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
    src={user.profile_image ? `${user.profile_image}?t=${new Date().getTime()}` : avatar}
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
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            {/* <label htmlFor="image-upload-input">
              <IconButton component="span" >
                <CameraAltIcon className='camera-icon'/>
              </IconButton>
            </label> */}
          </div>
          {userType === 'Employee' && (
            <>
              <h2 className="profile-name">{`${user.first_name} ${user.last_name}`}</h2>
              <div style={{display:'flex'}}>
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
                  <span className="info-value">{user.availability_of_work}</span>
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
                  <span className="info-value">{user.willing_to_relocate}</span>
                </div>
                </div>
                </div>
            </>
          )}
          
          {userType === 'Employer' && (
            <>
              <h2 className="profile-name">{user.company_name}</h2>
              <div style={{display:'flex'}}>
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
                    <a href={user.company_website} target="_blank" rel="noopener noreferrer">
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
                    <a href={user.linkedinlink} target="_blank" rel="noopener noreferrer">
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
          {imageFile && (
            <Button onClick={handleImageUpload} variant="contained" color="primary">
              Upload Image
            </Button>
          )}
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Update Profile</DialogTitle>
        {userType === 'Employee' && (
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
          </Grid>
        </DialogContent>
         )}

{userType === 'Employer' && (
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company Name"
                fullWidth
                value={user.company_name}
                name="company name"
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
                name="skills"
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
                name="company website"
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
