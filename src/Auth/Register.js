import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { CenterPopup } from "../components/notify/Notify";
import axios from "axios";
import { List, ListItem, Chip, Checkbox } from "@mui/material";
import { Add, Label } from "@mui/icons-material";
import { REGISTER } from "../endpoints";
import { RegDialogTitle, RegField, RegSelect, RegPassword, Hint, useIsMobile } from "./FormParts";
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
import { V, clean } from "./validation";

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

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: ownerState && ownerState.active ? "#0b2a6f" : "#c5d0ea",
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

// A education row counts as "empty" when the user has not typed anything in it
const isRowEmpty = (e) =>
  !String(e.college).trim() &&
  !String(e.percentage).trim() &&
  !e.startDate &&
  !e.endDate &&
  !String(e.field_of_study).trim();

// Red message shown directly below a field
const FieldError = ({ msg }) =>
  msg ? (
    <div
      role="alert"
      style={{ color: "#d32f2f", fontSize: "0.75rem", lineHeight: 1.3, marginTop: 4, textAlign: "left" }}
    >
      {msg}
    </div>
  ) : null;

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
  const [fieldErrors, setFieldErrors] = useState({});
  const clearErr = (key) =>
    setFieldErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
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
    clearErr("skills");
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

  // Education is now mandatory (SSC), so no step can be skipped
  const isStepOptional = () => false;

  const isStepSkipped = (step) => skipped.has(step);

  const GENERIC_ERR = "Please fix the highlighted fields.";
  const finishValidation = (errs) => {
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      setError(GENERIC_ERR);
      return false;
    }
    return true;
  };

  const validateForm = () => {
    const errs = {};
    const fe = V.name(userfname, "First name"); if (fe) errs.fname = fe;
    const le = V.name(userlname, "Last name"); if (le) errs.lname = le;
    if (!useremail || !/\S+@\S+\.\S+/.test(useremail))
      errs.email = "A valid email is required.";
    if (!userpassword || userpassword.length < 6)
      errs.password = "Password must be at least 6 characters.";
    if (!usermobile || !/^[6-9]\d{9}$/.test(usermobile))
      errs.mobile = "A valid 10-digit mobile number is required.";
    if (!state || state === "Select State") errs.state = "State selection is required.";
    if (!useraddress.trim()) errs.address = "Address is required.";
    return finishValidation(errs);
  };

  // Only SSC (first row) is mandatory. Other levels may stay completely empty,
  // but if the user starts one, every field of that row must be filled.
  const validateEducation = () => {
    const errs = {};
    for (let i = 0; i < educations.length; i++) {
      const education = educations[i];

      if (i > 0 && isRowEmpty(education)) continue;

      if (!String(education.college).trim())
        errs[`edu_${i}_college`] = "School/College name is required.";
      if (!education.percentage || isNaN(education.percentage))
        errs[`edu_${i}_percentage`] = "Valid percentage is required.";
      if (!education.startDate)
        errs[`edu_${i}_startDate`] = "Start date is required.";
      if (!education.endDate)
        errs[`edu_${i}_endDate`] = "End date is required.";
      if (education.startDate && education.endDate && education.startDate >= education.endDate)
        errs[`edu_${i}_endDate`] = "End date must be after the start date.";
    }
    return finishValidation(errs);
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
      // send only the education rows the user actually filled in
      educations: educations.filter((e) => !isRowEmpty(e)),
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
    clearErr(`edu_${index}_${field}`);
    if (field === "startDate" || field === "endDate") clearErr(`edu_${index}_endDate`);
    if (field === "startDate" || field === "endDate") {
      value = new Date(value).toISOString().split("T")[0];
    }
    updatedEducations[index][field] = value;
    setEducations(updatedEducations);
  };

  const handleExperienceChange = (index, field, value) => {
    clearErr(`exp_${index}`);
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
    const errs = {};
    if (selectedSkills.length === 0) errs.skills = "Please add at least one skill.";
    return finishValidation(errs);
  };
  const validateSpecialConsiderations = () => {
    const errs = {};
    if (!type) errs.type = "Please select an availability of work option.";
    if (!disability) errs.disability = "Please select a disability type.";
    if (!languages_known || languages_known.trim() === "")
      errs.languages = "Please enter at least one known language.";
    return finishValidation(errs);
  };
  const validateExperienceSection = () => {
    if (!selectedOption) {
      setErrorRadio(true);
      return false;
    }
    return true;
  };

  const validateExperience = () => {
    const errs = {};
    if (selectedOption === "Experienced") {
      experienceList.forEach((exp, i) => {
        if (
          !exp.jobTitle ||
          !exp.companyname ||
          !exp.location ||
          !exp.startDate ||
          !exp.endDate ||
          !exp.employmentType
        ) {
          errs[`exp_${i}`] = "Please fill out all fields for this entry.";
        } else if (exp.startDate >= exp.endDate) {
          errs[`exp_${i}`] = "Start date must be earlier than the end date.";
        }
      });
    }
    return finishValidation(errs);
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

  const isMobile = useIsMobile();

  const renderForm = () => {
    switch (activeStep) {
      /* ---------------------------- Step 1: basic details ---------------------------- */
      case 0:
        return (
          <div className="reg-step">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <RegField
                  label="First name"
                  required
                  hint="Your first name"
                  error={fieldErrors.fname}
                  value={userfname}
                  onChange={(e) => { setUserfname(clean.name(e.target.value)); clearErr("fname"); }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RegField
                  label="Last name"
                  required
                  hint="Your last name"
                  error={fieldErrors.lname}
                  value={userlname}
                  onChange={(e) => { setUserlname(clean.name(e.target.value)); clearErr("lname"); }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RegField
                  label="Email"
                  type="email"
                  required
                  hint="Email address used to sign in"
                  error={fieldErrors.email}
                  value={useremail}
                  onChange={(e) => { setEmail(e.target.value); clearErr("email"); }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RegPassword
                  label="Password"
                  required
                  hint="At least 6 characters"
                  error={fieldErrors.password}
                  value={userpassword}
                  onChange={(e) => { setPassword(e.target.value); clearErr("password"); }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RegField
                  label="Mobile Number"
                  required
                  hint="10-digit mobile number"
                  error={fieldErrors.mobile}
                  value={usermobile}
                  onChange={(e) => { setMobile(clean.digits(e.target.value)); clearErr("mobile"); }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RegSelect
                  label="State"
                  required
                  hint="State you live in"
                  error={fieldErrors.state}
                  value={state || ""}
                  onChange={(e) => { setState(e.target.value); clearErr("state"); }}
                >
                  {allstates.map((s) => (
                    <MenuItem key={s.state_id} value={s.state_name}>
                      {s.state_name}
                    </MenuItem>
                  ))}
                </RegSelect>
              </Grid>
              <Grid item xs={12}>
                <RegField
                  label="Address"
                  required
                  hint="Full postal address"
                  error={fieldErrors.address}
                  value={useraddress}
                  onChange={(e) => { setAddress(e.target.value); clearErr("address"); }}
                  multiline
                  minRows={4}
                />
              </Grid>
            </Grid>
            <Typography variant="caption" className="reg-required-note">
              <span style={{ color: "#d32f2f" }}>*</span> Required fields
            </Typography>
          </div>
        );

      /* ------------------------------ Step 2: education ------------------------------ */
      case 1:
        return (
          <div className="reg-step education">
            {educations.map((education, index) => (
              <div className="reg-row-card" key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <RegField
                      label="Education Level"
                      hint="Level of education"
                      value={education.degree_level}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RegField
                      label="School / College Name"
                      required={index === 0}
                      hint="Name of your school or college"
                      error={fieldErrors[`edu_${index}_college`]}
                      value={education.college}
                      onChange={(e) => handleEducationChange(index, "college", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RegField
                      label="Percentage"
                      required={index === 0}
                      hint="Marks obtained, in %"
                      error={fieldErrors[`edu_${index}_percentage`]}
                      value={education.percentage}
                      onChange={(e) => handleEducationChange(index, "percentage", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <DatePicker
                      selected={education.startDate}
                      maxDate={new Date()}
                      onChange={(date) => handleEducationChange(index, "startDate", date)}
                      dateFormat="yyyy/MM/dd"
                      placeholderText={`Start Date${index === 0 ? " *" : ""}`}
                      wrapperClassName="reg-date-wrap"
                      className="reg-date"
                    />
                    <Hint error={!!fieldErrors[`edu_${index}_startDate`]}>
                      {fieldErrors[`edu_${index}_startDate`] || "Date you started"}
                    </Hint>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <DatePicker
                      selected={education.endDate}
                      maxDate={new Date()}
                      onChange={(date) => handleEducationChange(index, "endDate", date)}
                      dateFormat="yyyy/MM/dd"
                      placeholderText={`End Date${index === 0 ? " *" : ""}`}
                      wrapperClassName="reg-date-wrap"
                      className="reg-date"
                    />
                    <Hint error={!!fieldErrors[`edu_${index}_endDate`]}>
                      {fieldErrors[`edu_${index}_endDate`] || "Date you finished"}
                    </Hint>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RegField
                      label="Specialization"
                      hint="Subject or stream"
                      disabled={education.degree_level === "SSC"}
                      value={education.field_of_study}
                      onChange={(e) => handleEducationChange(index, "field_of_study", e.target.value)}
                    />
                  </Grid>
                </Grid>
              </div>
            ))}
            <Typography variant="caption" className="reg-required-note">
              <span style={{ color: "#d32f2f" }}>*</span> Required. SSC details are mandatory.
              Other qualifications are optional, but if you start one, fill in all its fields.
            </Typography>
          </div>
        );

      /* --------------------------- Step 3: work experience --------------------------- */
      case 2:
        return (
          <div className="reg-step experienced">
            <div className="reg-radio-row" role="radiogroup" aria-label="Work status">
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
            </div>
            {errorRadio && (
              <div role="alert" className="reg-hint reg-hint-error">
                Please select either Fresher or Experienced.
              </div>
            )}

            {selectedOption === "Experienced" &&
              experienceList.map((experience, index) => (
                <div className="reg-row-card" key={index}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <RegField
                        label="Job Title"
                        required
                        hint="Your role"
                        value={experience.jobTitle}
                        onChange={(e) => handleExperienceChange(index, "jobTitle", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RegField
                        label="Company Name"
                        required
                        hint="Where you worked"
                        value={experience.companyname}
                        onChange={(e) => handleExperienceChange(index, "companyname", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RegField
                        label="Location"
                        required
                        hint="City of the workplace"
                        value={experience.location}
                        onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <DatePicker
                        selected={experience.startDate}
                        onChange={(date) => handleExperienceChange(index, "startDate", date)}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Start Date *"
                        wrapperClassName="reg-date-wrap"
                        className="reg-date"
                      />
                      <Hint>Date you joined</Hint>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <DatePicker
                        selected={experience.endDate}
                        onChange={(date) => handleExperienceChange(index, "endDate", date)}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="End Date *"
                        wrapperClassName="reg-date-wrap"
                        className="reg-date"
                      />
                      <Hint>Date you left</Hint>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RegSelect
                        label="Employment Type"
                        required
                        hint="Kind of employment"
                        value={experience.employmentType}
                        onChange={(e) => handleExperienceChange(index, "employmentType", e.target.value)}
                      >
                        <MenuItem value="Full-Time">Full-Time</MenuItem>
                        <MenuItem value="Part-Time">Part-Time</MenuItem>
                        <MenuItem value="Contract">Contract</MenuItem>
                        <MenuItem value="Internship">Internship</MenuItem>
                        <MenuItem value="Freelance">Freelance</MenuItem>
                      </RegSelect>
                    </Grid>
                    <Grid item xs={12}>
                      <FieldError msg={fieldErrors[`exp_${index}`]} />
                    </Grid>
                  </Grid>
                  {index === experienceList.length - 1 && (
                    <Button
                      className="reg-add-btn"
                      startIcon={<AddIcon />}
                      onClick={addExperienceFields}
                    >
                      Add another experience
                    </Button>
                  )}
                </div>
              ))}
            {selectedOption === "Experienced" && (
              <Typography variant="caption" className="reg-required-note">
                <span style={{ color: "#d32f2f" }}>*</span> Required for each experience entry
              </Typography>
            )}
          </div>
        );

      /* ------------------------------- Step 4: skills -------------------------------- */
      case 3:
        return (
          <div className="reg-step skills">
            <Autocomplete
              multiple
              freeSolo
              options={skillOptions}
              value={selectedSkills}
              onChange={(event, newValue) => {
                setSelectedSkills([...new Set(newValue)]);
                clearErr("skills");
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
                <RegField
                  {...params}
                  label="Add or Select Skills"
                  required
                  placeholder="Type and press Enter to add"
                  hint="Add at least one skill"
                  error={fieldErrors.skills}
                />
              )}
              sx={{ display: "block", width: "100%" }}
            />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
              {selectedSkills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleSkillRemove(skill)}
                />
              ))}
            </Box>
          </div>
        );

      /* ------------------------- Step 5: special considerations ---------------------- */
      case 4:
        return (
          <div className="reg-step special-considerations">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <RegSelect
                  label="Availability of Work"
                  required
                  hint="How you can work"
                  error={fieldErrors.type}
                  value={type}
                  onChange={(e) => { setType(e.target.value); clearErr("type"); }}
                >
                  <MenuItem value="hybrid">Hybrid</MenuItem>
                  <MenuItem value="remote">Remote</MenuItem>
                  <MenuItem value="location-based">Location based</MenuItem>
                </RegSelect>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RegSelect
                  label="Disability"
                  required
                  hint="Type of disability"
                  error={fieldErrors.disability}
                  value={disability}
                  onChange={(e) => { setDisability(e.target.value); clearErr("disability"); }}
                >
                  {disabilities.map((disabilit) => (
                    <MenuItem key={disabilit.id} value={disabilit.abbreviation}>
                      {disabilit.name}
                    </MenuItem>
                  ))}
                </RegSelect>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RegField
                  label="Disability Percentage"
                  hint="Percentage shown on your certificate"
                  value={disabilitypercentage}
                  onChange={(e) => setDisabilitypercentage(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RegField
                  label="Languages Known"
                  required
                  hint="Separate languages with commas"
                  error={fieldErrors.languages}
                  value={languages_known}
                  onChange={(e) => { setLanguagesknow(e.target.value); clearErr("languages"); }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="reg-check">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={willingToRelocate}
                        onChange={(e) => setWillingToRelocate(e.target.checked)}
                      />
                    }
                    label="Willing to relocate"
                  />
                </div>
              </Grid>
            </Grid>
            <Typography variant="caption" className="reg-required-note">
              <span style={{ color: "#d32f2f" }}>*</span> Required fields
            </Typography>
          </div>
        );
      default:
        return null;
    }
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <Dialog open={!!open} onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile}>
      <RegDialogTitle onClose={onClose}>Employee Registration</RegDialogTitle>

      {isLoading && (
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      )}

      <CenterPopup
        open={showPopup}
        severity={/successfully/i.test(popupMessage) ? "success" : "error"}
        title={/successfully/i.test(popupMessage) ? "Registration successful" : "Registration failed"}
        message={popupMessage}
        onClose={() => setShowPopup(false)}
      />
      <CenterPopup
        open={snackbarOpen}
        severity="warning"
        title="Please check the form"
        message={error}
        onClose={() => setSnackbarOpen(false)}
      />

      <DialogContent className="reg-content reg-wizard">
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} className="reg-stepper">
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
                <StepLabel StepIconComponent={QontoStepIcon} {...labelProps}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <Typography sx={{ mt: 2, mb: 1 }}>{confirmMessage && confirmMessage}</Typography>
        ) : (
          <>
            <Typography className="reg-step-count">
              Step {activeStep + 1} of {steps.length}
            </Typography>
            {renderForm()}
          </>
        )}
      </DialogContent>

      <DialogActions className="reg-actions reg-wizard-actions">
        {activeStep === steps.length ? (
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        ) : (
          <>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} className="reg-btn-back">
              Back
            </Button>
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip}>Skip</Button>
            )}
            {isLastStep && (
              <Button onClick={onClose} color="secondary">Cancel</Button>
            )}
            <Button onClick={isLastStep ? handleSubmit : handleNext} color="primary">
              {isLastStep ? "Submit" : "Next"}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default Employeeregister;
