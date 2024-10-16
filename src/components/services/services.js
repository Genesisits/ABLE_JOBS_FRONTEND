import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './services.css';


const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = React.useCallback((path) => {
    navigate(path);
  }, [navigate]);

  const navigateToDefaultPage = React.useCallback(() => {
    if (location.pathname === '/services') {
      handleNavigation('/wedding');
    }
  }, [location.pathname, handleNavigation]);

  // Call the function when the component mounts
  React.useEffect(() => {
    navigateToDefaultPage();
  }, [navigateToDefaultPage]);

  function Nav() {
    return (
      
      <div className='inner_wedding_right'>
      <h5>Services List</h5>
          <ul>
            <li onClick={() => handleNavigation('/wedding')}>
              Wedding & Receptions
            </li>
            <li onClick={() => handleNavigation('/corporateevents')}>
              Corporate Events
            </li>
            <li  onClick={() => handleNavigation('/miceevents')}>MICE Events</li>
        <li  onClick={() => handleNavigation('/movieevents')}>Movie Publicity & Promotions</li>
        <li onClick={() => handleNavigation('/birthdayevents')}>Birthday parties</li>
        <li onClick={() => handleNavigation('/sportsevents')}>Sports Events</li>
        <li onClick={() => handleNavigation('/mediaevents')}>Media Planners</li>
        <li onClick={() => handleNavigation('/celebrityevents')}>Celebrity Management</li>
        <li onClick={() => handleNavigation('/occasionalevents')}>Occasional Events</li>
        <li onClick={() => handleNavigation('/entertainmentevents')}>Entertainment</li>
        <li onClick={() => handleNavigation('/sfxevents')}>SFX Products</li>
          </ul>
      </div>
    );
  }

  return (
    <div>
      <Nav />
    </div>
    
  );
};

export default Services;
