import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { List, ListItem, Chip, Checkbox } from "@mui/material";
import { Add } from "@mui/icons-material";
import { REGISTER } from "../endpoints";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Check from "@mui/icons-material/Check";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import FormLabel from "@mui/material/FormLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CountryDropdown,
  StateDropdown,
  CityDropdown,
  LanguagesDropdown,
  PhoneInput,
} from "react-country-state-dropdown";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material";
import { Padding, Password } from "@mui/icons-material";
import { ThemeConsume } from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Select } from "@mui/material";
import { blue } from "@mui/material/colors";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme }) => ({
  color: "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
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

const steps = [
  "Basic Details",
  "Education",
  "Work Experience",
  "Skills",
  "Special Considerations",
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Employeeregister() {
  const skillOptions = [
    "React",
    "HTML",
    "CSS",
    "JavaScript",
    ".NET",
    "Java",
    "Python",
    "Angular",
    "Vue.js",
    "Ruby",
    "PHP",
    "C++",
    "C#",
    "Node.js",
  ];
  const [userfname, setUserfname] = useState("");
  const [userlname, setUserlname] = useState("");
  const [filename, setFilename] = useState([]);
  const [companyname, setCompanyname] = useState("");
  const [schoolname, setSchoolname] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [country, setCountry] = useState(null);
  const [employmentType, setEmploymentType] = useState(0);
  const [endDate, setEndDate] = useState("");
  const [state, setState] = useState(null);
  const [languages_known, setLanguagesknow] = useState("");
  const [useremail, setEmail] = useState("");
  const [usermobile, setMobile] = useState("");
  const [useraddress, setAddress] = useState("");
  const [education1, setEducation1] = useState("");
  const [education2, setEducation2] = useState("");
  const [education3, setEducation3] = useState("");
  const [education4, setEducation4] = useState("");
  const [userpassword, setPassword] = useState("");
  const [type, setType] = React.useState("");
  const [location, setLocation] = useState("");
  const [schoolpercentage, setSchoolpercentage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [intercollege, setIntercollege] = useState("");
  const [interpercentage, setInterpercentage] = useState("");
  const [graduationcollege, setGraduationcollege] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [selectedValue, setSelectedValue] = React.useState("Fresher");
  const [selectedOption, setSelectedOption] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSkills, setFilteredSkills] = useState(skillOptions);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [additionalSkills, setAdditionalSkills] = useState("");
  const [disabilitypercentage, setDisabilitypercentage] = useState("");
  const [disability, setDisability] = useState("");
  const [file, setFile] = useState(null);
  const [willingToRelocate, setWillingToRelocate] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    mobile: '',
    address: '',
    country: '',
    state: '',
    
    
  });


  const validate = () => {
    let valid = true;
    const newErrors = { userfname: '', userlname: '', useremail: '', userpassword: '', usermobile: '', useraddress: '',country: '', state: '', };

    if (!userfname) {
      newErrors.fname = 'First name is required';
      valid = false;
    }
    

    if (!userlname) {
      newErrors.lname = 'Last name is required';
      valid = false;
    }
    if (!useremail) {
      newErrors.email = 'Email is required';
      valid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (useremail && !emailPattern.test(useremail)) {
      newErrors.email = 'Valid email is required';
      valid = false;
    }
  
    if (!userpassword) {
      newErrors.password = 'Password is required';
      valid = false;
    }
    
    
    if (!useraddress) {
      newErrors.address = 'Address is required';
      valid = false;
    }


    if (!userpassword) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (userpassword.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    

    const mobilePattern = /^\d{10}$/; // Example for a 10-digit mobile number
    if (!usermobile || !mobilePattern.test(usermobile)) {
      newErrors.mobile = 'Valid mobile number is required';
      valid = false;
    }
    if (!country) {
      newErrors.country = 'Please select a country';
      valid = false;
    }
  
    // State validation
    if (!state) {
      newErrors.state = 'Please select a state';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  

  const handleSkillAdd = (newSkill) => {
    if (newSkill && !selectedSkills.includes(newSkill)) {
      setSelectedSkills([...selectedSkills, newSkill]);
    }
  };

  const disabilities = [
    { id: "1", name: "Blindness", abbreviation: "Blindness" },
    { id: "2", name: "Low vision", abbreviation: "Low vision" },
    {
      id: "3",
      name: "Leprosoy cured persons",
      abbreviation: "Leprosoy cured persons",
    },
    {
      id: "4",
      name: "Locomotor Disability",
      abbreviation: "Locomotor Disability",
    },
    {
      id: "5",
      name: "Intellectual Disability",
      abbreviation: "Intellectual Disability",
    },
    { id: "6", name: "Cerebral Palsy", abbreviation: "Cerebral Palsy" },
    {
      id: "7",
      name: "Specific Learning Disabilities",
      abbreviation: "Specific Learning Disabilities",
    },
    { id: "8", name: "Mental Illness", abbreviation: "Mental Illness" },
    { id: "9", name: "Cerebral Palsy", abbreviation: "Cerebral Palsy" },
    {
      id: "10",
      name: "Specific Learning Disabilities",
      abbreviation: "Specific Learning Disabilities",
    },
    {
      id: "11",
      name: "Speech and Language disability",
      abbreviation: "Speech and Language disability",
    },
    {
      id: "12",
      name: "Hearing Impairment(Deaf and Hard of Hearing)",
      abbreviation: "Hearing Impairment(Deaf and Hard of Hearing)",
    },
    {
      id: "12",
      name: "Muscular Dystrophy",
      abbreviation: "Muscular Dystrophy",
    },
    { id: "13", name: "Dwarfism", abbreviation: "Dwarfism" },
    {
      id: "14",
      name: "Acid Attack Victim",
      abbreviation: "Acid Attack Victim",
    },
    { id: "15", name: "Parkinson disease", abbreviation: "Parkinson disease" },
    {
      id: "16",
      name: "Multiple Sclerosis",
      abbreviation: "Multiple Sclerosis",
    },
    { id: "17", name: "Thalassemia", abbreviation: "Thalassemia" },
    { id: "18", name: "Hemophilia", abbreviation: "Hemophilia" },
    {
      id: "19",
      name: "Sickle Cell disease",
      abbreviation: "Sickle Cell disease",
    },
    {
      id: "20",
      name: "Autism Spectrum Disorder",
      abbreviation: "Autism Spectrum Disorder",
    },
    {
      id: "21",
      name: "Chronic Neurological conditions",
      abbreviation: "Chronic Neurological conditions",
    },
    {
      id: "22",
      name: "Multiple Disabililties including Deaf, Blindess",
      abbreviation: "Multiple Disabililties including Deaf, Blindess",
    },
    { id: "23", name: "Down Syndrome", abbreviation: "Down Syndrome" },
    { id: "24", name: "Epilepsy", abbreviation: "Epilepsy" },
    {
      id: "25",
      name: "Spinal Cord Injury",
      abbreviation: "Spinal Cord Injury",
    },
    { id: "26", name: "Others", abbreviation: "Others" },
  ];



  // Handle input change in the search bar
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter skills based on the search term
    const filtered = skillOptions.filter((skill) =>
      skill.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSkills(filtered);
  };

  // Handle selecting a skill from the suggestions
  const handleSkillSelect = (skill) => {
    // Avoid duplicates
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    // Clear the search term after selection
    setSearchTerm("");
  };

  // Handle removing a selected skill
  const handleSkillRemove = (skillToRemove) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [educationFields, setEducationFields] = useState([
    {
      schoolname: "",
      schoolpercentage: "",
      specialization: "",
      startDate: null,
      endDate: null,
      educationLevel: "",
    },
  ]);

  const handleFieldChange = (index, field, value) => {
    const newFields = [...educationFields];
    newFields[index][field] = value;
    setEducationFields(newFields);
  };

  // Add a new row of fields
  const addEducationField = () => {
    setEducationFields([
      ...educationFields,
      {
        schoolname: "",
        schoolpercentage: "",
        specialization: "",
        startDate: null,
        endDate: null,
        educationLevel: "",
      },
    ]);
  };

  // Remove a specific row of fields
  const removeEducationField = (indexToRemove) => {
    const newFields = educationFields.filter(
      (_, index) => index !== indexToRemove
    );
    setEducationFields(newFields);
  };

  const educationLevels = [
    "SSC/X",
    "Intermediate/12th",
    "B.Tech/B.E/Degree",
    "M.Tech/Post Graduate",
    "Doctorate/Ph.D",
  ];
  const [educations, setEducations] = useState([
    {
      level: "",
      schoolname: "",
      percentage: "",
      startDate: new Date(),
      endDate: new Date(),
      specialization: "",
    },
  ]);

  const handleAddEducation = () => {
    setEducations([
      ...educations,
      {
        level: "",
        schoolname: "",
        percentage: "",
        startDate: new Date(),
        endDate: new Date(),
        specialization: "",
      },
    ]);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducations = [...educations];
    newEducations[index][field] = value;
    setEducations(newEducations);
  };
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
  const handleSetCountry = (e, value) => setCountry(value);
  const handleSetState = (e, value) => setState(value);

  const handleSubmit = () => {
   const payload = {
    educationDetails: educations.map((education) => ({
      level: education.level,
      schoolname: education.schoolname,
      percentage: education.percentage,
      startDate: education.startDate,
      endDate: education.endDate,
      specialization: education.specialization,
    })),
    experienceType: selectedOption,
      experiences: selectedOption === "Experienced"
        ? experienceList.map((exp) => ({
            jobTitle: exp.jobTitle,
            companyname: exp.companyname,
            location: exp.location,
            startDate: exp.startDate,
            endDate: exp.endDate,
            employmentType: exp.employmentType,
          }))
        : [],
    first_name: userfname,
    last_name: userlname,
    email: useremail,
    password: userpassword,
    mobile_number: usermobile,
    country: country.name,
    state: state.name,
    address: useraddress,
    skills: selectedSkills,
    workAvailability: type,
    disabilityType: disability,
    disabilityPercentage: disabilitypercentage,
    willingToRelocate,
    // disabilityCertificate: file,
    knownLanguages: languages_known.split(',').map(lang => lang.trim()),
    
   }

   console.log(payload)
    axios
      .post(`${REGISTER}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Handle success
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const [experienceList, setExperienceList] = useState([
    {
      jobTitle: "",
      companyname: "",
      location: "",
      startDate: null,
      endDate: null,
      employmentType: "",
    },
  ]);

  const handleExperienceChange = (index, field, value) => {
    const updatedExperienceList = experienceList.map((experience, i) =>
      i === index ? { ...experience, [field]: value } : experience
    );
    setExperienceList(updatedExperienceList);
  };

  const addExperienceFields = () => {
    setExperienceList([
      ...experienceList,
      {
        jobTitle: "",
        companyname: "",
        location: "",
        startDate: null,
        endDate: null,
        employmentType: "",
      },
    ]);
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
    axios
      .post(`${REGISTER}`, payload)
      .then((response) => {
        // handle success
      })
      .catch((error) => {
        // handle error
      });
  };

  const theme = createTheme();
  const renderForm = () => {
    switch (activeStep) {
      case 0:
        return (
          <ThemeProvider theme={theme}>
            <Box style={{ margin: "0% 10%" }}>
              <Grid container spacing={1}>
                {" "}
                {/* Grid container for 3 inputs in a row */}
                <Grid item xs={6}>
                  <TextField
                    label="First name"
                    value={userfname}
                    onChange={(e) => setUserfname(e.target.value)}
                    fullWidth
                    error={!!errors.fname}
                    helperText={errors.fname}

                    // margin="dense"
                    className="custom-input"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "transparent",
                        },
                        "&:hover fieldset": {
                          borderColor: "transparent",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Last name"
                    value={userlname}
                    onChange={(e) => setUserlname(e.target.value)}
                    fullWidth
                    error={!!errors.lname}
                    helperText={errors.lname}

                    // margin="dense"
                    className="custom-input"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "transparent",
                        },
                        "&:hover fieldset": {
                          borderColor: "transparent",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    value={useremail}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    error={!!errors.useremil}
                    helperText={errors.useremail}

                    // margin="dense"
                    className="custom-input"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "transparent",
                        },
                        "&:hover fieldset": {
                          borderColor: "transparent",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Password"
                    value={userpassword}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    error={!!errors.userpassword}
                    helperText={errors.userpassword}

                    // margin="dense"
                    className="custom-input"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "transparent",
                        },
                        "&:hover fieldset": {
                          borderColor: "transparent",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Mobile Number"
                    value={usermobile}
                    onChange={(e) => setMobile(e.target.value)}
                    fullWidth
                    error={!!errors.usermobile}
                    helperText={errors.usermobile}

                    // margin="dense"
                    className="custom-input"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "transparent",
                        },
                        "&:hover fieldset": {
                          borderColor: "transparent",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: "20px",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <span>
                      <CountryDropdown
                        clearable
                        searchable
                        value={country}
                        onChange={handleSetCountry}
                        style={{color:'black',width:'240px',marginRight:'10px'}}
                      />
                       {errors.country && <span style={{ color: 'red' }}>{errors.country}</span>}

                    </span>
                    <span>
                      <StateDropdown
                        clearable
                        searchable
                        country={country}
                        value={state}
                        onChange={handleSetState}
                        style={{color:'black',width:'240px'}}
                      />
                       {errors.state && <span style={{ color: 'red' }}>{errors.state}</span>}

                    </span>
                  </div>
                </Grid>
              </Grid>
              <Grid>
                <TextField
                  label="Address"
                  value={useraddress}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  margin="dense"
                  multiline
                  rows={4} // Specifies 4 rows
                  error={!!errors.useraddress}
                  helperText={errors.useraddress}

                />
              </Grid>
            </Box>
          </ThemeProvider>
        );
      case 1:
        return (
          <div className="education">
            <Box style={{ margin: "0% 2%" }}>
              {educations.map((education, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={2}>
                    <Select
                      value={education.level}
                      onChange={(e) =>
                        handleEducationChange(index, "level", e.target.value)
                      }
                      displayEmpty
                      fullWidth
                      style={{ marginTop: '9px' }}
                    >
                      <MenuItem value="" disabled>
                        Select Level
                      </MenuItem>
                      {educationLevels.map((level, i) => (
                        <MenuItem key={i} value={level}>
                          {level}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={2}>
                    <input
                      type="text"
                      placeholder="School Name/College Name"
                      value={education.schoolname}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "schoolname",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <input
                      type="text"
                      placeholder="Percentage"
                      value={education.percentage}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "percentage",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <DatePicker
                      selected={education.startDate}
                      onChange={(date) =>
                        handleEducationChange(index, "startDate", date)
                      }
                      dateFormat="yyyy/MM/dd"
                      placeholderText="Start Date"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <DatePicker
                      selected={education.endDate}
                      onChange={(date) =>
                        handleEducationChange(index, "endDate", date)
                      }
                      dateFormat="yyyy/MM/dd"
                      placeholderText="End Date"
                      fullWidth
                    />
                  </Grid>
                  {education.level !== "SSC/X" && (
                    <Grid item xs={2}>
                      <input
                        type="text"
                        placeholder="Specialization"
                        value={education.specialization}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "specialization",
                            e.target.value
                          )
                        }
                        fullWidth
                      />
                    </Grid>
                  )}
                </Grid>
              ))}
              <div style={{ marginTop: "10px", cursor: "pointer" }}>
                <Add
                  style={{ color: "#1976d2" }}
                  onClick={handleAddEducation}
                />
                <span style={{ marginLeft: "10px" }}>Add more education</span>
              </div>
            </Box>
          </div>
        );
      case 2:
        return (
          <Box style={{ margin: "0% 6%" }}>
            <Grid container spacing={6}>
              <Grid item sx={6}>
                <label>
                  <input
                    type="radio"
                    name="experience"
                    value="Fresher"
                    checked={selectedOption === "Fresher"}
                    onChange={handleRadioChange}
                  />
                  Fresher
                </label>
              </Grid>
              <Grid item sx={6}>
                <label>
                  <input
                    type="radio"
                    name="experience"
                    value="Experienced"
                    checked={selectedOption === "Experienced"}
                    onChange={handleRadioChange}
                  />
                  Experienced
                </label>
              </Grid>
            </Grid>

            {selectedOption === "Experienced" &&
              experienceList.map((experience, index) => (
                <Grid container spacing={4} key={index}>
                  <Grid item xs={2}>
                    <input
                      type="text"
                      value={experience.jobTitle}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "jobTitle",
                          e.target.value
                        )
                      }
                      placeholder="Job Title"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <input
                      type="text"
                      value={experience.companyname}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "companyname",
                          e.target.value
                        )
                      }
                      placeholder="Company name"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <input
                      type="text"
                      value={experience.location}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "location",
                          e.target.value
                        )
                      }
                      placeholder="Location"
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <DatePicker
                      selected={experience.startDate}
                      onChange={(date) =>
                        handleExperienceChange(index, "startDate", date)
                      }
                      dateFormat="yyyy/MM/dd"
                      placeholderText="Start Date"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <DatePicker
                      selected={experience.endDate}
                      onChange={(date) =>
                        handleExperienceChange(index, "endDate", date)
                      }
                      dateFormat="yyyy/MM/dd"
                      placeholderText="End Date"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <select
                      value={experience.employmentType}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "employmentType",
                          e.target.value
                        )
                      }
                      placeholder="Employment Type"
                      style={{ width: "100%" }}
                    >
                      <option value="">Select Employment Type</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </Grid>
                  {index === experienceList.length - 1 && (
                    <Grid item xs={2}>
                      <AddIcon
                        style={{
                          margin: "20px 0px 0px 0px",
                          cursor: "pointer",
                        }}
                        onClick={addExperienceFields}
                      />
                    </Grid>
                  )}
                </Grid>
              ))}
          </Box>
        );
      case 3:
        return (
          <div className="skills">
          <Box sx={{ margin: "20px", width: "100%" }}>
        <Autocomplete
          multiple
          freeSolo
          options={skillOptions}
          value={selectedSkills}
          onChange={(event, newValue) => {
            setSelectedSkills([...new Set(newValue)]);
          }}
          renderTags={() => null}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && inputValue) {
              handleSkillAdd(inputValue);
              setInputValue("");
              event.preventDefault();
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add or Select Skills"
              placeholder="Type and press Enter to add"
              fullWidth
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
              }}
              sx={{
                'width': '75%',
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />
          )}
          sx={{ display: "block", width: "100%" }} 
        />
        
        <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
          {selectedSkills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => handleSkillRemove(skill)}
              sx={{
                backgroundColor: "#4E1B9A",
                color: "white",
                marginRight: "10px",
                marginBottom: "10px",
                "& .MuiChip-deleteIcon": {
                  color: "white",
                },
              }}
            />
          ))}
        </Box>
      </Box>
          </div>
        );
      case 4:
        return (
          <Box style={{ margin: "2% 5%" }}>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">Availability of Work</MenuItem>
                    <MenuItem value="hybrid">Hybrid</MenuItem>
                    <MenuItem value="remote">Remote</MenuItem>
                    <MenuItem value="location-based">Location based</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Select
                    value={disability}
                    F
                    onChange={(e) => setDisability(e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">All Disabilities</MenuItem>
                    {disabilities.map((disabilit) => (
                      <MenuItem
                        key={disabilit.id}
                        value={disabilit.abbreviation}
                      >
                        {disabilit.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <input
                  type="text"
                  placeholder="Disability Percentage"
                  value={disabilitypercentage}
                  onChange={(e) => setDisabilitypercentage(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  required
                  control={
                    <Checkbox
                      hecked={willingToRelocate}
                      onChange={(e) => setWillingToRelocate(e.target.checked)}
                    />
                  }
                  label="Willing to relocate"
                  componentsProps={{
                    typography: { color: "black" },
                  }}
                />
              </Grid>
            </Grid>
            {/* <Grid container spacing={6}>
              <Grid item xs={4}>
                <label>Disability Certificate</label>
                <TextField
                  type="file"
                  onChange={(event) => setFile(event.target.files[0])}
                  fullWidth
                  margin="dense"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className="custom-input"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fff",
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#888",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000",
                      },
                    },
                    '& input[type="file"]': {
                      display: "block",
                      cursor: "pointer",
                    },
                  }}
                />
              </Grid>
            </Grid> */}
            <Grid container spacing={1} style={{ margin: "2%" }}>
                  <Grid item>
                    <input type="text" value={languages_known} onChange={(e) => setLanguagesknow(e.target.value)} placeholder="Please enter known languages with comma"/>
                  </Grid>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    // <Paper>
    <Box sx={{ width: "100%", margin: "5% 0%" }}>
      <Box
        sx={{
          position: "sticky",
          top: "12%",
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel StepIconComponent={QontoStepIcon} {...labelProps}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you're finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleSubmit}>Submit</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {renderForm()}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
    //  </Paper>
  );
}

export default Employeeregister;
