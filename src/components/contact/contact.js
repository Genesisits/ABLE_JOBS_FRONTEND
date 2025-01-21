import React, { useState } from "react";
import contact from '../../images/contactus_ablejobs.avif';
import contact2 from '../../images/able_contactus.avif';
import './contact.css';

export default function Contact() {
    
    return (
    //   <div style={{ background: 'white' }}>
        <div className="contact-container" style={{background:'white'}}>
            <div className="contact-image">
            <img src={contact} alt='contactus_image' />
            </div>
            <div className="contact-info">
                <div className="info-item1">
                    <i className="fas fa-map-marker-alt"></i>
                    <p>1234 Street Name, City, Country</p>
                </div>
                <div className="info-item1">
                    <i className="fas fa-envelope"></i>
                    <p>contact@example.com</p>
                </div>
                <div className="info-item1">
                    <i className="fas fa-phone-alt"></i>
                    <p>+1 234 567 890</p>
                </div>
            </div>
            <div className="contact-map">
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5824826136813!2d78.44409467468395!3d17.431813301524766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90ceabfad535%3A0x3cd31d9753e145b7!2sEureka%20Court%20Complex%2C%20Shop%20no%3A%2011%20%26%2012%2C%20Eureka%20Estate%2C%20Kallu%20Compound%20Rd%2C%20Pratap%20Nagar%2C%20Nagarjuna%20Nagar%20colony%2C%20Yella%20Reddy%20Guda%2C%20Hyderabad%2C%20Telangana%20500016!5e0!3m2!1sen!2sin!4v1736414150122!5m2!1sen!2sin" 
            width="80%" 
            height="500" 
            style={{border:'0'}}
             allowfullscreen="" 
             loading="lazy" 
             referrerpolicy="no-referrer-when-downgrade">

             </iframe>
            </div>
            <div className="contact-image-form">
            <div className="contact-form">
                <h2>Contact Us</h2>
                <form>
                    <div className="form-group1">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" style={{width:'60%'}} id="firstName" name="firstName" placeholder="Enter your first name" />
                    </div>
                    <div className="form-group1">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" style={{width:'60%'}} id="lastName" name="lastName" placeholder="Enter your last name" />
                    </div>
                    <div className="form-group1">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" />
                    </div>
                    <div className="form-group1">
                        <label htmlFor="address">Address</label>
                        <textarea id="address" name="address" placeholder="Enter your address"></textarea>
                    </div>
                    <button type="submit" style={{marginLeft:'40%'}} className="form-submit-btn">Submit</button>
                </form>
            </div>
            <div className="contact-image1">
                <img src={contact2} alt='contact_image'/>
            </div>
            </div>
        </div>
    //   </div>
    );
};
