import React from 'react';
import about from '../../images/able_about.jpeg';
import about1 from '../../images/about1.jpeg';
import './about.css';

export default function About() {
    return (
        <div>
            {/* Full-width Background Image */}
            <div
                style={{
                    backgroundImage: `url(${about})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '400px',
                    width: '100%',
                }}
                className="about-hero"
            ></div>

            {/* About Section with Animation */}
            <div className="about-section">
                {/* Text Content */}
                <div className="about-text">
                    <h2>About Us</h2>
                    <p>
                        At Able Jobs, we are on a mission to revolutionize the way people build their
                        careers. Founded with the belief that meaningful work empowers individuals and
                        drives society forward, we aim to bridge the gap between talent and opportunity
                        by providing innovative, accessible, and effective career solutions.
                    </p>
                </div>

                {/* Image */}
                <div className="about-image">
                    <img src={about1} alt="about_image" />
                </div>
            </div>

            {/* Who We Are Section */}
            <div className="who-we-are-section">
                <div className="who-we-are-content">
                    <h2>Who We Are</h2>
                    <p>
                        We are a dynamic team of educators, industry experts, and technology enthusiasts 
                        dedicated to empowering job seekers to unlock their full potential. Whether you’re 
                        starting your career or looking to upskill for the next step, Able Jobs is your 
                        trusted partner.
                    </p>
                </div>
                <div className="who-we-are-content">
                    <h2>What We Do</h2>
                    <p>
                        We specialize in creating personalized learning experiences that prepare you for 
                        real-world roles. Through industry-aligned courses, hands-on practice, and dedicated mentorship, 
                        we help job seekers acquire in-demand skills and secure fulfilling employment.
                    </p>
                </div>
            </div>
        </div>
    );
}
