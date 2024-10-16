import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { REGISTER } from '../endpoints';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import {
    CitySelect,
    CountrySelect,
    StateSelect,
    LanguageSelect,
  } from "react-country-state-city";
  import "react-country-state-city/dist/react-country-state-city.css";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme }) => ({
  color: '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;
  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
};

const steps = ['Basic Details', 'Education', 'Work Experience', 'Skills', 'Special Considerations'];

function Employeeregister() {
  const [userfname, setUserfname] = useState('');
  const [userlname, setUserlname] = useState('');
  const [schoolname, setSchoolname] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState([]);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [useremail, setEmail] = useState("")
  const [usermobile, setMobile] = useState("")

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const navigate = useNavigate();
  const handleOTP = () => {
    // navigate('/verify')
  };

  const Register = () => {
    let payload = {
      first_name: userfname,
      last_name: userlname,
      school_name: schoolname,
    };
    axios.post(`${REGISTER}`, payload)
      .then((response) => {
        // handle success
      })
      .catch((error) => {
        // handle error
      });
  };

  const renderForm = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box style={{display:' flex', flexDirection:'row'}}>
            <input
            type="text"
              placeholder="First Name"
              value={userfname}
              onChange={(e) => setUserfname(e.target.value)}
              fullWidth
              margin="normal"
            />
            <input
            type='text'
              placeholder="Last Name"
              value={userlname}
              onChange={(e) => setUserlname(e.target.value)}
              fullWidth
              margin="normal"
            />
             <input
            type='text'
              placeholder="Email"
              value={useremail}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
             <input
            type='number'
              placeholder="Mobile Number"
              value={usermobile}
              onChange={(e) => setMobile(e.target.value)}
              fullWidth
              margin="normal"
            />
            <CountrySelect
        onChange={(e) => {
          setCountryid(e.id);
        }}
        placeHolder="Select Country"
      />
      <StateSelect
        countryid={countryid}
        onChange={(e) => {
          setstateid(e.id);
        }}
        placeHolder="Select State"
      />
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField
              label="School Name"
              value={schoolname}
              onChange={(e) => setSchoolname(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Paper style={{ margin: '5% 6%' }}>
      <Box sx={{ width: '100%' }}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel StepIconComponent={QontoStepIcon} {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Submit</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            {renderForm()}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Paper>
  );
}

export default Employeeregister;
