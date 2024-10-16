import React, { useState} from "react";
import { V_OTP } from "../endpoints";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// console.log("text",getUsername);

export default function SignupOtp() {
    const [otp, setOtp] = useState(['', '', '', '','','']); // Array to store OTP digits
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (index, value) => {
    if (isNaN(value) || value === '') {
      return; // Allow only numeric input
    }
    // useEffect(() => {
      // Retrieve email from session storage
      
      // console.log("text", getUsername);
      // Do something with the email if needed
    // }, []); 
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < otp.length - 1 && value !== '') {
      // Move to the next input field automatically
      document.getElementById(`otpInput${index + 1}`).focus();
    }
  };

  const handleVerification = (e) => {
    const data= {
      otp: otp.join(''), 
    };
  
    const email = sessionStorage.getItem("email");
    axios.post(V_OTP+email, data)
    .then(response => {
      if (response.status === 200) {
        sessionStorage.setItem('access_token', data.access_token);
        console.log(response);
        navigate("/vlogin");
        // Handle the successful response as needed
      }
      toast.success('Your Signup is Success Please Login', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000,
      });
    })
    .catch(error => {
      console.error('Error during OTP verification:', error);
      setError('Incorrect OTP. Please try again.');
    });
  };
  
  return (
    <div>
      <h2>Enter OTP</h2>
      <div style={{padding:'5px'}}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            style={{width:'10px',height:'10px',margin:'2px'}}
            id={`otpInput${index}`}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            maxLength="1"
          />
        ))}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleVerification}>Verify OTP</button>
      <ToastContainer />
    </div>
  );
};