import React, { useState } from 'react';
import './login.css';
import mail from '../images/artboard2.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN } from '../endpoints';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [unauthorized, setUnauthorized] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const validateUsername = (username) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(username);
    };

    const handleUname = (e) => {
        setUsername(e.target.value);
        setErrorMessage('');
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setErrorMessage('');
    };

    const handleSubmit = () => {
        setLoading(true);  // Show the loading spinner
        if (username === "" && password === "") {
            setErrorMessage('Enter both username and password');
        } else if (username === "") {
            setErrorMessage('Enter a username');
        } else if (password === "") {
            setErrorMessage('Enter a password');
        } else if (!validateUsername(username)) {
            setErrorMessage('Enter a valid email');
        } else {
            const payload = { email: username, password };
    
            axios.post(`${LOGIN}`, payload)
                .then(response => {
                    const { user_role } = response.data.user;
    
                    // Clear all role flags to avoid conflict
                    localStorage.removeItem('is_employee');
                    localStorage.removeItem('is_employer');
                    localStorage.removeItem('is_admin');
    
                    // Set specific role and navigate to the appropriate page
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);
    
                    if (user_role === 'Employer') {
                        localStorage.setItem('is_employer', 'true');
                        navigate("/jobs");
                    } else if (user_role === 'Employee') {
                        localStorage.setItem('is_employee', 'true');
                        navigate("/findajob");
                    } else if (user_role === 'Admin') {
                        localStorage.setItem('is_admin', 'true');
                        navigate("/dashboard");
                    } else {
                        // Handle unexpected roles if needed
                        console.warn('Unknown job role:', user_role);
                        setErrorMessage('Invalid user role');
                    }
                })
                .catch(error => {
                    console.error(error.response?.data);
                    setUnauthorized(true);
                    setErrorMessage('Invalid credentials');
                })
                .finally(() => {
                    setLoading(false); // Hide the spinner once the request is complete
                });
        }
    };

    return (
        <div className='container-login'>
            {/* Full page loading spinner */}
            {loading && (
                <div className="full-page-spinner">
                    <CircularProgress color="primary" size={50} />
                </div>
            )}

            <div className='flex-item-login'>
                <h3>Able Jobs</h3>
                <input
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={handleUname}
                />
                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={handlePassword}
                        className="password-input"
                    />
                    <span className="eye-icon" onClick={togglePasswordVisibility} role="button" tabIndex={0}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button type='button' onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <p><Link to='/forgetpassword'>Forget password?</Link></p>
            </div>
            <div className='flex-item-login'>
                <img src={mail} alt="Mail" className='imageDetails' />
            </div>
        </div>
    );
}

export default Login;
