import React, { useEffect, useState } from "react";
import axios from 'axios';
import { EVENT_ITEMS, ASSIGN_CONTRACT } from "../endpoints";
import './eventlist.css';
import './assign.css';
import { Link, useNavigate } from "react-router-dom";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from "react-js-pagination";

const EventItems = () => {
    const [eventData, setEventData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 5;
  
    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = eventData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
      };
      
    const navigate = useNavigate();

    useEffect(() => {
        const ItemEventId = sessionStorage.getItem("ItemEventId");
        setIsLoading(true); // Set loading to true when starting to fetch data
        axios.get(`${EVENT_ITEMS}${ItemEventId}`)
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setEventData(response.data);
                } else {
                    // Log or handle empty data case as needed
                    console.log("No items found for the given event ID");
                }
                setIsLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('Error fetching events data:', error);
                setIsLoading(false); // Ensure loading is set to false even if there's an error
            });
    }, []);

    const handleAssignItems = (e) => {
        e.preventDefault();
        const requestData = {
            contract_id: selectedItem.contract_id,
            email: selectedEmails.filter(email => email.checked).map(email => email.email),
        };
        axios.post(ASSIGN_CONTRACT, requestData)
            .then(response => {
                navigate("/admin");
                setEventData(prevEventData =>
                    prevEventData.map(item => {
                        if (item.id === selectedItem.id && item.status !== 'assigned') {
                            return { ...item, status: 'assigned' };
                        }
                        return item;
                    })
                );

                const statusToSave = { ...JSON.parse(localStorage.getItem('eventStatus')), [selectedItem.id]: 'assigned' };
                localStorage.setItem('eventStatus', JSON.stringify(statusToSave));
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error sending email:', error);
            });
    };

    const handleAssignClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);

        const emailsArray = item.mails.split(',').map(email => email.trim());
        setSelectedEmails(emailsArray.map(email => ({ email, checked: false })));
    }

    const handleCheckboxChange = (email) => {
        setSelectedEmails(selectedEmails.map(selectedEmail =>
            selectedEmail.email === email ? { ...selectedEmail, checked: !selectedEmail.checked } : selectedEmail
        ));
    };

    return (
        <div>
            <h2 style={{ marginTop: '5%' }}>Event Items</h2>
            <Link to="/admin" className="back-button">
                <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'green' }} />
            </Link>
            {isLoading ? (
                <p>Loading...</p>
            ) : eventData.length > 0 ? (
                <div>
                <table style={{ margin: '25px', paddingLeft: '10px',width:'90%',marginLeft:'5%' }}>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Contract ID</th>
                            <th>Event ID</th>
                            <th>Emails</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.category}</td>
                                <td>{item.contract_id}</td>
                                <td>{item.event_id}</td>
                                <td>{item.mails}</td>
                                <td>{item.status}</td>
                                <td><button onClick={() => handleAssignClick(item)}>Assign</button></td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
                <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={eventData.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
            ) : (
                <p className="no-items-message">No items found for the given event ID</p>
            )}

            {showModal && selectedItem && (
                <div className="assign-modal">
                    <div className="assign-modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Assign Items</h2>
                        <p>Contract ID: {selectedItem.contract_id}</p>
                        <h3>Emails:</h3>
                        {selectedEmails.map(({ email, checked }) => (
                            <div key={email}>
                                <input
                                    type="checkbox"
                                    id={email}
                                    checked={checked}
                                    onChange={() => handleCheckboxChange(email)}
                                />
                                <label htmlFor={email}>{email}</label>
                            </div>
                        ))}
                        <button onClick={handleAssignItems} style={{ marginTop: '10%' }}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventItems;
