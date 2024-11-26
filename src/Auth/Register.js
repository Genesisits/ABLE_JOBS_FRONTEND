import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { List, ListItem, Chip, Checkbox } from "@mui/material";
import { Add, Label } from "@mui/icons-material";
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

const allstates = [
  {
    state_id: "1",
    state_name: "Andaman and Nicobar Islands",
    country_id: "101",
  },
  { state_id: "2", state_name: "Andhra Pradesh", country_id: "101" },
  { state_id: "3", state_name: "Arunachal Pradesh", country_id: "101" },
  { state_id: "4", state_name: "Assam", country_id: "101" },
  { state_id: "5", state_name: "Bihar", country_id: "101" },
  { state_id: "6", state_name: "Chandigarh", country_id: "101" },
  { state_id: "7", state_name: "Chhattisgarh", country_id: "101" },
  { state_id: "8", state_name: "Dadra and Nagar Haveli", country_id: "101" },
  { state_id: "9", state_name: "Daman and Diu", country_id: "101" },
  { state_id: "10", state_name: "Delhi", country_id: "101" },
  { state_id: "11", state_name: "Goa", country_id: "101" },
  { state_id: "12", state_name: "Gujarat", country_id: "101" },
  { state_id: "13", state_name: "Haryana", country_id: "101" },
  { state_id: "14", state_name: "Himachal Pradesh", country_id: "101" },
  { state_id: "15", state_name: "Jammu and Kashmir", country_id: "101" },
  { state_id: "16", state_name: "Jharkhand", country_id: "101" },
  { state_id: "17", state_name: "Karnataka", country_id: "101" },
  { state_id: "18", state_name: "Kenmore", country_id: "101" },
  { state_id: "19", state_name: "Kerala", country_id: "101" },
  { state_id: "20", state_name: "Lakshadweep", country_id: "101" },
  { state_id: "21", state_name: "Madhya Pradesh", country_id: "101" },
  { state_id: "22", state_name: "Maharashtra", country_id: "101" },
  { state_id: "23", state_name: "Manipur", country_id: "101" },
  { state_id: "24", state_name: "Meghalaya", country_id: "101" },
  { state_id: "25", state_name: "Mizoram", country_id: "101" },
  { state_id: "26", state_name: "Nagaland", country_id: "101" },
  { state_id: "27", state_name: "Narora", country_id: "101" },
  { state_id: "28", state_name: "Natwar", country_id: "101" },
  { state_id: "29", state_name: "Odisha", country_id: "101" },
  { state_id: "30", state_name: "Paschim Medinipur", country_id: "101" },
  { state_id: "31", state_name: "Pondicherry", country_id: "101" },
  { state_id: "32", state_name: "Punjab", country_id: "101" },
  { state_id: "33", state_name: "Rajasthan", country_id: "101" },
  { state_id: "34", state_name: "Sikkim", country_id: "101" },
  { state_id: "35", state_name: "Tamil Nadu", country_id: "101" },
  { state_id: "36", state_name: "Telangana", country_id: "101" },
  { state_id: "37", state_name: "Tripura", country_id: "101" },
  { state_id: "38", state_name: "Uttar Pradesh", country_id: "101" },
  { state_id: "39", state_name: "Uttarakhand", country_id: "101" },
  { state_id: "40", state_name: "Vaishali", country_id: "101" },
  { state_id: "41", state_name: "West Bengal", country_id: "101" },
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
  const [confirmation, setConfirm] = useState(false);
  const [confirmError, setConfirmError] = useState('');
  const [userlname, setUserlname] = useState("");
  const [filename, setFilename] = useState([]);
  const [companyname, setCompanyname] = useState("");
  const [schoolname, setSchoolname] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("")
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
  const [type, setType] = useState("");
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
  const [educations,setEducations] = useState([
    {
      degree_level: "SSC",
      schoolname: "",
      percentage: "",
      specialization: "",
    },
    {
      degree_level: "Intermediate",
      schoolname: "",
      percentage: "",
      specialization: "",
    },
    {
      degree_level: "B.Tech/BE/Degree",
      schoolname: "",
      percentage: "",
      specialization: "",
    },
    {
      degree_level: "M.Tech/PG",
      schoolname: "",
      percentage: "",
      specialization: "",
    },
  ])
 

  const handleSkillAdd = (newSkill) => {
    if (newSkill && !selectedSkills.includes(newSkill)) {
      setSelectedSkills([...selectedSkills, newSkill]);
      // console.log(selectedSkills.toString())
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
      educations : educations,
      projects: [],
      // job_experiences: selectedOption,
      job_experiences:
        selectedOption === "Experienced"
          ? experienceList.map((exp) => ({
              job_title: exp.jobTitle,
              company_name: exp.companyname,
              location: exp.location,
              start_date: exp.startDate.toISOString().split("T")[0],
              end_date: exp.endDate.toISOString().split("T")[0],
              employment_type: exp.employmentType,
            }))
          : [],
      first_name: userfname,
      last_name: userlname,
      email: useremail,
      password: userpassword,
      mobile_number: usermobile,
      country: 'India',
      state: state,
      address: useraddress,
      skills: selectedSkills.toString(),
      workAvailability: type,
      disabilityType: disability,
      disabilityPercentage: disabilitypercentage,
      willingToRelocate,
      // disabilityCertificate: file,
      knownLanguages: languages_known,
    };

    console.log(payload);
    axios
      .post(`${REGISTER}`, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json', // Make sure it's application/json
        },
      })
      .then((response) => {
        setConfirm(true);
        setConfirmError('')
        setConfirmMessage("User Successfully Created")
      })
      .catch((error) => {
        setConfirm(false)
        // setConfirmerror(true);
        if (error.response) {
          // Handle HTTP status codes (e.g., 400, 401, 500)
          switch (error.response.status) {
            case 400:
              setConfirmError('Bad Request: Please check the data you submitted.');
              break;
            case 401:
              setConfirmError('Unauthorized: Please log in and try again.');
              break;
            case 404:
              setConfirmError('Not Found: The requested resource could not be found.');
              break;
            case 500:
              setConfirmError('Internal Server Error: Something went wrong on the server.');
              break;
            default:
              setConfirmError(`Error: Something went wrong. Status code: ${error.response.status}`);
          }
        }
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
  const handleEducationChange = (index, field, value) => {
    const updatedEducations = [...educations]; // Create a copy of the educations array
    updatedEducations[index][field] = value; // Update the specific field in the object at the given index
    setEducations(updatedEducations); // Set the updated array to the state
  };

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
          <Box style={{ margin: "0% 15% ",gap:'5px'}}>
            <Grid container spacing={1} style={{marginLeft:"3%"}}>
              {/* First name and Last name */}
              <Grid item xs={6}>
                <TextField
                  label="First name"
                  value={userfname}
                  onChange={(e) => setUserfname(e.target.value)}
                  fullWidth
                  className="custom-input"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "transparent" },
                      "&:hover fieldset": { borderColor: "transparent" },
                      "&.Mui-focused fieldset": { borderColor: "transparent" },
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
                  className="custom-input"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "transparent" },
                      "&:hover fieldset": { borderColor: "transparent" },
                      "&.Mui-focused fieldset": { borderColor: "transparent" },
                    },
                  }}
                />
              </Grid>
              {/* Email and Password */}
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  value={useremail}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  className="custom-input"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "transparent" },
                      "&:hover fieldset": { borderColor: "transparent" },
                      "&.Mui-focused fieldset": { borderColor: "transparent" },
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
                  className="custom-input"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "transparent" },
                      "&:hover fieldset": { borderColor: "transparent" },
                      "&.Mui-focused fieldset": { borderColor: "transparent" },
                    },
                  }}
                />
              </Grid>
        
              {/* Mobile Number */}
              <Grid item xs={6}>
                <TextField
                  label="Mobile Number"
                  value={usermobile}
                  onChange={(e) => setMobile(e.target.value)}
                  fullWidth
                  className="custom-input"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "transparent" },
                      "&:hover fieldset": { borderColor: "transparent" },
                      "&.Mui-focused fieldset": { borderColor: "transparent" },
                    },
                  }}
                />
              </Grid>
        
              {/* Country and State Dropdowns */}
              <Grid item xs={6}>
                <Box
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "space-between",
                  }}
                >
                <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                     >
                      <option>Select State</option>
                      {allstates.map((states) => (
                        <option key={states.id} value={states.state_name}>
                          {states.state_name}
                        </option>
                      ))}
                    </select>
                </Box>
              </Grid>
        
              {/* Address */}
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  value={useraddress}
                  onChange={(e) => setAddress(e.target.value)}
                  // fullWidth
                  margin="dense"
                  multiline
                  rows={4}
                  style={{width:"90%",marginLeft:"-10%"}}
                />
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
        
        
        );
      case 1:
        return (
          <div className="education">
          <Box style={{ margin: "0% 2%" }}>
            {/* Map through the educations data and create dynamic static fields */}
            {educations.map((education, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={3}>
                  <input
                    type="text"
                    placeholder="Education Level"
                    value={education.degree_level}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <input
                    type="text"
                    placeholder="School/College Name"
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
                <Grid item xs={3}>
                  <input
                    type="text"
                    placeholder="Percentage"
                    value={education.percentage}
                    fullWidth
                    onChange={(e) =>
                        handleEducationChange(
                          index,
                          "percentage",
                          e.target.value
                        )
                      }
                  />
                </Grid>
                <Grid item xs={3}>
                  <input
                    type="text"
                    placeholder="Specialization"
                    disabled={education.level === "SSC"} 
                    value={education.specialization}
                    fullWidth
                     onChange={(e) =>
                          handleEducationChange(
                            index,
                            "specialization",
                            e.target.value
                          )
                        }
                  />
                </Grid>
              </Grid>
            ))}
          </Box>
        </div>
        );
      case 2:
        return (
          <Box style={{ margin: "0% 5%" }}>
            <Grid container spacing={6}>
              <Grid item sx={6}>
                <label>
                  <input
                    type="radio"
                    name="fresher"
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
                <Grid container spacing={0} key={index} direction="row">
                <Grid item xs={2}>
                  <input
                    type="text"
                    value={experience.jobTitle}
                    onChange={(e) =>
                      handleExperienceChange(index, "jobTitle", e.target.value)
                    }
                    placeholder="Job Title"
                  />
                </Grid>
                <Grid item xs={2}>
                  <input
                    type="text"
                    value={experience.companyname}
                    onChange={(e) =>
                      handleExperienceChange(index, "companyname", e.target.value)
                    }
                    placeholder="Company name"
                  />
                </Grid>
                <Grid item xs={2}>
                  <input
                    type="text"
                    value={experience.location}
                    onChange={(e) =>
                      handleExperienceChange(index, "location", e.target.value)
                    }
                    placeholder="Location"
                  />
                </Grid>
                <Grid item xs={2}>
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
                <Grid item xs={2}>
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
                      handleExperienceChange(index, "employmentType", e.target.value)
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
                  <Grid item xs={1}>
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
                onInputChange={(event, newInputValue) =>
                  setInputValue(newInputValue)
                }
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
                      width: "75%",
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

              <Box
                sx={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
              >
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
          <div className="special-considerations">
          <Box style={{ margin: "2% 5%" }}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid container spacing={6}>
              <Grid item xs={4}>
                <input
                  type="text"
                  placeholder="Disability Percentage"
                  value={disabilitypercentage}
                  onChange={(e) => setDisabilitypercentage(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <input
                  type="text"
                  value={languages_known}
                  onChange={(e) => setLanguagesknow(e.target.value)}
                  placeholder="Please enter known languages with comma"
                />
              </Grid>
              <Grid item xs={4}>
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
            </Grid>
            {/* <Grid container spacing={1} style={{ margin: "2%" }}> */}
             
            {/* </Grid> */}
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
          </Box>
          </div>
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
          {confirmMessage && confirmMessage}
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
          <Button onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
    )}
  </Box>
  
    //  </Paper>
  );
}

export default Employeeregister;