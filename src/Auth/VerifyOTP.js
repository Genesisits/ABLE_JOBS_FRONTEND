import { useState } from 'react';
import React from 'react'
import OtpInput from 'react-otp-input';
import './verifyotp.css'
import { Button } from '@mui/material';


function VerifyOTP() {
    const [otp, setOtp] = useState('');
  return (
    <div className='otpContainer'>
        <div className='card'>
        <h4>Email Verification</h4>
        <p>Please enter the 6 digit OTP send to your email</p>
        <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
    <button type='submit'>Verify</button>
    <Button variant="standard">Resend OTP</Button>
    </div>
    </div>
  )
}

export default VerifyOTP