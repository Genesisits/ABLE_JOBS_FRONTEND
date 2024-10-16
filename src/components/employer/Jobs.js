import { React,useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Layout from "../sidenav/Layout";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import "./jobs.css";
import { BASE_URL, CREATE_JOB, DELETE_JOB, GET_JOB, UPDATE_JOB } from "../../endpoints";
import axios from "axios";

// Modal custom styles
const customStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "company_name", label: "Company Name", minWidth: 150 },
  { id: "job_role", label: "Job Role", minWidth: 100 },
  { id: "experience", label: "Experience", minWidth: 100 },
  { id: "salary", label: "Salary", minWidth: 100 },
  // { id: "work_mode", label: "Mode", minWidth: 100 },
  {
    id: "required_technology_stack",
    label: "Required Technology Stack",
    minWidth: 100,
  },
  { id: "location", label: "Location", minWidth: 100 },
  { id: "job_description", label: "Job Description", minWidth: 100 },
  { id: "status", label: "Actions", minWidth: 100 },
];

function createData(
  company_name,
  job_role,
  experience,
  salary,
  mode,
  required_technology_stack,
  location,
  job_description,
  status
) {
  return {
    company_name,
    job_role,
    experience,
    salary,
    mode,
    required_technology_stack,
    location,
    job_description,
    status,
  };
}


export default function Jobs() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [work_mode, setWorkmode] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [job_role, setJobrole] = useState("");
  const [job_type, setJobtype] = useState("");
  const [experience_years, setExperienceyears] = useState("");
  const [experience_months, setExperiencemonths] = useState("");
  const [salary, setSalary] = useState("");
  const [required_technology_stack, setRTS] = useState("");
  const [location, setLocation] = useState("");
  const [job_description, setJobdescription] = useState("");
  const [notice_period,setNoticeperiod] = useState("")
  const [rows, setData] = useState([])
  const [jobid, setJobid] = useState("")
  
  useEffect(() => {
    axios.get(`${GET_JOB}`)
    .then(response => {
      setData(response.data)
    })  
  },[])
  const openModal = (job = null) => {
    if (job) {
      setIsEditing(true);
      setJobid(job.code)
      setCompanyName(job.company_name);
      setJobrole(job.job_role);
      setJobtype(job.job_type);
      setExperienceyears(job.experience_years);
      setExperiencemonths(job.experience_months);
      setSalary(job.salary);
      setRTS(job.required_technology_stack);
      setLocation(job.location);
      setNoticeperiod(job.notice_period)
      setJobdescription(job.job_description);
    } else {
      setIsEditing(false);
      // Clear form for adding a new job
      setCompanyName("");
      setJobrole("");
      setJobtype("");
      setExperienceyears("");
      setExperiencemonths("");
      setSalary("");
      setRTS("");
      setLocation("");
      setJobdescription("");
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleNext = () => {
    const payload = {
      company_name: company_name,
      job_role: job_role,
      notice_period,
      job_type,
      work_mode,
      experience_years,
      experience_months,
      salary,
      required_technology_stack,
      location,
      job_description,
    };
    let config = {
      headers : {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }
    console.log(config)
    if (isEditing) {
      console.log("Editing job:", payload);
      axios.put(`${UPDATE_JOB}${jobid}/`,payload,config)
      .then(response => {
        console.log(response)
      })
      // Update your state or API call for editing here
    } else {
      console.log("Adding job:", payload);
      axios.post(`${CREATE_JOB}`,payload,config)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
         
      });      
    }

    closeModal();
  };

  const handleEdit = (row) => {
    openModal(row);
  };

  const handleDelete = (row) => {
    console.log("Deleting row:", row);
    axios.delete(`${DELETE_JOB}${row.code}/`)  
      .then(res => {  
        console.log(res);  
        console.log(res.data);  
        setData(res.data)
      })  
    // Add logic to handle row deletion
  };

  return (
    <Layout>
      <button onClick={() => openModal()}>Post a Job</button>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="employ">
          <Box sx={customStyles}>
            <h2>{isEditing ? "Edit Job" : "Add Job"}</h2>
            <div className="employ">
              <div className="employ-column">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={company_name}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Job Role"
                  value={job_role}
                  onChange={(e) => setJobrole(e.target.value)}
                />
                <select
                  value={job_type}
                  onChange={(e) => setJobtype(e.target.value)}
                >
                  <option disabled>Job Type</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                  <option>Temporary</option>
                  <option>Internship</option>
                </select>
                <div className="experience-group">
                  <input
                    type="text"
                    placeholder="Experience in Years"
                    value={experience_years}
                    onChange={(e) => setExperienceyears(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Experience in Months"
                    value={experience_months}
                    onChange={(e) => setExperiencemonths(e.target.value)}
                  />
                </div>
              </div>

              <div className="employ-column">
                <input
                  type="text"
                  placeholder="Salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Required Technology Stack"
                  value={required_technology_stack}
                  onChange={(e) => setRTS(e.target.value)}
                />
                <select
                  value={work_mode}
                  onChange={(e) => setWorkmode(e.target.value)}
                >
                  <option disabled>Mode of work</option>
                  <option>On-site</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <textarea
                value={job_description}
                onChange={(e) => setJobdescription(e.target.value)}
                placeholder="Job Description"
                rows="4"
              />
              <input
              type="text"
              value={notice_period}
              onChange={(e) => setNoticeperiod(e.target.value)}
              placeholder="notice period"
              />
            </div>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {isEditing ? "Update" : "Save"}
            </Button>
          </Box>
        </div>
      </Modal>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                    sx={{ backgroundColor: "#2840b7", color: "white" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.company_name}
                  >
                    {columns.map((column) => {
                      if (column.id === "status") {
                        return (
                          <TableCell key={column.id}>
                            <EditIcon
                              onClick={() => handleEdit(row)}
                              style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                            <DeleteIcon
                              onClick={() => handleDelete(row)}
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id}>{row[column.id]}</TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Layout>
  );
}
