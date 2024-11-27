import React, { useState } from 'react';
import './registeras.css';
import { useNavigate } from 'react-router-dom';
import Employerregister from './Employerregister';
import Employeeregister from './Register';
import Trainer from './Trainer';
import Volunteer from './Volunteer';

function Registeras() {
  const navigate = useNavigate();
  const [openEmployerModal, setOpenEmployerModal] = useState(false);
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
  const [openTrainerModal, setOpenTrainerModal] = useState(false);
  const [openVolunteerModal, setOpenVolunteerModal] = useState(false);
  

  const handleEmployee = () => {
    navigate('/employeeregister');
    // setOpenEmployeeModal(true)
  };
  const handleTrainer = () => {
    // navigate('/trainer')
    setOpenTrainerModal(true)
  }

  const handleVolunteer = () => {
    // navigate('/volunteer')
    setOpenVolunteerModal(true)
  }

  const handleEmployer = () => {
    setOpenEmployerModal(true); 
  };
  const closeTrainerModal = () => {
    setOpenTrainerModal(false)
  }
  const closeVolunteerModal = () => {
    setOpenVolunteerModal(false)
  }
  const closeEmployerModal = () => {
    setOpenEmployerModal(false); 
  };

  return (
    <div className='containerRegas'>
      <div className='reges'>
        <button type="button" onClick={handleEmployee}>Employee</button>
        <br />
        <button type="button" onClick={handleEmployer}>Employer</button>
        <br/>
        <button type="submit" onClick={handleTrainer}>Trainer</button>
        <br/>
        <button type="submit" onClick={handleVolunteer}>Volunteer</button>
      </div>
      {/* <Employeeregister open={openEmployeeModal} onClose={closeEmployerModal}/>  */}
      <Employerregister open={openEmployerModal} onClose={closeEmployerModal} />
      <Trainer open={openTrainerModal} onClose={closeTrainerModal}/>
      <Volunteer open={openVolunteerModal} onClose={closeVolunteerModal}/>
    </div>
  );
}

export default Registeras;
