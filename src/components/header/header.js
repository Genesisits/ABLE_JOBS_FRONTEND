import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { USER_PROFILE } from '../../endpoints';
import UploadResume from '../Employee/uploadresume';

import './header.css';

import avatar from '../../images/avatar.webp';
import ableLogo from '../../images/able-hub-logo.png';

import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import UploadIcon from '@mui/icons-material/Upload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PhoneIcon from '@mui/icons-material/Phone';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {

  const location = useLocation();
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [profile, setProfile] = useState({ name: '', image: '' });

  // USER ROLE

  useEffect(() => {

    const isEmployee = localStorage.getItem('is_employee') === 'true';
    const isEmployer = localStorage.getItem('is_employer') === 'true';
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    const isTrainer = localStorage.getItem('is_trainer') === 'true';

    setIsLoggedIn(
      !!localStorage.getItem('access_token') ||
      isAdmin || isEmployee || isEmployer || isTrainer
    );

    if (isAdmin) {
      setUserRole('admin');
    } else if (isEmployee) {
      setUserRole('employee');
    } else if (isEmployer) {
      setUserRole('employer');
    } else if (isTrainer) {
      setUserRole('trainer');
    } else {
      setUserRole(null);
    }

  // re-check on every navigation so Sign In -> Sign Out switches right after login
  }, [location.pathname]);

  // PROFILE PHOTO + NAME (refreshed on navigation so a new photo shows up)

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) { setProfile({ name: '', image: '' }); return; }
    let cancelled = false;
    axios
      .get(USER_PROFILE, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        const p = data.user_profile || {};
        const full = (a, b) => [a, b].filter(Boolean).join(' ').trim();
        if (!cancelled) {
          setProfile({
            name: full(p.first_name, p.last_name) || full(p.head_first_name, p.head_last_name) || p.company_name || '',
            image: p.profile_image || '',
          });
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [location.pathname]);

  // POPPINS FONT

  useEffect(() => {

    const id = 'able-poppins-font';

    if (document.getElementById(id)) return;

    const link = document.createElement('link');

    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';

    document.head.appendChild(link);

  }, []);

  // STICKY NAVBAR

  useEffect(() => {

    const handleScroll = () => {
      setStuck(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  // CLOSE MOBILE MENU WHEN ROUTE CHANGES

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // ROUTES

  const isLandingOrRelevantPage = [
    '/',
    '/home',
    '/alljobs',
    '/login',
    '/register',
    '/employeeregister',
    '/trainer',
    '/volunteer',
    '/forgetpassword',
    '/email',
    '/resetpassword',
    '/contact',
    '/blog',
    '/about'
  ];

  const isLandingProfile = [
    '/',
    '/alljobs',
    '/jobs',
    '/shortlisted',
    '/findajob',
    '/applied',
    '/shortlist',
    '/onboard'
  ];

  const showAuthLinks =
    isLandingOrRelevantPage.includes(location.pathname) &&
    !userRole &&
    !isLoggedIn;

  const dashboardPath = {
    admin: '/dashboard',
    employer: '/jobs',
    employee: '/findajob',
    trainer: '/trainerdashboard',
  }[userRole];

  // SIGN OUT

  const handleSignOut = () => {
    [
      'access_token',
      'refresh_token',
      'is_employee',
      'is_employer',
      'is_admin',
      'is_trainer'
    ].forEach((k) => localStorage.removeItem(k));

    setIsLoggedIn(false);
    setUserRole(null);
    setIsMenuOpen(false);
    navigate('/');
    window.location.reload();
  };

  // MENU FUNCTIONS

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // UPLOAD FUNCTIONS

  const openUploadDialog = () => {
    setUploadDialogOpen(true);
    closeMenu();
  };

  const closeUploadDialog = () => {
    setUploadDialogOpen(false);
  };

  // NAV LINK CLASS

  const navClass = (path) => {
    return `nav-link ${location.pathname === path ? 'active' : ''}`;
  };

  return (

    <div className="site-header">

      {/* TOP BAR */}

      <div className="topbar">

        <div className="topbar-left">

          <AccessibilityNewIcon className="topbar-access" />

          <span>Equal Opportunity</span>

          <span className="topbar-dot" />

          <span>Inclusive Workplace</span>

          <span className="topbar-dot" />

          <span>A Skilled India</span>

        </div>

        <div className="topbar-right">

          <span className="topbar-item">
            <PhoneIcon fontSize="small" />
            Helpline: +91 9885881244
          </span>

          <Link
            to="/contact"
            className="topbar-item"
          >
            <HeadsetMicIcon fontSize="small" />
            Support
          </Link>

          {showAuthLinks && (
            <Link
              to="/register"
              className="topbar-item"
            >
              <AccountCircleIcon fontSize="small" />
              Register
            </Link>
          )}

        </div>

      </div>

      {/* MAIN HEADER */}

      <div className="header-container">

        <div className={`navbar-wrap ${stuck ? 'stuck' : ''}`}>

          <nav className="navbar">

            {/* LOGO */}

            <div className="logo-container">

              <Link to="/" onClick={closeMenu}>
                <img
                  src={ableLogo}
                  alt="Able Jobs Hub - Breaking Barriers"
                  className="header-logo"
                />
              </Link>

            </div>

            {/* MOBILE MENU */}

            <button
              type="button"
              className="menu-toggle"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="main-navigation"
            >
              <span className="menu-icon">
                {isMenuOpen ? '✕' : '☰'}
              </span>
            </button>

            {/* NAVIGATION LINKS */}

            <ul
              id="main-navigation"
              className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}
            >

              {/* HOME */}

              <li>
                <Link
                  to="/"
                  className={`${navClass('/')} nav-home`}
                  onClick={closeMenu}
                >
                  <HomeIcon />
                  Home
                </Link>
              </li>

              {/* ADMIN ONLY SEES HOME */}

              {userRole !== 'admin' && (
                <>

                  <li>
                    <Link
                      to="/about"
                      className={navClass('/about')}
                      onClick={closeMenu}
                    >
                      <InfoIcon />
                      About Us
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/blog"
                      className={navClass('/blog')}
                      onClick={closeMenu}
                    >
                      <ArticleIcon />
                      Blog
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/contact"
                      className={navClass('/contact')}
                      onClick={closeMenu}
                    >
                      <ContactMailIcon />
                      Contact Us
                    </Link>
                  </li>

                  {/* EMPLOYEE UPLOAD */}

                  {userRole === 'employee' &&
                    !isLandingOrRelevantPage.includes(location.pathname) && (
                      <li>
                        <a
                          href="#upload"
                          className="nav-link nav-upload"
                          onClick={(e) => {
                            e.preventDefault();
                            openUploadDialog();
                          }}
                        >
                          <UploadIcon />
                          Upload
                        </a>
                      </li>
                    )}

                  {/* MOBILE SIGN OUT */}

                  {isLoggedIn && dashboardPath && (
                    <li className="nav-login-mobile">
                      <Link to={dashboardPath} className={navClass(dashboardPath)} onClick={closeMenu}>
                        <DashboardIcon />
                        Dashboard
                      </Link>
                    </li>
                  )}

                  {isLoggedIn && (
                    <li className="nav-login-mobile">
                      <button
                        type="button"
                        className="nav-link nav-signout-mobile"
                        onClick={handleSignOut}
                      >
                        <LogoutIcon />
                        Sign Out
                      </button>
                    </li>
                  )}

                  {/* MOBILE LOGIN */}

                  {showAuthLinks && (
                    <li className="nav-login-mobile">
                      <Link
                        to="/login"
                        className={navClass('/login')}
                        onClick={closeMenu}
                      >
                        <AccountCircleIcon />
                        Sign In / Sign Up
                      </Link>
                    </li>
                  )}

                </>
              )}

            </ul>

            {/* SIGN IN / SIGN OUT */}

            {isLoggedIn ? (
              <div className="header-user">
                <Link to={userRole === 'admin' ? '/dashboard' : '/profile'} className="header-chip" title="My profile">
                  <img
                    src={profile.image ? `${profile.image}${profile.image.includes('?') ? '&' : '?'}v=${location.key || ''}` : avatar}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = avatar; }}
                    alt=""
                    className="header-chip-img"
                  />
                  <span className="header-chip-name">{profile.name || 'Profile'}</span>
                </Link>

                {dashboardPath && (
                  <Link to={dashboardPath} className="header-dash-btn">
                    <DashboardIcon fontSize="small" />
                    <span>Dashboard</span>
                  </Link>
                )}

                <button type="button" className="post-job-btn" onClick={handleSignOut}>
                  <LogoutIcon fontSize="small" />
                  <span className="so-text">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="post-job-btn" onClick={closeMenu}>
                <LoginIcon fontSize="small" />
                Sign In
              </Link>
            )}

          </nav>

        </div>

      </div>

      {/* RESUME UPLOAD DIALOG */}

      <UploadResume
        open={uploadDialogOpen}
        onClose={closeUploadDialog}
      />

    </div>

  );

}