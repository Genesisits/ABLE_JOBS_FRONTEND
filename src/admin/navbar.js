import React, { useState } from "react";
import './admin.css';
import { useNavigate } from "react-router-dom";

const NavigationBar = ({ handleOptionClick }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("id_token");
    navigate("/login");
  };

  const token = localStorage.getItem("id_token");

  if (!token) {
    return null; 
  }

  
  const handleClick = (option) => {
    handleOptionClick(option);
    setSelectedOption(option);
  };

  return (
    <div className="sidebar">
      <ul>
        <li className={selectedOption === "Events" ? "selected" : ""} onClick={() => handleClick("Events")}>Events</li>
        <li className={selectedOption === "Vendors" ? "selected" : ""} onClick={() => handleClick("Vendors")}>Vendors</li>
        <li className={selectedOption === "Events History" ? "selected" : ""} onClick={() => handleClick("Events History")}>Events History</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default NavigationBar;
