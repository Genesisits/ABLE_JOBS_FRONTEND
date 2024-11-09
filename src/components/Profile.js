import React, { useState } from 'react';
import './profile.css'; // Import the CSS file
import avatar from '../images/avatar.webp';
import Layout from './sidenav/Layout';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid } from '@mui/material';

const Profile = () => {
  // Sample user data, in a real scenario, this could be fetched from an API
  const initialUserData = {
    name: 'Murali Kukka',
    email: 'murali@genesisits.com',
    location: 'San Francisco, CA',
    profilePicture: avatar,
    skills: 'JavaScript, React, Vue.Js',
    experience: '5 Years in Software Development'
  };

  // State to control the dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(initialUserData);

  // Function to handle opening the dialog
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  // Function to handle closing the dialog
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
  const handleSaveChanges = () => {
    // You can add logic to save the updated profile (e.g., making an API call)
    console.log('Profile updated:', user);
    handleDialogClose(); // Close the dialog after saving
  };

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-card">
          <img className="profile-image" src={user.profilePicture} alt="Profile" />
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-bio">{user.bio}</p>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Skills:</span>
              <span className="info-value">{user.skills}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Experience:</span>
              <span className="info-value">{user.experience}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Location:</span>
              <span className="info-value">{user.location}</span>
            </div>
          </div>
          <button className="edit-button" onClick={handleDialogOpen}>
            Update Profile
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
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={user.name}
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
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={user.email}
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Experience"
                variant="outlined"
                fullWidth
                name="experience"
                value={user.experience}
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
                value={user.location}
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
