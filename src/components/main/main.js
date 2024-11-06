import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import one from "../../images/main.png";
import two from "../../images/h2.jpg";
import Paper from "@mui/material/Paper";
import three from "../../images/h3.jfif";
import four from "../../images/h4.JPG";
import { styled } from "@mui/material/styles";
import axios from "axios";
import bridge1 from "../../images/d1.jpg";
import { GET_JOB } from "../../endpoints";
import bridge2 from "../../images/d2.jpg";
import bridge3 from "../../images/d6.jpg";
import bridge4 from "../../images/d3.JPG";
import bridge5 from "../../images/d4.jpg";
import bridge6 from "../../images/d5.jpg";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, InputLabel, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Footer from "../footer/footer";
import BackGround from "../background/background";
// import ReactGA from "react-ga4";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  // textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
const images = [one, two, three, four];
const images2 = [bridge1, bridge2, bridge3, bridge4, bridge5, bridge6];
const states = [
  { id: 1, name: "Andhra Pradesh", abbreviation: "AP" },
  { id: 2, name: "Telangana", abbreviation: "TG" },
  { id: 3, name: "Karnataka", abbreviation: "KA" },
  { id: 4, name: "Tamil Nadu", abbreviation: "TN" },
];

const departments = [
  { id: 1, name: "IT & Information security", abbreviation: "IT" },
  { id: 2, name: "Data Science & analytics", abbreviation: "DS" },
  { id: 3, name: "Human Resource Management", abbreviation: "HRM" },
  { id: 4, name: "Engineering(Hardware & Software)", abbreviation: "Engg" },
  { id: 5, name: "Consulting", abbreviation: "consulting" },
  { id: 6, name: "UI, UX design and architecture", abbreviation: "ui&ux" },
];

const industries = [
  { id: "1", name: "IT and IT Services", abbreviation: "IT and IT Services" },
  {
    id: "1",
    name: "Banking, Financial Service, and Insurance",
    abbreviation: "Banking, Financial Service, and Insurance",
  },
  {
    id: "1",
    name: "Retail and E-Commerce",
    abbreviation: "Retail and E-Commerce",
  },
  { id: "1", name: "FinTech", abbreviation: "FinTech" },
  { id: "1", name: "Tele Communications", abbreviation: "Tele Communications" },
  {
    id: "1",
    name: "Healthcare and pharmaceuticals",
    abbreviation: "Healthcare and pharmaceuticals",
  },
  {
    id: "1",
    name: "Education and Training",
    abbreviation: "Education and Training",
  },
];

const qualifications = [
  { id: "1", name: "", abbreviation: "Below 10th standard" },
  { id: "2", name: "10th class", abbreviation: "10th Psass" },
  { id: "3", name: "12th class", abbreviation: "12th Pass" },
  { id: "4", name: "Diploma", abbreviation: "Diploma" },
  { id: "5", name: "Bachelors", abbreviation: "Bachelors" },
  { id: "6", name: "Masters", abbreviation: "Masters" },
  { id: "7", name: "Doctorate", abbreviation: "Doctorate" },
];

const locations = [
  { id: "1", name: "Pan India", abbreviation: "pan_india" },
  { id: "2", name: "Ahmedabad", abbreviation: "ahmedabad" },
  { id: "3", name: "Ankleshwar", abbreviation: "ankleshwar" },
  { name: "Bangalore", abbreviation: "bangalore" },
  { name: "Chennai", abbreviation: "chennai" },
  { name: "Delhi", abbreviation: "delhi" },
  { name: "Gurgaon", abbreviation: "gurgaon" },
  { name: "Hyderabad", abbreviation: "hyderabad" },
  { name: "Jamshedpur", abbreviation: "jamshedpur" },
  { name: "Kolkata", abbreviation: "kolkata" },
  { name: "Mumbai", abbreviation: "mumbai" },
  { name: "Noida", abbreviation: "noida" },
  { name: "Pondicherry", abbreviation: "pondicherry" },
  { name: "Pune", abbreviation: "pune" },
  { name: "Thane", abbreviation: "thane" },
  { name: "Visakhapatnam", abbreviation: "visakhapatnam" },
  { name: "Gurugram", abbreviation: "gurugram" },
];
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
  { id: "12", name: "Muscular Dystrophy", abbreviation: "Muscular Dystrophy" },
  { id: "13", name: "Dwarfism", abbreviation: "Dwarfism" },
  { id: "14", name: "Acid Attack Victim", abbreviation: "Acid Attack Victim" },
  { id: "15", name: "Parkinson disease", abbreviation: "Parkinson disease" },
  { id: "16", name: "Multiple Sclerosis", abbreviation: "Multiple Sclerosis" },
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
  { id: "25", name: "Spinal Cord Injury", abbreviation: "Spinal Cord Injury" },
  { id: "26", name: "Others", abbreviation: "Others" },
];
const experience = [
  { id: "1", name: "Fresher", abbreviation: "fresher" },
  { id: "2", name: "1 Year", abbreviation: "1 years" },
  { id: "3", name: "2 Years", abbreviation: "2 years" },
  { id: "4", name: "3 Years", abbreviation: "3 years" },
  { id: "5", name: "4 Years", abbreviation: "4 years" },
  { id: "6", name: "5 Years", abbreviation: "5 years" },
];

const companies = [
  { id: "1", name: "Abbott", abbreviation: "Abott" },
  { id: "2", name: "AON", abbreviation: "aon" },
  { id: "3", name: "Accenture", abbreviation: "accenture" },
  {
    id: "4",
    name: "Aditya Birla Capital",
    abbreviation: "aidtya_birla_capital",
  },
  { id: "5", name: "Amazon", abbreviation: "amazon" },
  { id: "6", name: "Asian Paints", abbreviation: "asian_paints" },
  { id: "7", name: "Axis Bank", abbreviation: "axis_bank" },
  { id: "8", name: "BSE India", abbreviation: "bse_india" },
  { id: "9", name: "Brigade", abbreviation: "brigade" },
  { id: "10", name: "Concentrix", abbreviation: "concentrix" },
  { id: "11", name: "Fiserv", abbreviation: "fiserv" },
  { id: "12", name: "Godrej Properties", abbreviation: "godrej_properties" },
  { id: "13", name: "HDFC Ergo", abbreviation: "hdfc_ergo" },
  { id: "14", name: "HDFC Ergo GIC ltd", abbreviation: "hdfc_ergo_gic_ltd" },
  { id: "15", name: "HUL", abbreviation: "hul" },
  { id: "16", name: "ITC", abbreviation: "itc" },
  { id: "17", name: "Indigo", abbreviation: "indigo" },
  { id: "18", name: "JK Cement", abbreviation: "jk_cement" },
  { id: "19", name: "JLL", abbreviation: "jll" },
];
export default function Header() {
  const [currentImage, setCurrentImage] = useState(0);
  const [age, setAge] = React.useState("");
  const [type, setType] = React.useState("");
  const [state, setStates] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [industry, setIndustry] = React.useState("");
  const [qualification, setQualifiation] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [disability, setDisability] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${GET_JOB}`).then((response) => {
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    // Apply overflow: hidden to prevent horizontal overflow
    document.documentElement.style.overflowX = "hidden";
  }, []);
  const imgarray = images[currentImage % images.length];
  const imgarray2 = images2[currentImage % images2.length];

  return (
    // <div>
    <div className="my-container">
      <div className="image-zoom-container">
        <img
          className="zoomed-image"
          // style={{ maxWidth: "1000px" }}`
          src={imgarray}
          alt="eventphoto"
        />
      </div>
      <div style={{ padding: " 0% 10%" }}>
        <h1>120+ Jobs for you to explore</h1>
        <Box
          sx={{
            minWidth: 120,
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <FormControl fullWidth>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="location-based">Location based</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              value={state}
              onChange={(e) => setStates(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">States</MenuItem>
              {states.map((state) => (
                <MenuItem key={state.id} value={state.abbreviation}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">Departments</MenuItem>
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.abbreviation}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">Industries</MenuItem>
              {industries.map((Industrie) => (
                <MenuItem key={Industrie.id} value={Industrie.abbreviation}>
                  {Industrie.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">All Locations</MenuItem>
              {locations.map((locate) => (
                <MenuItem key={locate.id} value={locate.abbreviation}>
                  {locate.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              value={qualification}
              onChange={(e) => setQualifiation(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">Qualification</MenuItem>
              {qualifications.map((qualification) => (
                <MenuItem
                  key={qualification.id}
                  value={qualification.abbreviation}
                >
                  {qualification.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">Companies</MenuItem>
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.abbreviation}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              value={disability}
              onChange={(e) => setDisability(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">All Disabilities</MenuItem>
              {disabilities.map((disabilit) => (
                <MenuItem key={disabilit.id} value={disabilit.abbreviation}>
                  {disabilit.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* <div style={{ margin: "10px" }}> */}
          <Grid container spacing={1}>
            {data.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Item>
                   <Grid container spacing={0}>
                    <Grid item xs={3}>
                      <p>{item.company_name}</p>
                      <h6>{item.job_title}</h6>
                    </Grid>
                    <Grid item xs={3}>
                      <h6>{item.industry} - {item.department}</h6>
                      <h6>{item.work_mode}</h6>
                    </Grid>
                    <Grid item xs={3}>
                      <h6>No Of Positions - {item.number_of_positions}</h6>
                      <h6>Notice Period - {item.notice_period}</h6>
                    </Grid>
                    <Grid item xs={3}>
                      <Button>Apply Now</Button>
                    </Grid>
                   </Grid>
                </Item>
              </Grid>
            ))}
          </Grid>
        {/* </div> */}
      </div>
    </div>
  );
}
