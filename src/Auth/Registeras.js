import React, { useState } from 'react';
import './registeras.css';
import { useNavigate } from 'react-router-dom';
import Employerregister from './Employerregister';

function Registeras() {
  const navigate = useNavigate();
  const [openEmployerModal, setOpenEmployerModal] = useState(false);

  const handleEmployee = () => {
    navigate('/employeeregister');
  };

  const handleEmployer = () => {
    setOpenEmployerModal(true); // Open Employer Modal
  };

  const closeEmployerModal = () => {
    setOpenEmployerModal(false); // Close Employer Modal
  };

  return (
    <div className='containerRegas'>
      <div className='reges'>
        <button type="button" onClick={handleEmployee}>Employee</button>
        <br />
        <button type="button" onClick={handleEmployer}>Employer</button>
      </div>
      <Employerregister open={openEmployerModal} onClose={closeEmployerModal} />
    </div>
  );
}

export default Registeras;
