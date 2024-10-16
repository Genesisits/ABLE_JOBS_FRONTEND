import React, { useState } from 'react'
import './login.css'
import mail from '../images/artboard2.jpeg';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { LOGIN } from '../endpoints';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
    const [username, setuserName] = useState('')
    const [password, setuserPassword] = useState('')
    const navigate = useNavigate();

    const handleUname = (e) => {
        setuserName(e.target.value)
    }

    const handlePassword = (e) => {
        setuserPassword(e.target.value)
    }
    const handleSubmit = () => {
        let payload = {
            email: username,
            password: password
        }
        axios.post(`${LOGIN}`,payload)
            .then(response => {
                localStorage.setItem('access_token', response.data.access)
                localStorage.setItem('refresh_token', response.data.refresh)
                localStorage.setItem('is_employer', response.data.user['job_role'])
                if(response.data.user['job_role'] === 'Employer') {
                    navigate("/jobs")
                }else {
                    navigate("/dashboard")
                }
            })
            .catch(error => {
               
            });
    }

    return (
    <div className='container'>
        <div className='flex-item'>
            <h3>Able Jobs</h3>
            <input type='text' placeholder='username' value={username} onChange={handleUname}/>
            <input type='password' placeholder='password' value={password} onChange={handlePassword}/>
            <button type='submit' onClick={handleSubmit} >Login</button>
            <p> <a href='/forgetpassword'>Forget password?</a></p>
        </div>
        <div className='flex-item'>
            <img src={mail} className='imageDetails'/>
        </div>
    </div>
  )
}

export default Login