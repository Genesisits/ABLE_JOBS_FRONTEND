import React from 'react';
import blog from '../../images/blog_able.jpeg';
import blog1 from '../../images/blog_able1.jpeg';
import blog2 from '../../images/blog_able2.jpeg';
import blog3 from '../../images/blog_able3.webp.webp';
import blog4 from '../../images/blog_able4.webp.webp';
import blog5 from '../../images/blog_able5.webp.webp';
import blog6 from '../../images/blog_able6.jpeg';
import './blog.css';

export default function Blog() {
    const generateTimestamp = (offsetInDays, offsetInHours, offsetInMinutes, offsetSeconds) => {
        const date = new Date();
        date.setDate(date.getDate() + offsetInDays); // Adding offset to the date (days)
        date.setHours(date.getHours() + offsetInHours); // Adding offset to the hours
        date.setMinutes(date.getMinutes() + offsetInMinutes); // Adding offset to the minutes
        date.setSeconds(date.getSeconds() + offsetSeconds);
        return date.toLocaleString(); // Format the timestamp as a locale string
    };

    const paragraphs = [
        {
            image: blog1,
            text: "A person with a disability faces various obstacles while trying to find and maintain employment. Persons with impairments may occasionally earn less money than people without disabilities.",
            timestamp: generateTimestamp(0, 0, 0,0), // Same day, current time
        },
        {
            image: blog2,
            text: "In other instances, you'll find them being treated unfairly at work and stigmatized as unreliable individuals merely because of their condition.",
            timestamp: generateTimestamp(-21, 2, 15,42), // 1 day later, 2 hours and 15 minutes later
        },
        {
            image: blog3,
            text: "Despite the Disabilities Act ensuring equal opportunities for all, disabled people consistently have poor employment rates. India has nearly 3 crore people who suffer from a disability (PwD). It is estimated that 1.3 crore people are employable but about one-third or 34 lakh of them are employed, as per July 2021 statistics. Since then, the rate has decreased much more.",
            timestamp: generateTimestamp(-11, 5, 30, 38), // 1 day before, 5 hours and 30 minutes later
        },
        {
            image: blog4,
            text: "Finding employment is challenging for people with impairments due to prejudice and discrimination against them. However, there are additional variables, which a recent study has examined, that discourage individuals with impairments from looking for work in the first place.",
            timestamp: generateTimestamp(-4, 8, 45,0) // 2 days later, 8 hours and 45 minutes later
        },
        {
            image: blog5,
            text: "The responses offer the government and employers crucial information they require to increase the accessibility of employment prospects for people with disabilities.",
            timestamp: generateTimestamp(-2, 10, 0, 23), // 2 days before, 10 hours later
        },
        {
            image: blog6,
            text: "There are laws against this type of abuse, but in recent times, numerous publications have called out employers who do not support recognizing disabled people as human beings with equal possibilities. People with disabilities face numerous obstacles both when working and when looking for work, be it on-campus or remote work.",
            timestamp: generateTimestamp(-2, 1, 0, 23), // 2 days before, 10 hours later
        },
    ];

    return (
        <div style={{ background: 'white' }}>
            <div
                style={{
                    backgroundImage: `url(${blog})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '700px',
                    width: '100%',
                    marginTop: '4%',
                }}
                className="about-hero"
            ></div>
           
            <div className="blog-container">
                <header className="blog-header">
                    <h1>Challenges Faced by People with Disabilities in Employment</h1>
                </header>

                <section className="blog-content-grid">
                    {paragraphs.map((paragraph, index) => (
                        <div className="blog-grid-item" key={index}>
                            <img src={paragraph.image} alt={`Blog_Image ${index + 1}`} className="blog-image" style={index === 0 ? { height: '300px' } : index === 5 ? { height: '300px' } : {}} />
                            <div className="blog-text">
                                <p>{paragraph.text}</p>
                                <p className="blog-timestamp">Published: {paragraph.timestamp}</p> {/* Display unique timestamp */}
                            </div>
                        </div>
                    ))}
                </section>

                <footer className="blog-footer">
                    <p>Published: January 2025</p>
                    <p>Last Updated: {new Date().toLocaleString()}</p>
                </footer>
            </div>
        </div>
    );
}
