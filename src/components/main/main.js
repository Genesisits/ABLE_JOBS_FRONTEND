import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import one from "../../images/find_job.jpg";
import two from "../../images/h2.jpg";
import three from "../../images/h3.jfif";
import four from "../../images/h4.JPG";
import bridge1 from "../../images/d1.jpg";
import bridge2 from "../../images/d2.jpg";
import bridge3 from "../../images/d6.jpg";
import bridge4 from "../../images/d3.JPG";
import bridge5 from "../../images/d4.jpg";
import bridge6 from "../../images/d5.jpg";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Footer from "../footer/footer";
import BackGround from "../background/background";
// import ReactGA from "react-ga4";

const images = [one, two, three, four];
const images2 = [bridge1, bridge2, bridge3, bridge4, bridge5, bridge6];
const states = [
  { id: 1, name: "Andhra Pradesh", abbreviation: "AP" },
  { id: 2, name: "Telangana", abbreviation: "TG" },
  { id: 3, name: "Karnataka", abbreviation: "KA" },
  { id: 4, name: "Tamil Nadu", abbreviation: "TN" },
];

const departments = [
 { id: 1, name: 'IT & Information security', abbreviation: 'IT'},
 { id: 2, name: 'Data Science & analytics', abbreviation: 'DS'},
 { id: 3, name: 'Human Resource Management', abbreviation: 'HRM'},
 { id: 4, name: 'Engineering(Hardware & Software)', abbreviation: 'Engg'},
 { id: 5, name: 'Consulting', abbreviation: 'consulting'},
 { id: 6, name: 'UI, UX design and architecture', abbreviation: 'ui&ux'}
]

const industries= [
  {id: '1', name: 'IT and IT Services', abbreviation: 'IT and IT Services'},
  {id: '1', name: 'Banking, Financial Service, and Insurance', abbreviation: 'Banking, Financial Service, and Insurance'},
  {id: '1', name: 'Retail and E-Commerce', abbreviation: 'Retail and E-Commerce'},
  {id: '1', name: 'FinTech', abbreviation: 'FinTech'},
  {id: '1', name: 'Tele Communications', abbreviation: 'Tele Communications'},
  {id: '1', name: 'Healthcare and pharmaceuticals', abbreviation: 'Healthcare and pharmaceuticals'},
  {id: '1', name: 'Education and Training', abbreviation: 'Education and Training'}
]

const qualifications = [
  {id: '1', name: '', abbreviation: 'Below 10th standard'},
  {id: '2', name: '10th class', abbreviation: '10th Psass'},
  {id: '3', name: '12th class', abbreviation: '12th Pass'},
  {id: '4', name: 'Diploma', abbreviation: 'Diploma'},
  {id: '5', name: 'Bachelors', abbreviation: 'Bachelors'},
  {id: '6', name: 'Masters', abbreviation: 'Masters'},
  {id: '7', name: 'Doctorate', abbreviation: 'Doctorate'},
]

const experience = [
  {id: '1',name: 'Fresher', abbreviation: 'fresher'},
  {id: '2',name: '1 Year', abbreviation: '1 years'},
  {id: '3',name: '2 Years', abbreviation: '2 years'},
  {id: '4',name: '3 Years', abbreviation: '3 years'},
  {id: '5',name: '4 Years', abbreviation: '4 years'},
  {id: '6',name: '5 Years', abbreviation: '5 years'}
]
export default function Header() {
  const [currentImage, setCurrentImage] = useState(0);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentImage((currentImage) => currentImage + 1);
  //   }, 3000);

  //   return () => clearInterval(intervalId);
  // }, []);

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
        <div style={{padding:' 0% 10%'}}>
          <h1>120+ Jobs for you to explore</h1>
          <Box sx={{ minWidth: 120, display: 'flex', flexDirection: 'row', gap:'10px' }}>
          <FormControl fullWidth>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            Location based
          </MenuItem>
          <MenuItem value="hybrid">Hybrid</MenuItem>
          <MenuItem value="remote">Remote</MenuItem>
          <MenuItem value="location-based">Location based</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            States
          </MenuItem>
          {states.map((state) => (
                <MenuItem key={state.id} value={state.abbreviation}>
                  {state.name}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            Departments
          </MenuItem>
          {departments.map((department) => (
                <MenuItem key={department.id} value={department.abbreviation}>
                  {department.name}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            Industries
          </MenuItem>
          {industries.map((Industrie) => (
                <MenuItem key={Industrie.id} value={Industrie.abbreviation}>
                  {Industrie.name}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            Qualification
          </MenuItem>
          {qualifications.map((qualification) => (
                <MenuItem key={qualification.id} value={qualification.abbreviation}>
                  {qualification.name}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            Experience
          </MenuItem>
          {experience.map((exp) => (
                <MenuItem key={exp.id} value={exp.abbreviation}>
                  {exp.name}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      </Box>
        </div>
        <div>
          <div style={{border:'1px solid #6c757d', margin:'20px 50px', display:'flex',flexDirection: 'row', justifyContent: 'space-evenly', borderRadius:'5px'}}>
            <span style={{fontFamily: 'sans-serif', color: 'black'}}>
              <h6>Sales Drive</h6>
              <p>Godrej Properties</p>
            </span>
            <span style={{fontFamily:'sans-serif', color: 'black'}}>
              <h6>Multiple Locations</h6>
              <p>5 Days ago</p>
            </span>
            <span>
              <button>Apply Now</button>
            </span>
          </div>
          <div style={{border:'1px solid #6c757d', margin:'20px 50px', display:'flex',flexDirection: 'row', justifyContent: 'space-evenly', borderRadius:'5px'}}>
            <span style={{fontFamily: 'sans-serif', color: 'black'}}>
              <h6>Sales Drive</h6>
              <p>Godrej Properties</p>
            </span>
            <span style={{fontFamily:'sans-serif', color: 'black'}}>
              <h6>Multiple Locations</h6>
              <p>5 Days ago</p>
            </span>
            <span>
              <button>Apply Now</button>
            </span>
          </div>
        </div>
      </div>
    // </div>
  );
}
