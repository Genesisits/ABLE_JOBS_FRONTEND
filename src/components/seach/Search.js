import React, { useState } from 'react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
   
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      
      <input
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '8px',
          width: '250px',
          borderRadius: '4px',
          border: '1px solid #ddd',
        }}
      />

      
      <button
        onClick={handleSearch}
        style={{
          padding: '8px 16px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </div>
  );
}
