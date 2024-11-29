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
    setLoading(true);
    try {
      const response = await axios.patch(PROFILE_UPDATE, user, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
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
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const { PROFILE_UPDATE } = response.data;
        setUser((prevUser) => ({
          ...prevUser,
          profile_image: PROFILE_UPDATE,
        }));
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
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
          <img
            className="profile-image"
            src={user.profile_image ? `${user.profile_image}?t=${new Date().getTime()}` : avatar}
            alt="Profile"
          />
          <div className="image-upload">
            <input
              accept="image/*"
              type="file"
              id="image-upload-input"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload-input">
              <IconButton component="span">
                <CameraAltIcon />
              </IconButton>
            </label>
          </div>
          <h2 className="profile-name">{`${user.first_name} ${user.last_name}`}</h2>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Mobile Number:</span>
              <span className="info-value">{user.mobile_number}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Skills:</span>
              <span className="info-value">{user.skills}</span>
            </div>
          </div>
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
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                value={user.first_name}
                name="first_name"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                value={user.last_name}
                name="last_name"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mobile Number"
                fullWidth
                value={user.mobile_number}
                name="mobile_number"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Skills"
                fullWidth
                value={user.skills}
                name="skills"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                fullWidth
                value={user.address}
                name="address"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSaveChanges} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Profile;
