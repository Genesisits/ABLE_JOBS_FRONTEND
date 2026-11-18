import React from 'react';
import heroImg from '../../images/about_hero_silhouette.jpg';
import about1 from '../../images/about_team.jpg';
import about2 from '../../images/Vision1.jpeg';
import about3 from '../../images/impact.jpeg';
import './about.css';

const WheelchairIcon = () => (
  <svg viewBox="-4 0 76 76" className="aj-wheelchair" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M26 20v18h16l8 14h6" />
      <path d="M26 28h14" />
      <path d="M22 40a14 14 0 1 0 18 17" />
    </g>
    <circle cx="26" cy="9" r="5.5" fill="currentColor" />
  </svg>
);

const GroupIcon = ({ className = 'aj-group-icon', light }) => (
  <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
    <circle cx="32" cy="10" r="8" fill={light ? '#fff' : '#1b3a8a'} />
    <path d="M16 38c0-10 7-16 16-16s16 6 16 16z" fill={light ? '#fff' : '#1b3a8a'} />
    <circle cx="11" cy="15" r="6" fill={light ? '#dbe4ff' : '#0b2a6f'} />
    <path d="M0 38c0-8 5-13 11-13 3 0 5 1 7 2-3 3-5 7-5 11z" fill={light ? '#dbe4ff' : '#0b2a6f'} />
    <circle cx="53" cy="15" r="6" fill={light ? '#dbe4ff' : '#0b2a6f'} />
    <path d="M64 38c0-8-5-13-11-13-3 0-5 1-7 2 3 3 5 7 5 11z" fill={light ? '#dbe4ff' : '#0b2a6f'} />
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <g fill="none" stroke="#f5c542" strokeWidth="2.5">
      <circle cx="22" cy="26" r="15" />
      <circle cx="22" cy="26" r="9" />
      <circle cx="22" cy="26" r="3" fill="#f5c542" />
      <path d="M22 26L40 8M34 6l8 0 0 8" strokeLinecap="round" />
    </g>
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <g fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
      <path d="M4 24c5-9 12-13 20-13s15 4 20 13c-5 9-12 13-20 13S9 33 4 24z" />
      <circle cx="24" cy="24" r="7" />
    </g>
    <circle cx="24" cy="24" r="3" fill="#f5c542" />
  </svg>
);

const HandshakeIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <g fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l8-6 8 2 6-2 10 6 8-4" />
      <path d="M4 20v10l12 8 6-4 4 3 14-10v-8" />
      <path d="M20 16l-6 8 8 6 12-10-8-4z" stroke="#f5c542" />
    </g>
  </svg>
);

export default function About() {
  return (
    <div className="aj-about">
      {/* Top banner */}
      <header className="aj-banner">
        <div className="aj-banner-left">
          <WheelchairIcon />
        </div>
        <div className="aj-banner-photo">
          <img src={heroImg} alt="Silhouettes of people celebrating at sunrise" />
        </div>
      </header>

      {/* About Section */}
      <section className="aj-main">
        <div className="aj-main-text">
          <div className="aj-title-mark">
            <span className="aj-line" />
            <GroupIcon />
            <span className="aj-line" />
          </div>
          <h1 className="aj-title">About Us</h1>
          <p className="aj-desc">
            At Able Jobs, we are on a mission to revolutionize the way people build their
            careers. Founded with the belief that meaningful work empowers individuals and
            drives society forward, we aim to bridge the gap between talent and opportunity
            by providing innovative, accessible, and effective career solutions.
          </p>
        </div>
        <div className="aj-main-photo">
          <img src={about1} alt="about_image" />
        </div>
      </section>

      {/* Who We Are / What We Do */}
      <section className="aj-cards">
        <div className="aj-card">
          <div className="aj-card-icon"><GroupIcon className="aj-card-group" light /></div>
          <div>
            <h3>Who We Are</h3>
            <p>
              We are a dynamic team of educators, industry experts, and technology enthusiasts
              dedicated to empowering job seekers to unlock their full potential. Whether you’re
              starting your career or looking to upskill for the next step, Able Jobs is your
              trusted partner.
            </p>
          </div>
        </div>
        <div className="aj-card">
          <div className="aj-card-icon"><TargetIcon /></div>
          <div>
            <h3>What We Do</h3>
            <p>
              We specialize in creating personalized learning experiences that prepare you for
              real-world roles. Through industry-aligned courses, hands-on practice, and dedicated mentorship,
              we help job seekers acquire in-demand skills and secure fulfilling employment.
            </p>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="aj-row">
        <div className="aj-row-image">
          <img src={about2} alt="vision" />
        </div>
        <div className="aj-row-text">
        <div className="aj-title-new">
          <div className="aj-heading-icon"><EyeIcon /></div>
          <h2 className="aj-heading">Our Vision</h2>
          </div>
          <p>
            We envision a world where everyone has the tools and confidence to achieve their career
            aspirations. By combining cutting-edge technology with human-centric guidance, we aim to
            redefine what’s possible in career building.
          </p>
        </div>
      </section>

      {/* Our Impact */}
      <section className="aj-row aj-row-reverse">
        <div className="aj-row-text">
        <div className="aj-title-new">
          <div className="aj-heading-icon"><HandshakeIcon /></div>
          <h2 className="aj-heading">Our Impact</h2>
          </div>
          <p>
            With thousands of success stories and partnerships with leading organizations, Able
            Jobs has become a trusted name in career development. Together, we’re transforming lives
            and empowering the workforce of tomorrow.
          </p>
        </div>
        <div className="aj-row-image">
          <img src={about3} alt="impact" />
        </div>
      </section>

      {/* Lists */}
      <section className="aj-lists">
        <div className="aj-list-card">
          <h2 className="aj-heading">Our Programs Are Designed To:</h2>
          <ul>
            <li>Upskill and Reskill: Stay ahead of industry trends with tailored learning paths.</li>
            <li>Provide Career Support: From resume building to interview prep, we’re here to guide you every step of the way.</li>
            <li>Deliver Results: We take pride in our high placement rates and the success stories of our students.</li>
          </ul>
        </div>
        <div className="aj-list-card">
          <h2 className="aj-heading">Why Choose Us?</h2>
          <ul>
            <li>Industry-Relevant Training: Learn from experts who understand what today’s employers are looking for.</li>
            <li>Job-Ready Focus: Our courses are designed to not just teach, but to prepare you for success in the workplace.</li>
            <li>Community and Support: Join a vibrant community of learners and mentors who inspire and support one another.</li>
          </ul>
        </div>
      </section>


    </div>
  );
}