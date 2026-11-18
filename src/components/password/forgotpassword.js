import React, { useState } from 'react';
import { FORGOT_PASSWORD } from '../../endpoints.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './password.css';
import * as yup from 'yup';
import { notify } from '../notify/Notify';

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
              axios.post(FORGOT_PASSWORD, { email: femail })
                  .then(response => {
                      if (response.status === 200) {
                          console.log(response);
                          notify.success('Please check your email for the OTP.');
                          sessionStorage.setItem("email", femail);
                         
                          navigate("/resetpassword"); // Move inside the success block
                      }
                  })
                  .catch(error => {
                      console.error('Error fetching email:', error);
                      notify.error('We could not send the OTP. Please check your email address and try again.');
                  });
          
      } catch (validationError) {
          setError(validationError.errors[0]);
      }
  }
  
    return (
        <div>
            <form className='forgot_password_form' onSubmit={handleEmailSubmit}>
                <label className='forgot_password_label' htmlFor="email">Enter Your Email*</label>
                <input className='forgot_password_input' placeholder="Enter Your Email" type="email" id="email" aria-invalid={!!error} name="email" value={femail} onChange={handleEmailChange} />
                {error && <p className="form-field-error" role="alert">{error}</p>}
                <div>
                <button className='forgot_password_button' type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
