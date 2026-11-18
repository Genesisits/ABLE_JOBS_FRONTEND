import React, { useState, useEffect } from "react";
import contact from '../../images/contact_banner.jpg';
import contact2 from '../../images/able_contactus.avif';
import { CONTACT_US } from '../../endpoints';
import './contact.css';

// Names: letters from any language (\p{L}) plus their vowel/combining marks (\p{M},
// needed for Telugu, Hindi, Tamil...), spaces, . ' and -. No digits or symbols.
const cleanName = (v) => v.replace(/[^\p{L}\p{M}\s.'-]/gu, "").replace(/^\s+/, "").slice(0, 50);
const NAME_RE = /^\p{L}[\p{L}\p{M}\s.'-]*$/u;

const PinIcon = () => (
    <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 4c-8 0-14 6-14 14 0 10 14 26 14 26s14-16 14-26c0-8-6-14-14-14z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="24" cy="18" r="5" fill="#f5a623" />
    </svg>
);
const MailIcon = () => (
    <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="6" y="11" width="36" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M7 14l17 13 17-13" fill="none" stroke="#f5a623" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const PhoneIcon = () => (
    <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M13 6l7 9-4 4c2 5 6 9 11 11l4-4 9 7-3 6c-2 2-6 2-10 0-10-5-18-13-22-23-2-5-1-8 1-10z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M30 8a10 10 0 0 1 10 10" fill="none" stroke="#f5a623" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

const EMPTY_VALUES = { firstName: "", lastName: "", email: "", address: "" };

export default function Contact() {
    const [values, setValues] = useState(EMPTY_VALUES);
    const [errors, setErrors] = useState({});
    // idle | sending | success | error
    const [status, setStatus] = useState("idle");
    const [serverError, setServerError] = useState("");
    const NAME_FIELDS = ["firstName", "lastName"];

    const closePopup = () => setStatus("idle");

    // While the success popup is open: close on Escape and stop the page behind from scrolling.
    useEffect(() => {
        if (status !== "success") return undefined;
        const onKey = (e) => { if (e.key === "Escape") setStatus("idle"); };
        document.addEventListener("keydown", onKey);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [status]);

    // Names: letters only (digits and symbols are blocked as the user types).
    const updateField = (event) => {
        const { name, value } = event.target;
        const next = NAME_FIELDS.includes(name) ? cleanName(value) : value;
        setValues((current) => ({ ...current, [name]: next }));
        setErrors((current) => ({ ...current, [name]: "" }));
        setStatus("idle");
        setServerError("");
    };

    const nameError = (value, label) => {
        const v = value.trim();
        if (!v) return `${label} is required.`;
        if (!NAME_RE.test(v)) return `${label} can contain letters only (no numbers).`;
        if (v.length < 2) return `${label} must be at least 2 letters.`;
        return undefined;
    };

    // Show the name error as soon as the user leaves the field.
    const handleNameBlur = (event) => {
        const { name, value } = event.target;
        const label = name === "firstName" ? "First name" : "Last name";
        setErrors((current) => ({ ...current, [name]: nameError(value, label) || "" }));
    };

    const handleContactSubmit = async (event) => {
        event.preventDefault();
        if (status === "sending") return;

        const next = {};
        const firstNameError = nameError(values.firstName, "First name");
        const lastNameError = nameError(values.lastName, "Last name");
        if (firstNameError) next.firstName = firstNameError;
        if (lastNameError) next.lastName = lastNameError;
        if (!values.email.trim()) next.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Enter a valid email address.";
        if (!values.address.trim()) next.address = "Address is required.";
        setErrors(next);
        if (Object.keys(next).length > 0) {
            setStatus("idle");
            return;
        }

        setStatus("sending");
        setServerError("");
        try {
            const response = await fetch(CONTACT_US, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: values.firstName.trim(),
                    last_name: values.lastName.trim(),
                    email: values.email.trim(),
                    address: values.address.trim(),
                }),
            });

            if (!response.ok) {
                // Try to surface a message from the backend, fall back to a generic one.
                let message = "";
                try {
                    const data = await response.json();
                    message = data.message || data.error || data.detail || "";
                } catch (_) { /* response had no JSON body */ }
                throw new Error(message || "Something went wrong. Please try again.");
            }

            setValues(EMPTY_VALUES);
            setErrors({});
            setStatus("success");
        } catch (err) {
            setServerError(err.message || "Unable to send your message. Please check your connection and try again.");
            setStatus("error");
        }
    };

    return (
        <div className="ct-page">
            {/* Banner */}
            <div className="ct-hero">
                <span className="ct-ring ct-ring-1" />
                <span className="ct-ring ct-ring-2" />
                <div className="ct-hero-frame">
                    <img src={contact} alt='contactus_image' />
                </div>
            </div>

            {/* Info cards overlapping the banner */}
            <div className="ct-info">
                <div className="ct-info-card">
                    <div className="ct-info-icon"><PinIcon /></div>
                    <p>Opp. R.S Brothers, Ameerpet Telangana - 500073 Hyderabad</p>
                </div>
                <div className="ct-info-card">
                    <div className="ct-info-icon"><MailIcon /></div>
                    <p>info@ablejobshub.com</p>
                </div>
                <div className="ct-info-card">
                    <div className="ct-info-icon"><PhoneIcon /></div>
                    <p>+91 9885881244</p>
                </div>
            </div>

            {/* Map */}
            <div className="ct-map">
                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5824826136813!2d78.44409467468395!3d17.431813301524766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90ceabfad535%3A0x3cd31d9753e145b7!2sEureka%20Court%20Complex%2C%20Shop%20no%3A%2011%20%26%2012%2C%20Eureka%20Estate%2C%20Kallu%20Compound%20Rd%2C%20Pratap%20Nagar%2C%20Nagarjuna%20Nagar%20colony%2C%20Yella%20Reddy%20Guda%2C%20Hyderabad%2C%20Telangana%20500016!5e0!3m2!1sen!2sin!4v1736414150122!5m2!1sen!2sin"
                    width="100%"
                    height="500"
                    style={{ border: '0' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>

            {/* Form + image */}
            <div className="ct-form-section">
                <div className="ct-form-card">
                    <h2>Contact Us</h2>
                    <form onSubmit={handleContactSubmit} noValidate>
                        <div className="ct-row">
                            <div className="ct-field">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" value={values.firstName} onChange={updateField} onBlur={handleNameBlur} maxLength={50} autoComplete="given-name" aria-invalid={!!errors.firstName} />
                                {errors.firstName && <small className="form-field-error" role="alert">{errors.firstName}</small>}
                            </div>
                            <div className="ct-field">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" value={values.lastName} onChange={updateField} onBlur={handleNameBlur} maxLength={50} autoComplete="family-name" aria-invalid={!!errors.lastName} />
                                {errors.lastName && <small className="form-field-error" role="alert">{errors.lastName}</small>}
                            </div>
                        </div>
                        <div className="ct-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" value={values.email} onChange={updateField} autoComplete="email" aria-invalid={!!errors.email} />
                            {errors.email && <small className="form-field-error" role="alert">{errors.email}</small>}
                        </div>
                        <div className="ct-field">
                            <label htmlFor="address">Address</label>
                            <textarea id="address" name="address" placeholder="Enter your address" value={values.address} onChange={updateField} aria-invalid={!!errors.address}></textarea>
                            {errors.address && <small className="form-field-error" role="alert">{errors.address}</small>}
                        </div>
                        <button type="submit" className="ct-submit" disabled={status === "sending"}>
                            {status === "sending" ? "Sending..." : "Submit"}
                        </button>
                        {status === "error" && (
                            <p className="form-field-error" role="alert">{serverError}</p>
                        )}
                    </form>
                </div>

                <div className="ct-form-image">
                    <img src={contact2} alt='contact_image' />
                </div>
            </div>

            {/* Success popup */}
            {status === "success" && (
                <div className="ct-modal-overlay" onClick={closePopup}>
                    <div
                        className="ct-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="ct-modal-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="ct-modal-icon" aria-hidden="true">
                            <svg viewBox="0 0 48 48">
                                <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="3" />
                                <path d="M14 25l7 7 13-15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 id="ct-modal-title">Thank you!</h3>
                        <p>Our team will contact you within 24 hours.</p>
                        <button type="button" className="ct-modal-btn" onClick={closePopup} autoFocus>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};