import React, { useState } from "react";
import { RESET_PASSWORD } from '../../endpoints.js';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import './password.css';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = yup.object().shape({
    otp: yup.string()
        .required("OTP is required")
        .matches(/^\d{6}$/, 'OTP must be a 6-digit number'),
    new_password: yup.string().required("New Password is required"),
    confirm_password: yup.string()
        .required("Confirm Password is required")
        .oneOf([yup.ref('new_password'), null], 'Passwords must match')
});

export default function ResetPassword() {
    const [resetData, setResetData] = useState({
        otp: '',
        new_password: '',
        confirm_password: ''
    });
    // const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleResetChange = (e) => {
        const { name, value } = e.target;
        setResetData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleOtpChange = (e) => {
        const { value } = e.target;
        // Only allow numeric input for OTP
        const numericValue = value.replace(/\D/g, '');
        setResetData(prevData => ({
            ...prevData,
            otp: numericValue.slice(0, 6) // Limit to 6 characters
        }));
    }

    const handleResetEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(resetData, { abortEarly: false });
            const response = await axios.post(RESET_PASSWORD, { ...resetData });
            if (response.status === 200) {
                // setSuccess(true);
                
                toast.success('Password reset successful!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                  });
                setTimeout(() => {
                    navigate("/login");
                }, 5000); // Redirect after 3 seconds
            }
        } catch (error) {
            const validationErrors = {};
            if (error.response && error.response.status === 400) {
                const errorData = error.response.data;
                if (errorData && errorData.error === "InvalidOTP") {
                    toast.error("Invalid OTP. Please try again.");
                } else {
                    error.inner.forEach(e => {
                        validationErrors[e.path] = e.message;
                    });
                }
            } else {
                error.inner.forEach(e => {
                    validationErrors[e.path] = e.message;
                });
            }
            setErrors(validationErrors);
        }
    }

    return (
        <div className="reset-password-container">
            <ToastContainer />
            <form className='rest_password_form' onSubmit={handleResetEmailSubmit}>
                <label className='reset_password_label1' htmlFor="otp">Enter Your OTP*</label>
                <input className='reset_password_input1' placeholder="Enter Your OTP" type="text1" id="otp" name="otp" value={resetData.otp} onChange={handleOtpChange} maxLength={6} />
                {errors.otp && <div className="error-message">{errors.otp}</div>}
                <label className='reset_password_label2' htmlFor="new_password">Enter Your Password*</label>
                <input className='reset_password_input2' placeholder="Enter Your Password" type="password" id="new_password" name="new_password" onChange={handleResetChange} />
                {errors.new_password && <div className="error-message">{errors.new_password}</div>}
                <label className='reset_password_label3' htmlFor="confirm_password">Confirm Your Password*</label>
                <input className='reset_password_input3' placeholder="Confirm Your Password" type="password" id="confirm_password" name="confirm_password" onChange={handleResetChange} />
                {errors.confirm_password && <div className="error-message">{errors.confirm_password}</div>}
                <div>
                    <button className='reset_password_button' type="submit">Submit</button>
                </div>
            </form>
            {/* {success && <div className="success-popup">Password reset successful!</div>} */}
        </div>
    )
}
