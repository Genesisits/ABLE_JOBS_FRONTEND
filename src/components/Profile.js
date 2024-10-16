import React from 'react';
import './profile.css'; // Import the CSS file
import avatar from '../images/avatar.webp'
import Layout from './sidenav/Layout';

const Profile = () => {
  // Sample user data, in real scenario this could be fetched from an API
  const user = {
    name: 'Murali Kukka',
    // bio: 'Full stack developer based in San Francisco. Passionate about coding, open-source, and technology.',
    email: 'murali@genesisits.com',
    location: 'San Francisco, CA',
    profilePicture: avatar,
    skills: 'JavaScript, React, Vue.Js',
    experience: '5 Years in Software Development'
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
        <button className="edit-button">Update Profile</button>
      </div>
    </div>
    </Layout>
  );
};

export default Profile;
