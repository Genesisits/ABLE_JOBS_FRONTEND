import React from 'react';
import { Link} from 'react-router-dom';
import { Button } from '@mui/material';
import './email.css';


function Email() {
    return(
        <div className='email_container'>
            <h3 style={{color:'black'}}>you have been successfully activated your account.</h3>
            <Link to="/login">
            <Button style={{backgroundColor:'#007bff',color:'white'}}>Click Here To Login</Button>
            </Link>
        </div>
    )
}
export default Email;
