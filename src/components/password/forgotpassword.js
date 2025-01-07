import React, { useState } from 'react';
import { FORGOT_PASSWORD } from '../../endpoints.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './password.css';
import * as yup from 'yup';
// import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
    const [femail, setFemail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
    });

    const handleEmailChange = (e) => {
        setFemail(e.target.value);
        
        setError('');
    }

    const handleEmailSubmit = async (e) => {
      e.preventDefault();
      try {
          await schema.validate({ email: femail });
          setError('');
          toast.success('Please Check Your email for OTP', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 100000,
        });
              axios.post(FORGOT_PASSWORD, { email: femail })
                  .then(response => {
                      if (response.status === 200) {
                          console.log(response);
                          sessionStorage.setItem("email", femail);
                         
                          navigate("/resetpassword"); // Move inside the success block
                      }
                  })
                  .catch(error => {
                      console.error('Error fetching email:', error);
                  });
          
      } catch (validationError) {
          setError(validationError.errors[0]);
      }
  }
  
    return (
        <div>
            <form className='forgot_password_form' onSubmit={handleEmailSubmit}>
                <label className='forgot_password_label' htmlFor="email">Enter Your Email*</label>
                <input className='forgot_password_input' placeholder="Enter Your Email" type="text1" id="email" name="email" value={femail} onChange={handleEmailChange} />
                {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
                <div>
                <button className='forgot_password_button' type="submit">Submit</button>
                </div>
            </form>
            {/* <ToastContainer position="middle" /> */}
        </div>
    )
}
