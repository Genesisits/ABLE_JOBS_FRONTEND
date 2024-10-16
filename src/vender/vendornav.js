import React from "react";
import './vender.css';
import { useNavigate } from "react-router-dom";

const VendorNav = ({ handleOptionClick }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    localStorage.removeItem("id_token"); // Clear token from localStorage
    navigate("/login"); // Navigate to the login page after logout
  };

  // Check if token is present
  const token = localStorage.getItem("id_token");

  if (!token) {
    // If token is not present, render nothing or a message
    return null; // Render nothing
    // Or render a message
    // return <p>Please login to access this page</p>;
  }

  // If token is present, render the sidebar
  return (
    <div className="sidebar">
      {/* Sidebar content goes here */}
      <ul>
        <li onClick={() => handleOptionClick("Events")}>Events</li>
        <li onClick={() => handleOptionClick("History")}>History</li>
        <li onClick={() => handleOptionClick("Payment")}>Payment</li>
        <li onClick={() => handleOptionClick("Tender")}>Tender</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default VendorNav;
