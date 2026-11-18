import * as React from "react";
import { useState, useEffect } from "react";
import { CenterPopup } from "../notify/Notify";
import axios from "axios";
import { CREATE_JOB, UPDATE_JOB } from "../../endpoints";
import "./jobs.css";
import "./postajob.css";
import PurpleDialog from "../Employee/PurpleDialog";
import EditIcon from "@mui/icons-material/Edit";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

// Label + control wrapper used by the form below
function Field({ label, children }) {
  return (
    <label className="pj-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

const industries = [
  { id: "1", name: "IT and IT Services", abbreviation: "IT and IT Services" },
  {
    id: "2",
    name: "Banking, Financial Service, and Insurance",
    abbreviation: "Banking, Financial Service, and Insurance",
  },
  {
    id: "3",
    name: "Retail and E-Commerce",
    abbreviation: "Retail and E-Commerce",
  },
  { id: "4", name: "FinTech", abbreviation: "FinTech" },
  { id: "5", name: "Tele Communications", abbreviation: "Tele Communications" },
  {
    id: "6",
    name: "Healthcare and pharmaceuticals",
    abbreviation: "Healthcare and pharmaceuticals",
  },
  {
    id: "7",
    name: "Education and Training",
    abbreviation: "Education and Training",
  },

   {
    id: "8",
    name: "Engineering Jobs",
    abbreviation: "Engineering Jobs",
  },

  {
    id: "9",
    name: "Education Jobs",
    abbreviation: "Education Jobs",
  },

  {
    id: "10",
    name: "Government Jobs",
    abbreviation: "Government Jobs",
  },

];

const qualifications = [
  { id: "1", name: "10th class", abbreviation: "10th Psass" },
  { id: "2", name: "12th class", abbreviation: "12th Pass" },
  { id: "3", name: "Diploma", abbreviation: "Diploma" },
  { id: "4", name: "Bachelors", abbreviation: "Bachelors" },
  { id: "5", name: "Masters", abbreviation: "Masters" },
  { id: "6", name: "Doctorate", abbreviation: "Doctorate" },
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
  {
    id: 7,
    name: "Banking & Finance",
    abbreviation: "Banking & Finance",
  },

  {
    id: 8,
    name: "Engineering",
    abbreviation: "Engineering",
  },

  {
    id: 9,
    name: "Healthcare",
    abbreviation: "Healthcare",
  },

   {
    id: 10,
    name: "Education",
    abbreviation: "Education",
  },

    {
    id: 11,
    name: "Government Jobs",
    abbreviation: "Government Jobs",
  },

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

export default function Postajob({ modalIsOpen, closeModal, selectedJob }) {
  const [work_mode, setWorkmode] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [job_title, setJobrole] = useState("");
  const [employment_type, setJobtype] = useState("");
  const [department, setDepartment] = useState("");
  const [industry, setindustry] = useState("");
  const [state, setState] = useState("");
  const [disability, setdisability] = useState("");
  const [companywebsite, setcompanywebsite] = useState("");
  const [experience_required, setExperiencerequired] = useState("");
  const [salary_offered, setSalary] = useState("");
  const [skills, setRTS] = useState("");
  const [location, setLocation] = useState("");
  const [description, setJobdescription] = useState("");
  const [notice_period, setNoticeperiod] = useState("");
  const [number_of_positions, setNofPositions] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [qualification_required, setQualification] = useState("");
  const [jobid, setJobid] = useState("");
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  useEffect(() => {
    if (selectedJob) {
      setIsEditing(true);
      setJobid(selectedJob.code);
      setCompanyName(selectedJob.company_name);
      setJobrole(selectedJob.job_title);
      setDepartment(selectedJob.department);
      setSalary(selectedJob.salary_offered);
      setLocation(selectedJob.location);
      setJobtype(selectedJob.employment_type);
      setindustry(selectedJob.industry);
      setState(selectedJob.state);
      setRTS(selectedJob.skills);
      setQualification(selectedJob.qualif);
      setNofPositions(selectedJob.number_of_positions);
      setExperiencerequired(selectedJob.experience_required);
      setWorkmode(selectedJob.work_mode);
      setcompanywebsite(selectedJob.company_website);
      setQualification(selectedJob.qualification_required)
      setdisability(selectedJob.disability_eligible);
      setNoticeperiod(selectedJob.notice_period);
      setJobdescription(selectedJob.description);
    } else {
      setIsEditing(false); 
      setJobid("");
      setCompanyName("");
      setJobrole("");
      setDepartment("");
      setSalary("");
      setLocation("");
      setJobtype("");
      setindustry("");
      setState("");
      setRTS("");
      setNofPositions("");
      setQualification("")
      setExperiencerequired("");
      setWorkmode("");
      setcompanywebsite("");
      setdisability("");
      setQualification("");
      setNoticeperiod("");
      setJobdescription("");
    }
  }, [selectedJob]);

  const handleNext = () => {
    const missingFields = [];

    if (!job_title) missingFields.push("Job Title");
    if (!company_name) missingFields.push("Company Name");
    if (!skills) missingFields.push("Skills");
    if (!department) missingFields.push("Department");
    if (!employment_type) missingFields.push("Employment Type");
    if (!work_mode) missingFields.push("Work Mode");
    if (!salary_offered) missingFields.push("Salary Offered");
    if (!location) missingFields.push("Location");
    if (!description) missingFields.push("Job Description");
    if (!qualification_required) missingFields.push("Qualification Required");
    if (!disability) missingFields.push("Disability Eligible");
    if (!experience_required) missingFields.push("Experience Required");
    if (!companywebsite) missingFields.push("Company Website");
    if (!notice_period) missingFields.push("Notice Period");
    if (!industry) missingFields.push("Industry");
    if (!state) missingFields.push("State");
    if (!number_of_positions) missingFields.push("Number of Positions");

    if (missingFields.length > 0) {
      
      setErrorMessage(`Please fill in the following fields: ${missingFields.join(", ")}`);
      setOpenSnackbar(true);
      return;
    }
    const urlRegex = /^(https:\/\/www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/.*)?$/;
    const regex = /^[0-9]*\.?[0-9]+$/;
    const regex1 = /^\d+$/;
    if (!salary_offered.match(regex)) {
      setErrorMessage('In Salary Field Allow Only Numbers');
      setOpenSnackbar(true);
      return;
    }
    if (!number_of_positions || !String(number_of_positions).match(regex1)) {
      setErrorMessage('In Number of Positions Field Allow Only Numbers');
      setOpenSnackbar(true);
      return;
  }

    if (!companywebsite.match(urlRegex)) {
      setErrorMessage('Company website must follow the format: https://www.companyname.com');
      setOpenSnackbar(true);
      return;
    }
    const payload = {
      qualification_required,
      company_name,
      employment_type,
      skills,
      industry,
      work_mode,
      state,
      location,
      description,
      salary_offered,
      department,
      disability_eligible: disability,
      experience_required,
      company_website: companywebsite,
      number_of_positions,
      notice_period,
      job_title,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    if (isEditing) {
      
      axios
        .put(`${UPDATE_JOB}${jobid}/`, payload, config)
        .then((response) => {
          console.log("Job updated:", response);
          setSuccess(true);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((error) => {
          console.log("Error updating job:", error);
        })
        .finally(() => setLoading(false));
    } else {
      
      axios
        .post(`${CREATE_JOB}`, payload, config)
        .then((response) => {
          console.log("Job added:", response);
          setSuccess(true)
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((error) => {
          console.log("Error adding job:", error);
        })
        .finally(() => setLoading(false));
    }

    // closeModal(); 
  };
  const closeSuccessModal = () => {
    setSuccess(false);
    closeModal();
  };

  return (
    <>
      <PurpleDialog
        open={!!modalIsOpen}
        onClose={(e, reason) => {
          if (reason === "backdropClick") return; // keep the form open on outside clicks
          closeModal();
        }}
        title={isEditing ? "Edit Job" : "Add Job"}
        icon={isEditing ? <EditIcon /> : <WorkOutlineIcon />}
        width={940}
        loading={loading}
        actions={
          <>
            <button type="button" className="jd-btn jd-btn-outline" onClick={closeModal}>
              <CloseIcon /> Close
            </button>
            <button type="button" className="jd-btn jd-btn-fill" onClick={handleNext}>
              <CheckIcon /> {isEditing ? "Update" : "Save"}
            </button>
          </>
        }
      >
        <div className="pj-grid">
          <Field label="Company Name">
            <input type="text" placeholder="Company Name" value={company_name} onChange={(e) => setCompanyName(e.target.value)} />
          </Field>
          <Field label="Job Role">
            <input type="text" placeholder="Job Role" value={job_title} onChange={(e) => setJobrole(e.target.value)} />
          </Field>
          <Field label="Department">
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="" disabled hidden>Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.abbreviation}>{d.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Salary">
            <input type="text" placeholder="Salary" value={salary_offered} onChange={(e) => setSalary(e.target.value)} />
          </Field>
          <Field label="Location">
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </Field>
          <Field label="Job Type">
            <select value={employment_type} onChange={(e) => setJobtype(e.target.value)}>
              <option value="" disabled hidden>Select Job Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
              <option value="temporary">Temporary</option>
              <option value="internship">Internship</option>
            </select>
          </Field>

          <Field label="Industry">
            <select value={industry} onChange={(e) => setindustry(e.target.value)}>
              <option value="" disabled hidden>Select Industry</option>
              {industries.map((i) => (
                <option key={i.id} value={i.abbreviation}>{i.name}</option>
              ))}
            </select>
          </Field>
          <Field label="State">
            <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
          </Field>
          <Field label="Qualification">
            <select value={qualification_required} onChange={(e) => setQualification(e.target.value)}>
              <option value="" disabled hidden>Select Qualification</option>
              {qualifications.map((q) => (
                <option key={q.id} value={q.abbreviation}>{q.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Number of Positions">
            <input type="text" placeholder="Number of Positions" value={number_of_positions} onChange={(e) => setNofPositions(e.target.value)} />
          </Field>
          <Field label="Experience Required">
            <input type="text" placeholder="Experience Required" value={experience_required} onChange={(e) => setExperiencerequired(e.target.value)} />
          </Field>
          <Field label="Work Mode">
            <select value={work_mode} onChange={(e) => setWorkmode(e.target.value)}>
              <option value="" disabled hidden>Select Mode of Work</option>
              <option>On-site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </Field>

          <Field label="Company Website">
            <input type="text" placeholder="https://www.companyname.com" value={companywebsite} onChange={(e) => setcompanywebsite(e.target.value)} />
          </Field>
          <Field label="Disability Type">
            <select value={disability} onChange={(e) => setdisability(e.target.value)}>
              <option value="" disabled hidden>Disability Type</option>
              {disabilities.map((d, idx) => (
                <option key={`${d.id}-${idx}`} value={d.abbreviation}>{d.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Notice Period">
            <input type="text" placeholder="Notice Period" value={notice_period} onChange={(e) => setNoticeperiod(e.target.value)} />
          </Field>
        </div>

        <div className="pj-grid pj-two">
          <Field label="Job Description">
            <textarea rows="3" placeholder="Job Description" value={description} onChange={(e) => setJobdescription(e.target.value)} />
          </Field>
          <Field label="Required Technology Stack">
            <textarea rows="3" placeholder="Required Technology Stack" value={skills} onChange={(e) => setRTS(e.target.value)} />
          </Field>
        </div>
      </PurpleDialog>

      <CenterPopup
        open={openSnackbar}
        severity="error"
        title="Please check the form"
        message={errorMessage}
        onClose={handleCloseSnackbar}
      />
      <CenterPopup
        open={success}
        severity="success"
        title={isEditing ? "Job Updated Successfully!" : "Job Created Successfully!"}
        message={`Your job has been ${isEditing ? "updated" : "created"} successfully.`}
        onClose={closeSuccessModal}
      />
    </>
  );
}