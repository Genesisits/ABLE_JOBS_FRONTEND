import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import AccessibleIcon from "@mui/icons-material/Accessible";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ableLogo from "../../images/able-hub-logo.png";
import "./footer.css";

const COLUMNS = [
  {
    title: "For Job Seekers",
    links: [
      ["Find Jobs", "/alljobs"],
      ["Create Account", "/register"],
      ["My Applications", "/applied"],
      ["Training Support", "/trainer-dashboard"],
    ],
  },
  {
    title: "For Employers",
    links: [
      ["Post a Job", "/jobs"],
      ["Employer Sign Up", "/register"],
      ["Shortlisted Candidates", "/shortlisted"],
      ["Hiring Reports", "/reports"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Blog", "/blog"],
      ["Gallery", "/gallery"],
      ["Volunteer", "/volunteer"],
      ["Contact Us", "/contact"],
    ],
  },
];

const SOCIAL = [
  ["Facebook", "https://facebook.com", <FacebookIcon />],
  ["Instagram", "https://instagram.com", <InstagramIcon />],
  ["LinkedIn", "https://linkedin.com", <LinkedInIcon />],
  ["Twitter", "https://twitter.com", <TwitterIcon />],
];

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="ajf" aria-label="Site footer">
      {/* decorative wave, same curve language as the dashboard banner */}
      <svg className="ajf-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,60 C240,110 480,10 760,40 C1040,70 1240,20 1440,50 L1440,90 L0,90 Z" fill="#0b2a6f" />
        <path d="M0,70 C260,100 520,30 800,52 C1060,72 1250,36 1440,62" fill="none" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <div className="ajf-body">
        <div className="ajf-grid">
          <div className="ajf-brand">
            <Link to="/" className="ajf-logo" aria-label="Able Jobs Hub home">
              <img src={ableLogo} alt="Able Jobs Hub – Breaking Barriers" />
            </Link>
            <p>
              Connecting talented with inclusive employers. Your ability is our
              priority — find the right job, showcase your skills and achieve your dreams.
            </p>
            <div className="ajf-open">
              <AccessibleIcon /> Open to Differently Abled
            </div>
            <div className="ajf-social">
              {SOCIAL.map(([label, href, icon]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav className="ajf-col" key={col.title} aria-label={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to}>
                      <ChevronRightIcon fontSize="small" /> {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="ajf-col ajf-contact">
            <h3>Get in Touch</h3>
            <ul>
              <li>
                <PhoneIcon fontSize="small" />
                <a href="tel:+919885881244">Helpline: +91 9885881244</a>
              </li>
              <li>
                <EmailIcon fontSize="small" />
                <a href="mailto:info@ablejobshub.com">info@ablejobshub.com</a>
              </li>
              <li>
                <PlaceIcon fontSize="small" />
                <span>Hyderabad, Telangana, India</span>
              </li>
            </ul>
            <Link to="/contact" className="ajf-cta">Contact Support</Link>
          </div>
        </div>

        <div className="ajf-tagline">
          Equal Opportunity<i>•</i>Inclusive Growth<i>•</i>A Stronger Tomorrow
        </div>

        <div className="ajf-bottom">
          <span>© {new Date().getFullYear()} Able Jobs Hub. All rights reserved.</span>
          <button type="button" className="ajf-top" onClick={toTop} aria-label="Back to top">
            <KeyboardArrowUpIcon /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
