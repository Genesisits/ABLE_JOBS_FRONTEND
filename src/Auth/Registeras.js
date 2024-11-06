import React from 'react'
import './registeras.css'
import { useNavigate } from 'react-router-dom'

function Registeras() {
  const navigate = useNavigate()
  const handleEmployer = () => {
    navigate('/employerregister')
  }
  const handleEmployee = () => {
    navigate('/employeeregister')
  }

  const handleTrainer = () => {
    navigate('/trainer')
  }

  return (
    <div className='containerRegas'>
      <div className='reges'>
       <button type="submit" onClick={handleEmployee}>Employee</button>
       <br/>
       <button type="submit" onClick={handleEmployer}>Employer</button>
       <br/>
       <button type="submit" onClick={handleTrainer}>Trainer</button>
       </div>
    </div>
  )
}

export default Registeras