import React, { useState } from "react";
import * as yup from 'yup';
import './admin.css';
import axios from 'axios';
import { ADD_EVENT } from '../endpoints';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const validationSchema = yup.object().shape({
  name: yup.string().required("Event Name is required"),
  date: yup.string().required("Event Date is required"),
  location: yup.string().required("Event Location is required"),
  event_type: yup.string().required("Event Type is required"),
});

export default function AddEvent() {
  const [selectedEventType, setSelectedEventType] = useState('');
  const [addeventformData, setAddeventFormData] = useState({
    name: '',
    date: '',
    location: '',
    event_type: '',
  });
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); 
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const navigate = useNavigate();

  const handleEventTypeChange = (e) => {
    const newEventType = e.target.value;
    setAddeventFormData(prevFormData => ({
      ...prevFormData,
      event_type: newEventType,
    }));
    setSelectedEventType(newEventType);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setAddeventFormData(prevFormData => ({
      ...prevFormData,
      name: newName,
    }));
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setAddeventFormData(prevFormData => ({
      ...prevFormData,
      location: newLocation,
    }));
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Adding leading zeros if month or day is less than 10
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
  }

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setAddeventFormData(prevFormData => ({
      ...prevFormData,
      date: newDate,
    }));
  };

  const handleAddEventSubmit = (e) => {
    e.preventDefault();
    validationSchema.validate(addeventformData, { abortEarly: false })
      .then(() => {
        axios.post(ADD_EVENT, { ...addeventformData })
          .then(response => {
            if (response.status === 200) {
              console.log('Form submitted:', addeventformData);
              setShowSuccessPopup(true);
              setTimeout(() => {
                setShowSuccessPopup(false);
                navigate("/admin");
              }, 3000);
            }
          })
          .catch(error => {
            if (error.response && error.response.data && error.response.data.error === "Event name must be unique") {
              setErrors({ name: "Event name must be unique" });
              setShowErrorPopup(true);
              setTimeout(() => {
                setShowErrorPopup(false);
              }, 2000);
            } else {
              console.error('Error adding event:', error);
              setShowErrorPopup(true); 
              setTimeout(() => {
                setShowErrorPopup(false);
              }, 2000);
            }
          });
      })
      .catch(err => {
        const validationErrors = {};
        err.inner.forEach(e => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
        setShowErrorPopup(true); // Show error popup for validation errors
        setTimeout(() => {
          setShowErrorPopup(false);
        }, 2000);
      });
  };
  
  
  return (
    <div className="event-modal">
      <h2>Add Event</h2>
      <Link to="/admin" className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'green' }} />
      </Link>
      <div className="event-input-container">
        <div className="event-input-box">
          <label htmlFor="eventName" className="eventname">Event Name:</label>
          <input type="text" value={addeventformData.name} onChange={handleNameChange} className="eventName" />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="event-input-box-location">
          <label htmlFor="eventLocation" className="eventlocation">Event Location:</label>
          <input type="text" value={addeventformData.location} onChange={handleLocationChange} id="eventLocation" />
          {errors.location && <div className="error-message" style={{marginLeft:'-40%'}}>{errors.location}</div>}
        </div>

        <div className="event-input-box1">
          <label htmlFor="eventDate" className="eventdate">Event Date:</label>
          <input 
            type="date" 
            id="eventDate" 
            value={addeventformData.date} 
            onChange={handleDateChange} 
            className="eventDate" 
            min={getCurrentDate()} // Setting the minimum date dynamically
          />
          {errors.date && <div className="error-message" style={{marginLeft:'-80%'}}>{errors.date}</div>}
        </div>
      </div>

      <label className='admin_label_1' htmlFor="category">Events*</label>
      <select className='admin_input_1' value={selectedEventType} onChange={handleEventTypeChange} id="eventtype" name="eventtype" required>
        <option value="" disabled selected>Select Event</option>
        <option value="wedding_reception">Wedding&Reception</option>
        <option value="corporate_events">Corporate Events</option>
        <option value="mice_events">Mice Events</option>
        <option value="movie_publicity">Movie Publicity & Promotions</option>
        <option value="birthday_parties">Birthday Parties</option>
        <option value="sports_events">Sports Events</option>
        <option value="media_planners">Media Planners</option>
        <option value="celebrity_management">Celebrity Management</option>
        <option value="occasional_events">OCCASIONAL EVENTS</option>
        <option value="entertainment">Entertainment</option>
        <option value="sfx_products">SFX Products</option>
      </select>
      {errors.event_type && <div className="error-message" style={{marginLeft:'-73%'}}>{errors.event_type}</div>}
      <div className="admin-toggle-button">
        {selectedEventType && (
          <div className="admin-toggle-button1" style={{ display: 'flex', flexDirection: 'row' }}>
          </div>
        )}
      </div>

      <div className="add-event-button2">
        <button className="add-event-button3"
          style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', textDecoration: 'none', borderRadius: '5px' }}
          onClick={handleAddEventSubmit}>Save</button>
      </div>

      {showSuccessPopup && (
        <div className="success-popup">
          <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginRight: '0.5rem' }} />
          Event added successfully!
        </div>
      )}
      {showErrorPopup && (
        <div className="error-popup">
          Error: Event name must be unique!
        </div>
      )}
    </div>
  );
}
