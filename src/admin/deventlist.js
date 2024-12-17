import React, { useState, useEffect } from "react";
import { DEVENT_LIST } from '../endpoints';
import axios from 'axios';
import './deventlist.css'; 
import Pagination from "react-js-pagination";

const DeventList = () => {
  const [deventData, setDeventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = deventData.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    axios.get(DEVENT_LIST)
      .then(response => {
        setDeventData(response.data.events);
        setLoading(false);
        console.log(response.data.events)
      })
      .catch(error => {
        console.error('Error fetching vendors data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="devent-list-container">
      <h2>Events History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(deventData) && deventData.length > 0 ? (
        <div>
        <table className="devent-table">
          <thead>
            <tr>
            <th>S.No</th>
              <th> Name</th>
              <th>Code</th>
              
              <th>location</th>
              
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {currentItems.map((devent, index) => (
               <tr key={devent.id}>
               <td>{indexOfFirstItem + index + 1}</td>
                <td>{devent.name}</td>
                <td>{devent.code}</td>
                
                <td>{devent.location}</td>
                
                <td>{devent.date}</td>
                <td>{devent.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={deventData.length}
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

export default DeventList;
