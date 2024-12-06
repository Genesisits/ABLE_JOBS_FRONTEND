import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button } from '@mui/material';
import UploadResume from '../Employee/uploadresume'; // Import the dialog component
import "./header.css";
import avatar from '../../images/avatar.webp';
import able2 from '../../images/able_job2.JPG';


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef();

  const [userRole, setUserRole] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false); // State for controlling dialog visibility

  useEffect(() => {
    const isEmployee = localStorage.getItem('is_employee') === 'true';
    const isEmployer = localStorage.getItem('is_employer') === 'true';
    const isAdmin = localStorage.getItem('Admin') === 'true';


    if (isEmployee) {
      setUserRole('employee');
    } else if (isEmployer) {
      setUserRole('employer');
    }else if (isAdmin) {
      setUserRole('Admin');
    } else {
      setUserRole(null);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [location]);

  const isLandingOrRelevantPage = ['/', '/home', '/login', '/register', '/employeeregister', '/trainer', '/volunteer', '/forgetpassword','/email','/resetpassword'];

  const openUploadDialog = () => setUploadDialogOpen(true);
  const closeUploadDialog = () => setUploadDialogOpen(false);

  return (
    <div ref={menuRef}>
      <div className={`header-container ${menuOpen ? 'menu-open' : ''}`}>
        {/* Logo on the left */}
       
        <div className="toggle-button-container">
          <button className={`toggle-button ${menuOpen ? 'close' : ''}`} onClick={toggleMenu}>
            {menuOpen ? <span>&times;</span> : <>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
              <span>MENU</span>
            </>}
          </button>
        </div>
        <nav className={`navbar ${menuOpen ? 'visible' : ''}`}>
        <div className="logo-container">
          <Link to="/">   
            <img src={able2} alt="Able Jobs Logo" className="header-logo" />
          </Link>
        </div>
          <ul className="navbar-menu">
    {userRole === 'admin' ? (
      <li>
        <Link to="/">
          <Button className="vender-button" variant="standard">
            <span>Home</span>
          </Button>
        </Link>
      </li>
    ) : (
      <>
        {/* Show Home for other roles */}
        <li>
          <Link to="/">
            <Button className="vender-button" variant="standard">
              <span>Home</span>
            </Button>
          </Link>
        </li>
  
        {/* Upload button visible only to employees */}
        {userRole === 'employee' && !isLandingOrRelevantPage.includes(location.pathname) && (
          <li>
            <Button style={{ color: 'white', marginTop: '-4%' }} onClick={openUploadDialog}>
              Upload
            </Button>
          </li>
        )}
  
        {/* Profile link visible only to employees and employers */}
        {(userRole === 'employee' || userRole === 'employer') && 
         !isLandingOrRelevantPage.includes(location.pathname) && (
          <li>
            <Link to="/profile" className="profile-container1">
              <img className="profile-avatar1" src={avatar} alt="Profile" />
              <p className="profile-name1">Profile</p>
            </Link>
          </li>
        )}
  
        {/* Login and Register buttons for unauthenticated users */}
        {isLandingOrRelevantPage.includes(location.pathname) && !userRole && (
          <>
            <li>
              <div className="vendor_login_button">
                <Link to="/login">
                  <Button className="vender-button" variant="outlined">
                    <span>Login</span>
                  </Button>
                </Link>
              </div>
            </li>
            <li>
              <div className="vendor_login_button">
                <Link to="/register">
                  <Button className="vender-button" variant="outlined">
                    <span>Register</span>
                  </Button>
                </Link>
              </div>
            </li>
          </>
        )}
      </>
    )}
  </ul>
        </nav>
      </div>
      <UploadResume open={uploadDialogOpen} onClose={closeUploadDialog} />
      {menuOpen && <div className={`background-overlay ${menuOpen ? 'visible' : ''}`} onClick={() => setMenuOpen(false)}></div>}
    </div>
  );
}
