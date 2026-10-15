import React, { useState, useEffect } from "react";
import { VEVENT_HISTORY } from '../endpoints';
import axios from 'axios';
import './veventhistory.css';
import Pagination from "react-js-pagination";

const VeventHistory = () => {
  const [veventData, setVeventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = veventData ? veventData.slice(indexOfFirstItem, indexOfLastItem) : [];
  
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const userEmail = sessionStorage.getItem('email');
  
  useEffect(() => {
    if (userEmail) { // Ensuring userEmail exists before making the request
      axios.get(VEVENT_HISTORY,{
        headers: {
          'Email': userEmail
        }
      })
        .then(response => {
          setVeventData(response.data.events);
          setLoading(false);
          console.log(response.data.events)
        })
        .catch(error => {
          console.error('Error fetching vendors data:', error);
          setLoading(false);
        });
    }
  }, [userEmail]); // Add userEmail to the dependency array
  
  return (
    <div className="devent-list-container">
      <h2>Vendors Event History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(veventData) && veventData.length > 0 ? (
        <div>
        <table className="devent-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vendor Name</th>
              <th>Code</th>
              <th>Date</th>
              {/* <th>Email</th> */}
              <th>Locatin</th>
              {/* <th>Activation Status</th> */}
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
                {/* <td>{vevent.emails}</td> */}
                <td>{vevent.location}</td>
                {/* <td>{vevent.category}</td> */}
                {/* <td>{vendor.activation_status ? 'Active' : 'Inactive'}</td> */}
                <td>{vevent.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={veventData.length}
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

export default VeventHistory;
