import React, { useState } from "react";
import './admin.css';
import VenderList from './venderlist';
import NavigationBar from "./navbar";
import { Link } from "react-router-dom";
import EventList from "./eventlist";
import DeventList from "./deventlist";

export default function Admin() {
  const [selectedOption, setSelectedOption] = useState("Events");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const token = localStorage.getItem("id_token");

  if (!token) {
    return null;
  }

  return (
    <div className="admin-container">
      <NavigationBar handleOptionClick={handleOptionClick} /> 
      <div className="admin-content">
        {selectedOption === "Events" && (
          <React.Fragment>
            <h1>Welcome Admin</h1>
            <div className="admin-button">
              <Link to="/addevent" className="add-event-button" style={{ display: 'inline-block', marginTop: '9%', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', textDecoration: 'none', borderRadius: '5px'}}>Add Event +</Link>
            </div>
          </React.Fragment>
        )}
        <div className="content-display">
          {selectedOption === "Events" && (
            <React.Fragment>
              <EventList/>
            </React.Fragment>
          )}
          {selectedOption === "Vendors" && <VenderList />}
          {selectedOption === "Events History" && <DeventList />}
        </div>
      </div>
    </div>
  );
}
