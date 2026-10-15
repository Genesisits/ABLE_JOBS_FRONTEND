import React from 'react';
// import { FaArrowRight } from 'react-icons/fa';
import about from '../../images/able_about.jpeg';
import about1 from '../../images/about1.jpeg';
import about2 from '../../images/Vision1.jpeg';
import about3 from '../../images/impact.jpeg';
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
                    height: '500px',
                    width: '100%',
                    marginTop:'4%'
                }}
                className="about-hero"
            ></div>

            {/* About Section */}
            <div className="about-section">
                <div className="about-text">
                    <h2 className="section-heading">About Us</h2>
                    <p>
                        At Able Jobs, we are on a mission to revolutionize the way people build their
                        careers. Founded with the belief that meaningful work empowers individuals and
                        drives society forward, we aim to bridge the gap between talent and opportunity
                        by providing innovative, accessible, and effective career solutions.
                    </p>
                </div>
                <div className="about-image">
                    <img src={about1} alt="about_image" />
                </div>
            </div>

            {/* Who We Are Section */}
            <div className="who-we-are-section">
    <div className="who-we-are-content who-left">
        <h2>Who We Are</h2>
        <p>
            We are a dynamic team of educators, industry experts, and technology enthusiasts 
            dedicated to empowering job seekers to unlock their full potential. Whether you’re 
            starting your career or looking to upskill for the next step, Able Jobs is your 
            trusted partner.
        </p>
    </div>
    <div className="who-we-are-content who-right">
        <h2>What We Do</h2>
        <p>
            We specialize in creating personalized learning experiences that prepare you for 
            real-world roles. Through industry-aligned courses, hands-on practice, and dedicated mentorship, 
            we help job seekers acquire in-demand skills and secure fulfilling employment.
        </p>
    </div>
</div>

            
            {/* Our Vision Section */}
            <div className="vision-section additional-section">
                <div className="vision-image">
                    <img src={about2} alt="vision" />
                </div>
                <div className="vision-content">
                    <h2 className="section-heading">Our Vision</h2>
                    <p>
                        We envision a world where everyone has the tools and confidence to achieve their career 
                        aspirations. By combining cutting-edge technology with human-centric guidance, we aim to 
                        redefine what’s possible in career building.
                    </p>
                </div>
            </div>

            {/* Our Impact Section */}
            <div className="impact-section additional-section">
                <div className="impact-content">
                    <h2 className="section-heading">Our Impact</h2>
                    <p>
                        With thousands of success stories and partnerships with leading organizations, Able 
                        Jobs has become a trusted name in career development. Together, we’re transforming lives 
                        and empowering the workforce of tomorrow.
                    </p>
                </div>
                <div className="impact-image">
                    <img src={about3} alt="impact" />
                </div>
            </div>

            <div className="additional-section">
                <h2 className="section-heading">Our Programs Are Designed To:</h2>
                <ul>
                    <li>  Upskill and Reskill: Stay ahead of industry trends with tailored learning paths.</li>
                    <li>  Provide Career Support: From resume building to interview prep, we’re here to guide you every step of the way.</li>
                    <li>  Deliver Results: We take pride in our high placement rates and the success stories of our students.</li>
                </ul>
            </div>
            <div className="additional-section">
                <h2 className="section-heading">Why Choose Us?</h2>
                <ul>
                    <li> Industry-Relevant Training: Learn from experts who understand what today’s employers are looking for.</li>
                    <li> Job-Ready Focus: Our courses are designed to not just teach, but to prepare you for success in the workplace.</li>
                    <li> Community and Support: Join a vibrant community of learners and mentors who inspire and support one another.</li>
                </ul>
            </div>
            
        </div>
    );
}
