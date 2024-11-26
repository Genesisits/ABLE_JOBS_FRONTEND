import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Typography, Box, Modal, Grid, TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import axios from "axios";
import { CREATE_JOB, UPDATE_JOB } from "../../endpoints";
import "./jobs.css";

const customStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  height: "auto",
  p: 4,
  maxHeight: "80vh",  // Set max height of the modal
  overflowY: "auto",  // Allow scrolling if content exceeds maxHeight
};

export default function Postajob({ modalIsOpen, closeModal, selectedJob }) {
  const [formData, setFormData] = useState({
    company_name: "",
    job_title: "",
    employment_type: "",
    department: "",
    industry: "",
    state: "",
    location: "",
    salary_offered: "",
    qualification_required: "",
    number_of_positions: "",
    experience_required: "",
    work_mode: "",
    company_website: "",
    description: "",
    skills: "",
    notice_period: "",
    blindness: ""  // Assuming this refers to disability or blindness status
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Options for dropdowns
  const departments = ["It & information security", "Data Science & analytics", "Human Resource management", "Engineering(Hardware & Software)", "Consulting","UI,UX design and architecture"];
  const jobTypes = ["Full-time", "Part-time", "Internship", "Contract","Freelance","Temporary"];
  const industries = ["IT and IT services", "Banking,Financial Service,and Insurance", "Retail and E-Commerce", "FinTech", "TeleCommunications","Healthcare and Pharmaceuticals","Education and Training"];
  const qualifications = ["10th Class","12th Class","Diploma","Bachelor's", "Master's","Doctrate" ];
  const workModes = ["Remote", "Hybrid", "On-site"];
  const blindnessOptions = ["Blindness","Low vision","Leprosoy cured persons","Locomotor Disability","Intellectual Disability","Specific Learning Disabilities","Mental Illness","Cerebral Palsy","Specific Learning Disabilities",
"Speech and Language disability","Muscular Dystrophy","Dwarfism","Acid Attack Victim","Parkinson disease","Multiple Sclerosis","Thalassemia","Hemophilia","Sickle Cell disease","Autism Spectrum Disorder","Chronic Neurological conditions","Multiple Disabililties including Deaf, Blindess","Down Syndrome","Epilepsy","Spinal Cord Injury","Others"];

  useEffect(() => {
    if (selectedJob) {
      setIsEditing(true);
      setFormData({ ...selectedJob });
    } else {
      setIsEditing(false);
      setFormData({
        company_name: "",
        job_title: "",
        employment_type: "",
        department: "",
        industry: "",
        state: "",
        location: "",
        salary_offered: "",
        qualification_required: "",
        number_of_positions: "",
        experience_required: "",
        work_mode: "",
        company_website: "",
        description: "",
        skills: "",
        notice_period: "",
        blindness: "",
      });
    }
  }, [selectedJob]);

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key.replace(/_/g, " ")} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;

    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    const endpoint = isEditing ? `${UPDATE_JOB}${selectedJob.code}/` : CREATE_JOB;
    const method = isEditing ? "put" : "post";

    axios[method](endpoint, formData, config)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        console.error("Error submitting job:", error);
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const closeSuccessModal = () => {
    setSuccess(false);
    closeModal();
  };

  return (
    <>
      <Modal open={modalIsOpen} onClose={closeModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={customStyles}>
          <Typography variant="h6" gutterBottom>
            {isEditing ? "Edit Job" : "Add Job"}
          </Typography>

          <Grid container spacing={2}>
            {Object.keys(formData).map((field, index) => {
              if (field === "department" || field === "employment_type" || field === "industry" || field === "qualification_required" || field === "work_mode" || field === "blindness") {
                // Render Select dropdown for these fields
                let options = [];
                if (field === "department") options = departments;
                if (field === "employment_type") options = jobTypes;
                if (field === "industry") options = industries;
                if (field === "qualification_required") options = qualifications;
                if (field === "work_mode") options = workModes;
                if (field === "blindness") options = blindnessOptions;

                return (
                  <Grid item xs={12} sm={6} key={index}>
                    <FormControl fullWidth error={!!errors[field]}>
                      <InputLabel>{field.replace(/_/g, " ").toUpperCase()}</InputLabel>
                      <Select
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                      >
                        {options.map((option, idx) => (
                          <MenuItem value={option} key={idx}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors[field] && <FormHelperText>{errors[field]}</FormHelperText>}
                    </FormControl>
                  </Grid>
                );
              } else {
                // Render TextField for other fields
                return (
                  <Grid item xs={12} sm={6} key={index}>
                    <TextField
                      fullWidth
                      label={field.replace(/_/g, " ").toUpperCase()}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      error={!!errors[field]}
                      helperText={errors[field]}
                      variant="outlined"
                    />
                  </Grid>
                );
              }
            })}
          </Grid>

          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={loading}
              sx={{ minWidth: "100px", marginRight: "8px" }}
            >
              {loading ? "Saving..." : isEditing ? "Update" : "Save"}
            </Button>
            <Button variant="outlined" onClick={closeModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {success && (
        <Modal open={success} onClose={closeSuccessModal}>
          <Box sx={{ ...customStyles, width: "40%" }}>
            <Typography>
              {isEditing ? "Job Updated Successfully!" : "Job Created Successfully!"}
            </Typography>
            <Button variant="contained" onClick={closeSuccessModal} sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
}
