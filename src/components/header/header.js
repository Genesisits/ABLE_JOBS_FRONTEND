import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import "./header.css"; // Make sure the path to your CSS file is correct
// Importing images
import logo from '../../images/vajraksh_logo2.jpg'; // Ensure the path is correct
import nav1 from '../../images/nav1.png';
import nav2 from '../../images/nav2.png';
import nav3 from '../../images/nav3.png';
import nav4 from '../../images/nav4.png';
import nav5 from '../../images/nav5.png';
import nav6 from '../../images/nav6.png';
import nav7 from '../../images/nav7.png';
import nav8 from '../../images/nav8.png';
import { Button } from '@mui/material';
import avatar from '../../images/avatar.webp';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(""); 
  const location = useLocation();
  const menuRef = useRef();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const user = {
    name: 'Murali Kukka',
    // bio: 'Full stack developer based in San Francisco. Passionate about coding, open-source, and technology.',
    email: 'murali@genesisits.com',
    location: 'San Francisco, CA',
    profilePicture: avatar,
    skills: 'JavaScript, React, Vue.Js',
    experience: '5 Years in Software Development'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [location]);

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
            {/* Links will be here */}
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              <Button className="vender-button" variant="standard"><span>Home</span></Button>
              </Link>
            </li>
            <li>
              <div className="vendor_login_button">
                <a href="/login">
                  <Button className="vender-button" variant="outlined"><span>Login</span></Button>
                </a>
              </div>
            </li>
            <li>
              <div className="vendor_login_button">
                <a href="/register">
                  <Button className="vender-button" variant="outlined"><span>Register</span></Button>
                </a>
              </div>
            </li>
            <li>
            <Link to="/profile"  className="profile-container1">
    <img className="profile-avatar1" src={user.profilePicture} alt="Profile" />
    <p className="profile-name1">Profile</p>
    </Link>
            </li>
            {/* Scrolling images when the menu is open */}
            {menuOpen && (
              <div className="nav_scroll_pngs">
                <div className="footer-marquee">
                  <img src={nav1} alt="nav1" />
                  <img src={nav2} alt="nav2" />
                  <img src={nav3} alt="nav3" />
                  <img src={nav7} alt="nav4" />
                  <img src={nav4} alt="nav5" />
                  <img src={nav8} alt="nav6" />
                  <img src={nav5} alt="nav7" />
                  <img src={nav6} alt="nav8" />
                </div>
              </div>
            )}
          </ul>
        </nav>
      </div>
      {/* Background element to close the menu on click */}
      {menuOpen && <div className={`background-overlay ${menuOpen ? 'visible' : ''}`} onClick={() => setMenuOpen(false)}></div>}
    </div>
  );
}
