import React,{useEffect} from "react";
import logo from '../../images/vajraksh_logo2.jpg';
import logo2 from '../../images/foot_lk_icon.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faMap,faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import "./footer.css";
import { Link } from "react-router-dom";
import fblogo from '../../images/fbicon.png';
import insta from '../../images/instalogo.png';
import link from '../../images/linklogo.png';
import twitter from '../../images/twtter_logo.jfif';
import phone from '../../images/phone1.png';
import map from '../../images/map.png';
import mail from '../../images/email.png';

library.add(faMap, faPhone, faEnvelope);

export default function Footer() {
  useEffect(() => {
    // Apply overflow: hidden to prevent horizontal overflow
    document.documentElement.style.overflowX = 'hidden';
  }, []);
  return (
   <div id="footer">
    <div className="tatal_footer_section">
      <div className="footer_section">
      <div className="footer_container">
        <div className="f-row footer_section_row">
          <div className="row-1 row-2 row-3">
          <div className="v-logo">
            <Link to='/'>
          <img src={logo} className="footer-logo" alt="logo_img" />
          </Link>
          <p className="footer-p">We excel in all types of events. Our team is the driving force behind successful events and plays a critical role in ensuring that they are executed to the highest standards.</p>
          </div>
          </div>
          <div className="row-1 row-2 row-3">
            <div className="footer-links1">
              <h3>Useful links</h3>
              <ul>
                <li><img src={logo2} alt="logo_img1" /><Link to='/' className="no-underline">Home</Link></li>
                <li><img src={logo2} alt="logo_img1" /><Link to='/about' className="no-underline">About Us</Link></li>
                <li><img src={logo2} alt="logo_img1" /><Link to='/services' className="no-underline">Services </Link></li>
                <li><img src={logo2} alt="logo_img1" /><Link to='/gallery' className="no-underline">Gallery </Link> </li>
                <li><img src={logo2} alt="logo_img1" /><Link to='/blog' className="no-underline">Blog </Link> </li>
                <li><img src={logo2} alt="logo_img1" /><Link to='/careers' className="no-underline">Careers </Link></li>
                <li><img src={logo2} alt="logo_img1" /><Link to='/contact' className="no-underline">Contact </Link></li>
              </ul>
            </div>
          </div>
          <div className="row-1 row-2 row-3">
          <div className="footer-links">
              <h3>SERVICES</h3>
              <ul>
                <li><img src={logo2} alt="logo_img1" /> <Link to='/wedding' className="no-underline" >Wedding & Receptions </Link></li>
                <li><img src={logo2} alt="logo_img1" /><Link to='/corporateevents' className="no-underline">Corporate Events</Link></li>
                <li><img src={logo2} alt="logo_img1" /><Link to='/miceevents' className="no-underline">MICE Events</Link></li>
                <li><img src={logo2} alt="logo_img1" /><Link to='/movieevents' className="no-underline">Publicity & Promotions</Link></li>
                <li><img src={logo2} alt="logo_img1" /><Link to='/birthdayevents' className="no-underline">Birthday Parties</Link></li>
                {/* <li><img src={logo2} alt="logo_img1" /><Link to='/sportsevents' className="no-underline">Sports Events</Link></li> */}
                <li><img src={logo2} alt="logo_img1" /><Link to='/sportsevents' className="no-underline">Sports Events</Link></li>
              </ul>
              </div>
            </div>
            <div className="row-1 row-2 row-3">
          <div className="footer-links2">
            <ul>
               <li><img src={logo2} alt="logo_img1" /><Link to='/mediaevents' className="no-underline">Media Planners</Link></li>
                <li><img src={logo2} alt="logo_img1" /><Link to='/celebrityevents' className="no-underline">Celebrity Management</Link></li>
                <li><img src={logo2} alt="logo_img1" /><Link to='/occasionalevents' className="no-underline">Occasional Events</Link></li>
                <li><img src={logo2} alt="logo_img1" /><Link to='/entertainmentevents' className="no-underline"> Entertainment</Link></li>
                <li><img src={logo2} alt="logo_img1" /><Link to='/sfxevents' className="no-underline">SFX Products</Link></li>
                </ul>
                <div>
                <div className="footer_social_icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <img src={fblogo} className="footer_social_icons" alt=''/>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <img src={insta} className="footer_social_icons" alt=''/>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <img src={link} className="footer_social_icons" alt=''/>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <img src={twitter} className="footer_social_icons" alt=''/></a>
                </div>
                </div>
            </div>
          </div>
        </div>
        <div className="f-row footer_section_row">
        <div className="foot_line"></div>
        </div>
        <div className="f-row1">
        <div className="f-row footer_section_row">
        <div className="row-4">
        <div className="contact-details1">
          <h5>
          <img src={phone} className="footer-phone-icon" alt=''/>
         <p>+91-9248755551</p>
          </h5>
        </div>
        </div>
        <div className="row-4">
        <div className="contact-details">
          <h5>
          <img src={mail} className="footer-email-icon" alt=''/>
  
  <p>info@vajrakshevents.com</p>
          </h5>
        </div>
        </div>
        <div className="row-4">
        <div className="contact-details2">
          <h5>
          <img src={map} className="footer-map-icon" alt=''/>
   
   <p style={{whiteSpace:'nowrap'}}>Vajraksh ,Hyderabad, Telangana<br/>
    </p>
          </h5>
        </div>
        </div>
        </div>
        </div>
        <div className="f-row footer_section_row">
        <div className="foot_line2"></div>
        <div className="footer_right">
          <div className="footerbottom1">
          <h5>© 2023 Vajraksh Events All Rights Reserved.</h5>
          </div>
            </div>
        </div>
       
        </div>
      </div>
      </div>
      </div>
  );
}
