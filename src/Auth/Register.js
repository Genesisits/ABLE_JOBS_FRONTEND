import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
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
import { CircularProgress } from "@mui/material";
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
  LanguageDropdown,
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
import { ThemeConsumer } from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Select } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

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

function Employeeregister({ open, onClose }) {
  const [isLoading, setisLoading] = useState(false);
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
  const [confirmError, setConfirmError] = useState("");
  const [userlname, setUserlname] = useState("");
  const [filename, setFilename] = useState([]);
  const [companyname, setCompanyname] = useState("");
  const [schoolname, setSchoolname] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
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
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [error, setError] = useState(null);
  const [errorRadio, setErrorRadio] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [educations, setEducations] = useState([
    {
      degree_level: "SSC",
      college: "",
      percentage: "",
      field_of_study: "",
      startDate: "",
      endDate: "",
    },
    {
      degree_level: "Intermediate",
      college: "",
      percentage: "",
      field_of_study: "",
      startDate: "",
      endDate: "",
    },
    {
      degree_level: "B.Tech/BE/Degree",
      college: "",
      percentage: "",
      field_of_study: "",
      startDate: "",
      endDate: "",
    },
    {
      degree_level: "M.Tech/PG",
      college: "",
      percentage: "",
      field_of_study: "",
      startDate: "",
      endDate: "",
    },
    {
      degree_level: "Doctorate",
      college: "",
      percentage: "",
      field_of_study: "",
      startDate: "",
      endDate: "",
    },
  ]);

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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = skillOptions.filter((skill) =>
      skill.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSkills(filtered);
  };

  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }

    setSearchTerm("");
  };

  const handleSkillRemove = (skillToRemove) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    setErrorRadio(false);
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

  const validateForm = () => {
    if (!userfname) {
      setError("First name is required.");
      return false;
    }
    if (!userlname) {
      setError("Last name is required.");
      return false;
    }
    if (!useremail || !/\S+@\S+\.\S+/.test(useremail)) {
      setError("A valid email is required.");
      return false;
    }
    if (!userpassword || userpassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (!usermobile || !/^\d{10}$/.test(usermobile)) {
      setError("A valid 10-digit mobile number is required.");
      return false;
    }
    if (!state || state === "Select State") {
      setError("State selection is required.");
      return false;
    }
    if (!useraddress) {
      setError("Address is required.");
      return false;
    }
    return true;
  };

  const validateEducation = () => {
    for (let i = 0; i < educations.length; i++) {
      const education = educations[i];
      if (!education.college) {
        setError(`School/College Name is required for entry ${i + 1}.`);
        return false;
      }
      if (!education.percentage || isNaN(education.percentage)) {
        setError(`Valid Percentage is required for entry ${i + 1}.`);
        return false;
      }
      if (!education.startDate) {
        setError(`Start Date is required for entry ${i + 1}.`);
        return false;
      }
      if (!education.endDate) {
        setError(`End Date is required for entry ${i + 1}.`);
        return false;
      }
      if (education.startDate >= education.endDate) {
        setError(
          `Start Date must be earlier than End Date for entry ${i + 1}.`
        );
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateForm()) {
      setSnackbarOpen(true);
      return;
    }
    if (activeStep === 1 && !validateEducation()) {
      setSnackbarOpen(true);
      return;
    }
    if (activeStep === 2 && !validateExperienceSection()) {
      return;
    }
    if (activeStep === 2 && !validateExperience()) {
      setSnackbarOpen(true);
      return;
    }
    if (activeStep === 3 && !validateSkills()) {
      setSnackbarOpen(true);
      return;
    }

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
    if (activeStep === 1) {
      const hasValidEntry = educations.some(
        (education) => education.college.trim() !== ""
      );

      if (!hasValidEntry) {
        setError("At least one valid School/College Name is required to skip.");
        setSnackbarOpen(true);
        return;
      }
    }

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
  const handleSubmit = () => {
    if (!validateSpecialConsiderations()) {
      setSnackbarOpen(true);
      return;
    }

    setisLoading(true);
    const payload = {
      educations: educations,
      projects: [],

      job_experiences:
        selectedOption === "Experienced"
          ? experienceList.map((exp) => ({
            job_role: exp.jobTitle,
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
      country: "India",
      state: state,
      address: useraddress,
      skills: selectedSkills.toString(),
      availability_of_work: type,
      disability: disability,
      disabilityPercentage: disabilitypercentage,
      willing_to_relocate: willingToRelocate,

      languages_known: languages_known,
    };

    console.log(payload);
    axios
      .post(`${REGISTER}`, JSON.stringify(payload), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setShowPopup(true);
        setPopupMessage(
          `User successfully registered! Please check "${useremail}"!`
        );
        setTimeout(() => {
          setShowPopup(false);
          navigate("/login");
        }, 4000);
      })
      .catch((error) => {
        let errorMessage = "An error occurred. Please try again.";
        if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMessage = "Bad Request: Email already registered.";
              break;
            case 401:
              errorMessage = "Unauthorized: Please log in and try again.";
              break;
            case 404:
              errorMessage =
                "Not Found: The requested resource could not be found.";
              break;
            case 500:
              errorMessage =
                "Internal Server Error: Something went wrong on the server.";
              break;
            default:
              errorMessage = `Error: Something went wrong. Status code: ${error.response.status}`;
          }
        }
        setShowPopup(true);
        setPopupMessage(errorMessage);
      })
      .finally(() => {
        setisLoading(false);
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
    const updatedEducations = [...educations];
    if (field === "startDate" || field === "endDate") {
      value = new Date(value).toISOString().split("T")[0];
    }
    updatedEducations[index][field] = value;
    setEducations(updatedEducations);
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
  const handleOTP = () => { };
  const validateSkills = () => {
    if (selectedSkills.length === 0) {
      setError("Please add at least one skill.");
      return false;
    }
    return true;
  };
  const validateSpecialConsiderations = () => {
    if (!type) {
      setError("Please select an Availability of Work option.");
      return false;
    }

    if (!disability) {
      setError("Please select a disability type.");
      return false;
    }

    if (!languages_known || languages_known.trim() === "") {
      setError("Please specify at least one known language.");
      return false;
    }

    return true;
  };
  const validateExperienceSection = () => {
    if (!selectedOption) {
      setErrorRadio(true);
      return false;
    }
    return true;
  };

  const validateExperience = () => {
    if (selectedOption === "Experienced") {
      for (const experience of experienceList) {
        if (
          !experience.jobTitle ||
          !experience.companyname ||
          !experience.location ||
          !experience.startDate ||
          !experience.endDate ||
          !experience.employmentType
        ) {
          setError("Please fill out all fields for each experience entry.");
          return false;
        }

        if (experience.startDate >= experience.endDate) {
          setError("Start date must be earlier than the end date.");
          return false;
        }
      }
    }
    return true;
  };

  const Register = () => {
    let payload = {
      first_name: userfname,
      last_name: userlname,
      school_name: schoolname,
    };
    axios
      .post(`${REGISTER}`, payload)
      .then((response) => { })
      .catch((error) => { });
  };

  const theme = createTheme();
  const renderForm = () => {
    switch (activeStep) {
      case 0:
        return (
          <ThemeProvider theme={theme}>
            <Box style={{ margin: "0% 15% ", gap: "5px" }}>
              <Grid container spacing={1} style={{ marginLeft: "3%" }}>
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
                    className="custom-input"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "transparent" },
                        "&:hover fieldset": { borderColor: "transparent" },
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
                    className="custom-input"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "transparent" },
                        "&:hover fieldset": { borderColor: "transparent" },
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
                    className="custom-input"
                    type={showPassword ? "text" : "password"} // Toggle password field type
                    style={{ width: "105%" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            sx={{
                              padding: 0,
                              color: "rgba(0, 0, 0, 0.54)",
                              fontSize: "1.5rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginLeft: "-16px",
                            }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                            {/* Toggle the eye icon */}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "transparent" },
                        "&:hover fieldset": { borderColor: "transparent" },
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
                    className="custom-input"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "transparent" },
                        "&:hover fieldset": { borderColor: "transparent" },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <select
                    value={state}
                    style={{ width: "100%" }}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option>Select State</option>
                    {allstates.map((states) => (
                      <option key={states.id} value={states.state_name}>
                        {states.state_name}
                      </option>
                    ))}
                  </select>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    value={useraddress}
                    onChange={(e) => setAddress(e.target.value)}
                    margin="dense"
                    multiline
                    rows={4}
                    style={{ width: "100%" }}
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
              {educations.map((education, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={2}>
                    <input
                      type="text"
                      placeholder="Education Level"
                      value={education.degree_level}
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <input
                      type="text"
                      placeholder="School/College Name"
                      value={education.college}
                      onChange={(e) =>
                        handleEducationChange(index, "college", e.target.value)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
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
                  <Grid item xs={2}>
                    <DatePicker
                      selected={education.startDate}
                      maxDate={new Date()}
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
                      maxDate={new Date()}
                      onChange={(date) =>
                        handleEducationChange(index, "endDate", date)
                      }
                      dateFormat="yyyy/MM/dd"
                      placeholderText="end Date"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <input
                      type="text"
                      placeholder="Specialization"
                      disabled={education.degree_level === "SSC"}
                      value={education.field_of_study}
                      fullWidth
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "field_of_study",
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
          <div className="experienced">
            <Box style={{ margin: "0% 0%" }}>
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
              {errorRadio && (
                <div style={{ color: "red", marginTop: "10px" }}>
                  Please select either Fresher or Experienced.
                </div>
              )}

              {selectedOption === "Experienced" &&
                experienceList.map((experience, index) => (
                  <Grid container spacing={2} key={index} direction="row">
                    <Grid item xs={2}>
                      <input
                        fullWidth
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
                        fullWidth
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
                        fullWidth
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
          </div>
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
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        "&.Mui-focused": {
                          outline: "2px solid #3f51b5",
                          outlineOffset: "2px",
                        },
                        height: "40px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <MenuItem value="">Availability of Work</MenuItem>
                      <MenuItem value="hybrid">Hybrid</MenuItem>
                      <MenuItem value="remote">Remote</MenuItem>
                      <MenuItem value="location-based">Location based</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Select
                      value={disability}
                      onChange={(e) => setDisability(e.target.value)}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        "&.Mui-focused": {
                          outline: "2px solid #3f51b5",
                          outlineOffset: "2px",
                        },
                        height: "40px",
                        backgroundColor: "#fff",
                      }}
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

                <Grid item xs={12} sm={6}>
                  <input
                    type="text"
                    placeholder="Disability Percentage"
                    value={disabilitypercentage}
                    onChange={(e) => setDisabilitypercentage(e.target.value)}
                    style={{
                      width: "100%",
                      height: "40px",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <input
                    type="text"
                    value={languages_known}
                    onChange={(e) => setLanguagesknow(e.target.value)}
                    placeholder="Please enter known languages with comma"
                    style={{
                      width: "100%",
                      height: "40px",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={willingToRelocate}
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
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle style={{ textAlign: "center" }}>
        Employee Registration
      </DialogTitle>

      {isLoading && (
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      )}
      <Box sx={{ width: "100%", margin: "0%" }}>
        {showPopup && (
          <div className="popup">
            <p style={{ fontSize: "medium", fontFamily: "sans-serif" }}>
              {popupMessage}
            </p>
            <button
              style={{ marginLeft: "35%", width: "30%" }}
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        )}
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
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={4000}
              onClose={() => setSnackbarOpen(false)}
              message={error}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
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
              <Button onClick={onClose}>
                {activeStep === steps.length - 1 ? "Cancel" : ""}
              </Button>
              <Button
                onClick={
                  activeStep === steps.length - 1 ? handleSubmit : handleNext
                }
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Dialog>
  );
}

export default Employeeregister;
