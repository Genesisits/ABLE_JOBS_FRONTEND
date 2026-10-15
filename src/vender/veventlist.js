import React, { useState, useEffect, useRef } from "react";
import { VEVENT_LIST } from '../endpoints';
import axios from 'axios';
import './veventlist.css';
import Pagination from "react-js-pagination";

const VeventList = () => {
  const [veventList, setVeventList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiCalled, setApiCalled] = useState(false); 
  const userEmailRef = useRef(sessionStorage.getItem('email')); 
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = veventList ? veventList.slice(indexOfFirstItem, indexOfLastItem) : [];
  
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    const userEmail = userEmailRef.current; // Access userEmail from the ref
    if (userEmail && !apiCalled) { // Check if API has not been called already
      axios.get(VEVENT_LIST, {
        headers: {
          'Email': userEmail
        }
      })
        .then(response => {
          console.log('API Response:', response.data); // Log API response
          setVeventList(response.data.events); 
          setLoading(false);
          setApiCalled(true); // Set the flag to true after the API call
        })
        .catch(error => {
          console.error('Error fetching vevent list:', error);
          setLoading(false);
        });
    }
  }, [apiCalled]); // Depend on apiCalled state to prevent multiple API calls

  useEffect(() => {
    console.log('Vevent List:', veventList); // Log veventList for debugging
  }, [veventList]);

  return (
    <div className="vevent-list-container">
      <h2>Vendor Events List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : veventList && veventList.length > 0 ? (
        <div>
          <table className="vevent-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Vendor Name</th>
                <th>Code</th>
                <th>Date</th>
                <th>Event Type</th>
                <th>Location</th>
                {/* <th>Category</th> */}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((vevent, index) => (
                <tr key={vevent.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{vevent.name}</td>
                  <td>{vevent.code}</td>
                  <td>{vevent.date}</td>
                  <td>{vevent.event_type}</td>
                  <td>{vevent.location}</td>
                  {/* <td>{vevent.category}</td> */}
                  <td>{vevent.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={veventList.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default VeventList;
