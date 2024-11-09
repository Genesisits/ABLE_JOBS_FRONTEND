import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import "./header.css";

import { Button } from '@mui/material';
import avatar from '../../images/avatar.webp';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef();

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const isEmployee = localStorage.getItem('is_employee') === 'true';
    const isEmployer = localStorage.getItem('is_employer') === 'true';

    if (isEmployee) {
      setUserRole('employee');
    } else if (isEmployer) {
      setUserRole('employer');
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

  // Check if the current page is the landing, home, login, or register page
  const isLandingOrRelevantPage = ['/', '/home', '/login', '/register'].includes(location.pathname);

  return (
    <div ref={menuRef}>
      <div className={`header-container ${menuOpen ? 'menu-open' : ''}`}>
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
          <ul className="navbar-menu">
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                <Button className="vender-button" variant="standard"><span>Home</span></Button>
              </Link>
            </li>

            {/* Profile link visible only to employees and employers, and not on landing/home/login/register pages */}
            {(userRole === 'employee' || userRole === 'employer') && !isLandingOrRelevantPage && (
              <li>
                <Link to="/profile" className="profile-container1">
                  <img className="profile-avatar1" src={avatar} alt="Profile" />
                  <p className="profile-name1">Profile</p>
                </Link>
              </li>
            )}

            {/* Show Login and Register buttons if on landing/home/login/register pages or if the user is not an employee/employer */}
            {(isLandingOrRelevantPage || !userRole) && (
              <>
                <li>
                  <div className="vendor_login_button">
                    <Link to="/login">
                      <Button className="vender-button" variant="outlined"><span>Login</span></Button>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="vendor_login_button">
                    <Link to="/register">
                      <Button className="vender-button" variant="outlined"><span>Register</span></Button>
                    </Link>
                  </div>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      {menuOpen && <div className={`background-overlay ${menuOpen ? 'visible' : ''}`} onClick={() => setMenuOpen(false)}></div>}
    </div>
  );
}
