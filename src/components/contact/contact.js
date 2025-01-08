import React, { useState } from "react";
import contact from '../../images/contactus_ablejobs.avif';
import './contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message Sent Successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
    };

    return (
      <div style={{ background: 'white' }}>
        <div className="contact-container">
            <img src={contact} alt='contactus_image' />
            <div className="contact-info">
                <div className="info-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <p>1234 Street Name, City, Country</p>
                </div>
                <div className="info-item">
                    <i className="fas fa-envelope"></i>
                    <p>contact@example.com</p>
                </div>
                <div className="info-item">
                    <i className="fas fa-phone-alt"></i>
                    <p>+1 234 567 890</p>
                </div>
            </div>
            <div className="contact-container1">
                <h2>Contact Us</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message"
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
      </div>
    );
};
