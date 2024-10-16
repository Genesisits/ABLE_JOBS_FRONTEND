import React, { useState } from "react";
import { CONTRACT_DATA, VENDOR_QUOTE } from '../endpoints';
import './quote.css';
import axios from 'axios';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Quote() {
    const [contractData, setContractData] = useState([]);
    const [responseData, setResponseData] = useState(null);
    const [selectedTender, setSelectedTender] = useState([]);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); 
    const [tenderData, setTenderData] = useState({
        event_id: '',
        contract_id: '',
        vendor_id: '',
        items: [
            { name: '', price: '', checked: false } // Include checked state for each item
        ]
    });
    // const [checkboxClicked, setCheckboxClicked] = useState(false); 

    const handleChangeQuote = (e) => {
        setContractData(e.target.value);
    };

    const handleQuoteSubmit = (e) => {
        e.preventDefault();

        axios.post(CONTRACT_DATA, { contract_id: contractData })
            .then(response => {
                if (response.status === 200) {
                    const contractData = response.data;
                    setResponseData(contractData);
                    // Assuming only one item is returned, you can adjust this according to your data structure
                    if (contractData.length > 0 && contractData[0].items.length > 0) {
                        const itemNames = contractData[0].items.map(item => item.item_name);
                        // Update the item names in tenderData
                        const updatedTenderData = {
                            ...tenderData,
                            items: itemNames.map(name => ({ name, price: '', checked: false })) // Initialize checked state for each item
                        };
                        setTenderData(updatedTenderData);
                    }
                    
                }
                
            })
            .catch(error => {
                console.error('Error adding event:', error);
            });
    };

    const userEmail = sessionStorage.getItem('email');
    const handleItemsChange = (item, quantity) => {
        const isAlreadySelected = selectedTender.some(tenderData => tenderData.item_name === item.item_name);

        if (isAlreadySelected) {
            if (quantity > 0) {
                setSelectedTender(selectedTender.map(tenderData =>
                    tenderData.item_name === item.item_name ? { ...tenderData, quantity } : tenderData
                ));
            } else {
                setSelectedTender(selectedTender.filter(tenderData => tenderData.item_name !== item.item_name));
            }
        } else {
            setSelectedTender([...selectedTender, { ...item, quantity }]);
        }

    };


    const handleTenderSubmit = (e, event_id) => {
        e.preventDefault();

        const payload = {
            event_id: event_id,
            contract_id: contractData,
            vendor_id: userEmail,
            items: tenderData.items // Send the items along with other data
        };

        axios.post(VENDOR_QUOTE, payload)
            .then(response => {
                if (response.status === 200) {
                    console.log("Tender submitted successfully!");
                    setTenderData({
                        ...tenderData,
                        items: tenderData.items.map(item => ({ ...item, price: '', checked: false })) // Reset items after successful submission
                    });
                    console.log("my data:", payload);
                }
                setShowSuccessPopup(true);
              setTimeout(() => {
                setShowSuccessPopup(false);
               
              }, 3000);
            })
            .catch(error => {
                console.error('Error submitting tender:', error);
            });
    };

    // const handleCheckboxClick = () => {
    //     setCheckboxClicked(true); 
    // };

    return (
        <div className="quote-form-container">
            <h3 style={{ textAlign: 'center', color: 'white' }}>Please Enter Your Details</h3>
            <form className='vendor_quote_2' onSubmit={handleQuoteSubmit}>
                <div className="quote-container">
                    <div>
                        <label className='vendor_quote_1' htmlFor="email">Contract Id </label>
                        <input className='vendor_quote_input_2' placeholder="Please enter Your Contract Id" type="text2" id="name" name="id" value={contractData} onChange={handleChangeQuote} required />
                    </div>
                </div>
                <button className='vendor_quote_button_1' type="submit">Submit</button>
            </form>

            {/* Render the response data */}
            {responseData && Array.isArray(responseData) && (
                <div className="response-container">
                    {responseData.map((dataItem, index) => (
                        <div key={index} className="data-item">
                            <p>Items:</p>
                            <ul>
                                {dataItem.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <p>Category: {item.category}</p>
                                        <p>Item Name: {item.item_name}</p>
                                        <label htmlFor={`checkbox-${index}-${itemIndex}`}>Quantity Required: {item.quantity}</label>
                                        <input
                                            type="checkbox"
                                            // id={`checkbox-${index}-${itemIndex}`} 
                                            // name={`checkbox-${index}-${itemIndex}`} 
                                            checked={selectedTender.some(tenderData => tenderData.item_name === item.item_name)}
                                            onChange={(e) => handleItemsChange(item, e.target.checked ? 0 : 0)}
                                        />

                                        <input
                                            type="number"
                                            min='0'
                                            placeholder="Price Per 1 Unit"
                                            value={selectedTender.find(tenderData => tenderData.item_name === item.item_name)?.quantity || ''}
                                            onChange={(e) => handleItemsChange(item, parseInt(e.target.value, 10))}
                                            disabled={!selectedTender.some(tenderData => tenderData.item_name === item.item_name)} />
                                        {/* )} */}
                                    </li>
                                ))}
                            </ul>
                            <button type="submit" onClick={(e) => handleTenderSubmit(e, dataItem.event_id)}>Submit</button>
                            {showSuccessPopup && (
        <div className="quote-success-popup">
          <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginRight: '0.5rem' }} />
          Tender submitted successfully!
        </div>
      )}
                        </div>
                    ))}
                </div>
            )}
           
        </div>
    );
}
