import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import "./main.css";
import "./jobboard.css";
import JobDetails from "./JobDetails";
import one from "../../images/main.png";
import DescriptionIcon from "@mui/icons-material/Description";
import two from "../../images/h2.jpg";
import Paper from "@mui/material/Paper";
import three from "../../images/h3.jfif";
import four from "../../images/h4.JPG";
import { styled } from "@mui/material/styles";
import axios from "axios";
import bridge1 from "../../images/d1.jpg";
import Chip from "@mui/material/Chip";
import { GET_JOB } from "../../endpoints";
import bridge2 from "../../images/d2.jpg";
import bridge3 from "../../images/d6.jpg";
import bridge4 from "../../images/d3.JPG";
import bridge5 from "../../images/d4.jpg";
import bridge6 from "../../images/d5.jpg";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, InputLabel, Grid, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import Box from "@mui/material/Box";
import Footer from "../footer/footer";
import BackGround from "../background/background";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import WorkIcon from "@mui/icons-material/Work";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import GridViewIcon from "@mui/icons-material/GridView";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import BoltIcon from "@mui/icons-material/Bolt";
import BarChartIcon from "@mui/icons-material/BarChart";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import SettingsIcon from "@mui/icons-material/Settings";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AppsIcon from "@mui/icons-material/Apps";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import BusinessIcon from "@mui/icons-material/Business";
import CompanySlider from "../slider/CompanySlider";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,

  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",

  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
const images = [one, two, three, four];
const images2 = [bridge1, bridge2, bridge3, bridge4, bridge5, bridge6];
// Number of newest jobs shown on the index page; the rest live on /alljobs.
const LATEST_JOBS_LIMIT = 8;
const states = [
  { id: 1, name: "Andhra Pradesh", abbreviation: "Andhra Pradesh" },
  { id: 2, name: "Telangana", abbreviation: "Telangana" },
  { id: 3, name: "Karnataka", abbreviation: "Karnataka" },
  { id: 4, name: "Tamil Nadu", abbreviation: "Tamilnadu" },
];

const departments = [
  {
    id: 1,
    name: "IT & Information security",
    abbreviation: "IT & Information security",
  },
  {
    id: 2,
    name: "Data Science & analytics",
    abbreviation: "Data Science & analytics",
  },
  {
    id: 3,
    name: "Human Resource Management",
    abbreviation: "Human Resource Management",
  },
  {
    id: 4,
    name: "Engineering(Hardware & Software)",
    abbreviation: "Engineering(Hardware & Software)",
  },
  { id: 5, name: "Consulting", abbreviation: "Consulting" },
  {
    id: 6,
    name: "UI, UX design and architecture",
    abbreviation: "UI, UX design and architecture",
  },
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
  { id: "20", name: "Expert Aid Techn", abbreviation: "expert aid tech" },
];

const featureItems = [
  { icon: <WorkIcon />, title: "Inclusive", sub: "Job Opportunities" },
  { icon: <GroupsIcon />, title: "Support for", sub: "Differently Abled" },
  { icon: <VerifiedUserIcon />, title: "Trusted &", sub: "Verified Employers" },
  { icon: <BoltIcon />, title: "Easy Application", sub: "Process" },
  { icon: <BarChartIcon />, title: "Build a", sub: "Successful Career" },
];

// `match` = words looked for in a job's department, industry and title.
const categoryItems = [
  {
    icon: <LaptopMacIcon />, label: "IT & Software", color: "#6b3df0",
    match: ["it and it services", "it & information", "information security", "software", "developer", "data science", "ui, ux", "web", "cloud", "devops"],
  },
  {
    icon: <BarChartIcon />, label: "Banking & Finance", color: "#1f6fd6",
    match: ["banking", "bank", "financial", "finance", "fintech", "insurance", "accounts", "accountant"],
  },
  {
    icon: <SettingsIcon />, label: "Engineering", color: "#12a150",
    match: ["engineering", "engineer", "mechanical", "civil", "electrical", "manufacturing"],
  },
  {
    icon: <MonitorHeartIcon />, label: "Healthcare", color: "#f08a00",
    match: ["healthcare", "pharma", "medical", "nurse", "hospital", "clinical"],
  },
  {
    icon: <SchoolIcon />, label: "Education", color: "#2a2fb8",
    match: ["education", "training", "teacher", "tutor", "lecturer", "faculty"],
  },
  {
    icon: <ApartmentIcon />, label: "Government Jobs", color: "#12a3a8",
    match: ["government", "govt", "public sector", "psu", "municipal"],
  },
];
const jobInCategory = (job, categoryLabel) => {
  const cat = categoryItems.find((c) => c.label === categoryLabel);
  if (!cat) return true;
  const hay = [job.department, job.industry, job.job_title]
    .map((v) => (v || "").toLowerCase())
    .join(" | ");
  return cat.match.some((w) => hay.includes(w));
};

const statItems = [
  { icon: <GroupsIcon />, value: "50,000+", label: "Job Seekers" },
  { icon: <BusinessIcon />, value: "5,000+", label: "Employers" },
  { icon: <WorkIcon />, value: "1,00,000+", label: "Job Vacancies" },
];

// One filter dropdown. Same value / onChange contract as before.
function FilterSelect({ icon, value, onChange, placeholder, options, className = "" }) {
  const labelFor = (v) => (options.find((o) => o.value === v) || {}).label || v;
  return (
    <FormControl fullWidth className={`filter-field ${value ? "has-value" : ""} ${className}`}>
      <span className="filter-icon" aria-hidden="true">{icon}</span>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        // The placeholder is only shown as the closed-state text; it is no longer
        // a selectable item (index 0) in the dropdown list.
        renderValue={(v) => (v ? labelFor(v) : placeholder)}
        inputProps={{ "aria-label": placeholder }}
        // no tabindex attribute on the select div
        SelectDisplayProps={{ tabIndex: null }}
        MenuProps={{
          // open directly BELOW the field instead of over it
          anchorOrigin: { vertical: "bottom", horizontal: "left" },
          transformOrigin: { vertical: "top", horizontal: "left" },
          // MUI's scroll-lock + html{overflow-x:hidden} was jumping the page back to the banner
          disableScrollLock: true,
          disableAutoFocusItem: true,
          PaperProps: { className: "filter-menu", style: { maxHeight: 320, marginTop: 6 } },
        }}
        endAdornment={
          value ? (
            <IconButton
              size="small"
              aria-label={`Clear ${placeholder}`}
              onClick={() => onChange({ target: { value: "" } })}
              sx={{ mr: 3 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          ) : null
        }
      >
        {options.map((o, i) => (
          <MenuItem key={`${o.value}-${i}`} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
const opt = (list) => list.map((x) => ({ value: x.abbreviation, label: x.name }));

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
  const [category, setCategory] = React.useState(""); // chosen in "Explore Job Categories"
  const [location, setLocation] = React.useState("");
  const [data, setData] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [isModalHovered, setIsModalHovered] = useState(false);
  const [hoverBoxPosition, setHoverBoxPosition] = useState({ top: 0, left: 0 });
  const rowRefs = useRef([]);
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const jobsRef = useRef(null);
  const scrollToJobs = () =>
    jobsRef.current && jobsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  // Clicking a category shows only that category's jobs (click again to undo).
  const chooseCategory = (label) => {
    setCategory((cur) => (cur === label ? "" : label));
    setTimeout(scrollToJobs, 50);
  };
  const showAllCategories = () => {
    setCategory("");
    setTimeout(scrollToJobs, 50);
  };

  useEffect(() => {
    setLoading(true);
    // Fetch jobs from the API
    const fetchJobs = () => {
      axios
        .get(`${GET_JOB}`)
        .then((response) => {
          const filteredData = response.data.filter((job) => {
            // deactivated jobs are not shown publicly
            if (!job.activation_status) return false;
            const matchDepartment = department
              ? job.department.toLowerCase().includes(department.toLowerCase())
              : true;
            const matchQualification = qualification
              ? job.qualification_required
                  .toLowerCase()
                  .includes(qualification.toLowerCase())
              : true;

            const matchWorkmode = type
              ? job.work_mode.toLowerCase().includes(type.toLowerCase())
              : true;

            const matchIndustry = industry
              ? job.industry.toLowerCase().includes(industry.toLowerCase())
              : true;

            const matchesCompany = company
              ? job.company_name.toLowerCase().includes(company.toLowerCase())
              : true;

            const matchesState = state
              ? job.state.toLowerCase().includes(state.toLowerCase())
              : true;

            const matchesLocation = location
              ? job.location.toLowerCase().includes(location.toLowerCase())
              : true;

            const matchesDisability = disability
              ? job.disability_eligible
                  .toLowerCase()
                  .includes(disability.toLowerCase())
              : true;

            const matchesCategory = jobInCategory(job, category);

            return (
              matchesCategory &&
              matchesCompany &&
              matchesState &&
              matchesDisability &&
              matchDepartment &&
              matchIndustry &&
              matchWorkmode &&
              matchesLocation &&
              matchQualification
            );
          });
          // newest first; the index page only shows the latest few
          const newestFirst = [...filteredData].sort((a, b) => b.id - a.id);
          const latest = newestFirst.slice(0, LATEST_JOBS_LIMIT);
          setTotalJobs(newestFirst.length);
          setData(latest);
          setSelectedJob(latest.length > 0 ? latest[0] : null);
        })
        .catch((error) => {
          console.error(error.response?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchJobs();
  }, [
    location,
    type,
    state,
    department,
    industry,
    qualification,
    company,
    disability,
    category,
  ]);

  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
  }, []);
  const imgarray = images[currentImage % images.length];
  const imgarray2 = images2[currentImage % images2.length];

  const handleMouseEnter = (item, index) => {
    clearTimeout(hoverTimeout);
    setHoveredItem(item);
    const row = rowRefs.current[index];
    const rowRect = row.getBoundingClientRect();

    setHoverBoxPosition({
      top: rowRect.top + window.scrollY,
      left: rowRect.left + window.scrollX,
    });
  };

  const onhandleClick = () => {
    if (localStorage.getItem("access_token")) {
      if (localStorage.getItem("is_employee") === "true") {
        navigate("/findajob");
      } else if (localStorage.getItem("is_employer") === "true") {
        navigate("/jobs");
      }
    } else {
      navigate("/login");
    }
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredItem(null);
    }, 5000);
    setHoverTimeout(timeout);
  };

  const handleModalMouseEnter = () => {
    setIsModalHovered(true);
  };

  const handleModalMouseLeave = () => {
    setIsModalHovered(false);
  };

  return (
    <div className="my-container home">
      {loading && (
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      )}

      {/* ---------- hero ---------- */}
      <section className="hero">
        <div className="hero-copy">
          <p className="hero-eyebrow">ABLE JOBS HUB</p>
          <h1 className="hero-title">
            Empowering to Build a Better Career
          </h1>
          <p className="hero-sub">
            Your Ability is Our Priority. Find the right job, showcase your
            skills and achieve your dreams.
          </p>
          <div className="hero-actions">
            <a className="btn-gold" onClick={onhandleClick}>
              <SearchIcon /> Find Jobs Now <ArrowForwardIcon className="btn-arrow" />
            </a>
            <Link to="/about" className="btn-outline">
              <PlayArrowIcon /> Watch Video
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- feature strip ---------- */}
      <ul className="feature-strip">
        {featureItems.map((f) => (
          <li key={f.title + f.sub}>
            <span className="feature-icon">{f.icon}</span>
            <span className="feature-text">
              {f.title}
              <br />
              {f.sub}
            </span>
          </li>
        ))}
      </ul>

      {/* ---------- search / filters ---------- */}
      <section className="search-panel" aria-label="Search jobs">
        <div className="search-row">
          <div className="search-title">
            <SearchIcon className="search-title-icon" />
            <div>
              <h2>Search Jobs</h2>
              <p>Find the perfect job that matches your skills</p>
            </div>
          </div>

          <FilterSelect
            icon={<WorkOutlineIcon />}
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Select Job Type"
            options={[
              { value: "hybrid", label: "Hybrid" },
              { value: "remote", label: "Remote" },
              { value: "on-site", label: "On-site" },
            ]}
          />
          <FilterSelect
            icon={<GridViewIcon />}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Select Category"
            options={opt(departments)}
          />
          <FilterSelect
            icon={<LocationOnIcon />}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Select Location"
            options={opt(locations)}
          />
          <a className="btn-search" onClick={scrollToJobs}>
            <SearchIcon /> Search Jobs
          </a>
        </div>
      </section>

      {/* ---------- categories ---------- */}
      <section className="categories" aria-labelledby="cat-title">
        <h2 className="section-title" id="cat-title">
          <span>Explore Job Categories</span>
        </h2>
        <div className="category-grid">
          {categoryItems.map((c) => (
            <a
              className={`category-card${category === c.label ? " selected" : ""}`}
              key={c.label}
              role="button"
              tabIndex={0}
              aria-pressed={category === c.label}
              onClick={() => chooseCategory(c.label)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), chooseCategory(c.label))}
              style={{ "--cat": c.color }}
            >
              {c.icon}
              <span>{c.label}</span>
            </a>
          ))}
          <a className={`category-card category-all${!category ? " selected" : ""}`} role="button" tabIndex={0} onClick={showAllCategories} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), showAllCategories())}>
            <AppsIcon />
            <span>
              View All <ArrowForwardIcon className="btn-arrow" />
            </span>
          </a>
        </div>
      </section>

      

      {/* ---------- job board ---------- */}
      <section className="jobs-section" ref={jobsRef}>
        <h2 className="jobs-heading">
          {category ? `${category} Jobs` : "Latest Jobs for you to explore"}
        </h2>
        {category && (
          <div className="category-active">
            <span>
              Showing <b>{totalJobs}</b> {category} job{totalJobs === 1 ? "" : "s"}
            </span>
            <button type="button" className="category-clear" onClick={() => setCategory("")}>
              <CloseIcon fontSize="small" /> Clear category
            </button>
          </div>
        )}

        <div className="search-more">
          <FilterSelect
            icon={<LocationOnIcon />}
            value={state}
            onChange={(e) => setStates(e.target.value)}
            placeholder="States"
            options={opt(states)}
          />
          <FilterSelect
            icon={<BusinessIcon />}
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Industries"
            options={opt(industries)}
          />
          <FilterSelect
            icon={<SchoolIcon />}
            value={qualification}
            onChange={(e) => setQualifiation(e.target.value)}
            placeholder="Qualification"
            options={opt(qualifications)}
          />
          <FilterSelect
            icon={<ApartmentIcon />}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Companies"
            options={opt(companies)}
          />
          <FilterSelect
            icon={<VolunteerActivismIcon />}
            value={disability}
            onChange={(e) => setDisability(e.target.value)}
            placeholder="All Disabilities"
            options={opt(disabilities)}
          />
        </div>

        <div className="job-board-container">
          <div className="job-board">
            <div className="job-list">
              {data.map((job, index) => (
                <div
                  key={job.id}
                  className={`job-list-item ${selectedJob && selectedJob.id === job.id ? "active" : ""}`}
                  onClick={() => setSelectedJob(job)}
                >
                  <h3 className="job-title">{job.job_title}</h3>
                  <p className="job-company">{job.company_name}</p>
                  <p className="job-location">
                    {job.location}, {job.state}
                  </p>
                </div>
              ))}
              {!loading && data.length === 0 && (
                <div className="job-list-item">
                  {category ? `No ${category} jobs right now.` : "No jobs found."}
                </div>
              )}
            </div>
            <JobDetails job={selectedJob} onApply={onhandleClick} />
          </div>
        </div>

        {totalJobs > LATEST_JOBS_LIMIT && (
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <Link to="/alljobs" className="btn-gold">
              View All {totalJobs} Jobs <ArrowForwardIcon className="btn-arrow" />
            </Link>
          </div>
        )}
        {totalJobs <= LATEST_JOBS_LIMIT && totalJobs > 0 && (
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <Link to="/alljobs" className="btn-gold">
              Browse Jobs Page <ArrowForwardIcon className="btn-arrow" />
            </Link>
          </div>
        )}
      </section>


      {/* ---------- why choose us ---------- */}
      <section className="why-us">
        <div className="why-copy">
          <h2>
            Why Choose <span>Us?</span>
          </h2>
          <p>Because Inclusion Creates a Stronger Workforce</p>
        </div>
        <ul className="why-stats">
          {statItems.map((s) => (
            <li key={s.label}>
              <span className="stat-icon">{s.icon}</span>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
        <div className="why-mission">
          <VolunteerActivismIcon className="mission-icon" />
          <div>
            <h3>Our Mission</h3>
            <p>
              To bridge the gap between talented=== and inclusive employers.
            </p>
          </div>
        </div>
      </section>

      <CompanySlider />

    </div>
  );
}