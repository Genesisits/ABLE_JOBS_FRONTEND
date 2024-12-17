import React, { useState, useEffect } from "react";
import { VENDER_LIST } from '../endpoints';
import axios from 'axios';
import './venderlist.css'; 
import Pagination from "react-js-pagination";

const VenderList = () => {
  const [vendersData, setVendersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vendersData.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    axios.get(VENDER_LIST)
      .then(response => {
        setVendersData(response.data.vendors);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vendors data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="vender-list-container">
      <h2>Vendors List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(vendersData) && vendersData.length > 0 ? (
        <div>
        <table className="vender-table">
          <thead>
            <tr>
            <th>S.No</th>
              <th>Vender Name</th>
              <th>Code</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
          {currentItems.map((vendor, index) => (
               <tr key={vendor.id}>
               <td>{indexOfFirstItem + index + 1}</td>
                 <td>{vendor.name}</td>
                <td>{vendor.code}</td>
                <td>{vendor.email}</td>
                <td>{vendor.phone}</td>
                <td>{vendor.category}</td>
                
                <td>{vendor.address || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={vendersData.length}
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

export default VenderList;
