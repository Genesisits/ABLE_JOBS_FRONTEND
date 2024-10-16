import React, { useState } from "react";
import VendorNav from "./vendornav";
import Quote from "./quote";
import './vender.css';
import VeventHistory from "./veventhistory";
import VeventList from "./veventlist";

export default function Vender() {
    const [selectedOption, setSelectedOption] = useState("Events");
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    // Check if token is present
    const token = localStorage.getItem("id_token");

    if (!token) {
        // If token is not present, return null
        return null;
    }

    return (
        <div className="vendor-container">
            <VendorNav handleOptionClick={handleOptionClick} />
            <div className="vendor-content">
                {/* <h1>Welcome Vender</h1> */}
                {/* <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button>Search</button>
                </div> */}
                <div className="vendor-display">
                    {selectedOption === "Events" && <VeventList />}
                    {selectedOption === "History" && <VeventHistory />}
                    {selectedOption === "Payment" && <p>Payments goes here</p>}
                    {selectedOption === "Tender" && <Quote />}
                </div>
            </div>
        </div>
    );
}
