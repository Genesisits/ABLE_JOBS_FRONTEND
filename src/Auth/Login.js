import React, { useState } from 'react';
import './login.css';
import mail from '../images/artboard2.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN } from '../endpoints';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
        
        if(username ==="" && password === "" ){
            setErrorMessage('Enter a both username and password')   
        }
        else if(username === "") {
            setErrorMessage('Enter a username')
        }
        else if(password === "") {
            setErrorMessage('Enter a password')
            
        }
        else if(validateUsername(username) === false) {
            setErrorMessage('Enter a valid email')
        }
        
        else {
            
        setLoading(true);
        const payload = { email: username, password };
        
        axios.post(`${LOGIN}`, payload)
            .then(response => {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                localStorage.setItem('is_employer', response.data.user['job_role']);
                
                if (response.data.user['job_role'] === 'Employer') {
                    navigate("/jobs")
                } else {
                    navigate("/dashboard");
                }
            })
            .catch(error => {
                console.error(error.response?.data);
                setUnauthorized(true);
                setErrorMessage('Invalid credentials')
                
            })
            .finally(() => {
                setLoading(false);
            });
        }
    };

    return (
        <div className='container'>
            <div className='flex-item'>
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
                onChange={(e) => setPassword(e.target.value)}
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
                {/* {unauthorized  && <p style={{ color: 'red' }}>Invalid credentials</p>} */}
                <p><Link to='/forgetpassword'>Forget password?</Link></p>
            </div>
            <div className='flex-item'>
                <img src={mail} alt="Mail" className='imageDetails'/>
            </div>
            
        </div>
    );
}

export default Login;
