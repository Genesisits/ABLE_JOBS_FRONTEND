import React, { useState, useEffect ,useRef} from 'react';
import './profile.css'; // Import the CSS file
import avatar from '../images/avatar.webp';
import Layout from './sidenav/Layout';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { USER_PROFILE, PROFILE_UPDATE } from '../endpoints';

const Profile = () => {
  const [userType, setUserType] = useState('');
  const [first_name, setUserfname] = useState('')
  const [last_name, setUserlname] = useState('')
  const [mobile_number, setMobilenumber] = useState('')
  const [user, setUser] = useState({
  // first_name: '',
  last_name: '',
  mobile_number: '',
  skills: '',
  address: '',
});
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const accessToken = localStorage.getItem('access_token');
  const hasFetched = useRef(false);
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        hasFetched.current = true;
        const response = await axios.get(USER_PROFILE, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setUserType(response.data.user_type);
        setUser(response.data.user_profile);

       
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
    console.log(`Field: ${name}, Value: ${value}`);
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };
 
  const handleSaveChanges = async () => {
    setLoading(true); // Start the loading indicator
    try {
      // Send the updated user data to the API
      const response = await axios.patch(
        PROFILE_UPDATE, // API endpoint for updating the profile
        user, // The updated user object
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the token in the headers
            'Content-Type': 'application/json', // Specify the content type
          },
        }
      );
  
      // Check the response and update the state if necessary
      if (response.status === 200 ) {
        console.log('Profile updated successfully:', response.data);
        setUser(response.data); // Update the user state with the new data
      } else {
        console.error('Failed to update profile:', response.status);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false); // Stop the loading indicator
      handleDialogClose(); // Close the dialog
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
        {/* <DialogContent> */}
        {/* <Grid container spacing={2}> */}
    {userType === 'Employee' && (
      <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            name="first name"
            value={user.first_name}
            onChange={(e) => setUserfname(e.target.value)}
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
            label="Last Name"
            variant="outlined"
            fullWidth
            name="last name"
            value={user.last_name}
            onChange={(e) => setUserlname(e.target.value)}
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
            name="mobile number"
            value={user.mobile_number}
            onChange={(e) => setMobilenumber(e.target.value)}
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
            value={user.skills || ''}
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
            label="Address"
            variant="outlined"
            fullWidth
            name="address"
            value={user.address || ''}
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
    )}

    {userType === 'Employer' && (
      
      <DialogContent>
       <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            name="company_name"
            value={user.company_name || ''}
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
            label="Contact"
            variant="outlined"
            fullWidth
            name="company_contact"
            value={user.company_contact || ''}
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
            label="Industry"
            variant="outlined"
            fullWidth
            name="industry"
            value={user.industry || ''}
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
            value={user.location || ''}
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
            label="Website"
            variant="outlined"
            fullWidth
            name="company_website"
            value={user.company_website || ''}
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
    )}
  {/* </Grid> */}

  
        {/* </DialogContent> */}
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
