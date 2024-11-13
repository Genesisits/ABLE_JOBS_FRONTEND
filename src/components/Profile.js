import React, { useState, useEffect } from 'react';
import './profile.css'; // Import the CSS file
import avatar from '../images/avatar.webp';
import Layout from './sidenav/Layout';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { USER_PROFILE ,PROFILE_UPDATE } from '../endpoints';

const Profile = () => {
  const [userType, setUserType] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(USER_PROFILE, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setUserType(response.data.user_type);
        setUser({
          ...response.data.user_profile,
          name: response.data.user_profile.first_name || '', // Default to empty if not present
          email: response.data.user_profile.email || '',
          skills: response.data.user_profile.skills || '',
          experience: response.data.user_profile.experience || '',
          location: response.data.user_profile.location || '',
        });

       
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [accessToken]);

  
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  // Function to handle saving the changes (optional)
  const handleSaveChanges = async () => {
    setLoading(true); // Show loading while updating
    try {
      // Make the PATCH API call to update the profile
      const response = await axios.patch(
        PROFILE_UPDATE,
        user, // Pass the updated user data
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Handle successful response
      console.log('Profile updated successfully:', response.data);
      setUser(response.data.user_profile); // Update local state with new data
      handleDialogClose(); // Close the dialog
    } catch (error) {
      console.error('Error updating profile:', error.response || error.message);
    } finally {
      setLoading(false); // Hide loading
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
        <img
  className="profile-image"
  src={
    user.company_logo1
      ? user.company_logo1.startsWith('http')
        ? user.company_logo1
        : `http://3.86.53.72:8000/${user.company_logo1}`
      : avatar
  }
  alt="Profile"
/>

          {userType === 'Employee' && (
            <>
              <h2 className="profile-name">{`${user.first_name} ${user.last_name}`}</h2>
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
            </>
          )}
          
          {userType === 'Employer' && (
            <>
              <h2 className="profile-name">{user.company_name}</h2>
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
            </>
          )}
          <button className="edit-button" onClick={handleDialogOpen}>
            View Profile
          </button>
        </div>
      </div>


      {/* Dialog for updating profile */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                name="first_name"
                value={user.first_name || ''}
                onChange={handleInputChange}
                margin="normal"
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mobile Number"
                variant="outlined"
                fullWidth
                name="mobile_number"
                value={user.mobile_number || ''}
                onChange={handleInputChange}
                margin="normal"
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Skills"
                variant="outlined"
                fullWidth
                name="skills"
                value={user.country}
                onChange={handleInputChange}
                margin="normal"
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Experience"
                variant="outlined"
                fullWidth
                name="experience"
                value={user.state}
                onChange={handleInputChange}
                margin="normal"
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                name="location"
                value={user.skills}
                onChange={handleInputChange}
                margin="normal"
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};


export default Profile;
