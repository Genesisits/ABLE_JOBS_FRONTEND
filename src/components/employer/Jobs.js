import React, { useState, useEffect } from "react";
import resume1 from "../../images/Python.pdf";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import Layout from "../sidenav/Layout";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import "./jobs.css";
import { CREATE_JOB, DELETE_JOB, GET_JOB, UPDATE_JOB, APPLIED_CANDIDATES, ACTIVATE_JOB } from "../../endpoints";
import { PDFReader } from "reactjs-pdf-reader";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
// Modal custom styles
const customStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  height:"650px",
  p: 4,
};

function createresumesData(first_name, last_name, email, mobile_number) {
  return {first_name, last_name, email, mobile_number };
}

const columns = [
  // { id: "job_id", label: "Job ID", minWidth: 150 },
  { id: "job_title", label: "Job Role", minWidth: 100 },
  { id: "experience_required", label: "Experience", minWidth: 100 },
  { id: "salary_offered", label: "Salary", minWidth: 100 },
  // { id: "work_mode", label: "Mode", minWidth: 100 },
  {
    id: "skills",
    label: "Required Technology Stack",
    minWidth: 100,
  },
  { id: "location", label: "Location", minWidth: 100 },
  { id: "description", label: "Job Description", minWidth: 100 },
  { id: "status", label: "Actions", minWidth: 150 },
];

function createData(
  company_name,
  job_title,
  experience_required,
  salary_offered,
  mode,
  skills,
  location,
  description,
  status
) {
  return {
    company_name,
    job_title,
    experience_required,
    salary_offered,
    mode,
    skills,
    location,
    description,
    status,
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const departments = [
  { id: 1, name: "IT & Information security", abbreviation: "IT" },
  { id: 2, name: "Data Science & analytics", abbreviation: "DS" },
  { id: 3, name: "Human Resource Management", abbreviation: "HRM" },
  { id: 4, name: "Engineering(Hardware & Software)", abbreviation: "Engg" },
  { id: 5, name: "Consulting", abbreviation: "consulting" },
  { id: 6, name: "UI, UX design and architecture", abbreviation: "ui&ux" },
];

export default function Jobs() {
  const [page, setPage] = useState(0);
  const [row, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [work_mode, setWorkmode] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [job_title, setJobrole] = useState("");
  const [employment_type, setJobtype] = useState("");
  const [department, setDepartment] = useState("");
  const [industry, setindustry] = useState("");
  const [state, setState] = useState("");
  const [disability, setdisability] = useState("");
  const [companywebsite, setcompanywebsite] = useState("");
  // const [experience_years, setExperienceyears] = useState("");
  const [experience_required, setExperiencerequired] = useState("");
  const [salary_offered, setSalary] = useState("");
  const [skills, setRTS] = useState("");
  const [location, setLocation] = useState("");
  const [description, setJobdescription] = useState("");
  const [notice_period, setNoticeperiod] = useState("");
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [rows, setData] = useState([]);
  const [jobid, setJobid] = useState("");
  const [open, setOpen] = useState(false);
  const [opendeletedialog, setOpenDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [confirmation, setConfirm] = useState(false);
  const [number_of_positions, setNofPositions] = useState("");

  const handleConfirm = () => {
    setConfirm(false);
  };
  const handleDelete = (row) => {
    setRowToDelete(row);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`${DELETE_JOB}${rowToDelete.code}/`)
      .then((res) => {
        setOpenDeleteDialog(false);
        setConfirm(true);
      })
      .catch((error) => {
        console.error("There was an error deleting the row!", error);
      });
    setOpen(false);
  };

  const handleClosedeleteDialog = () => {
    setOpenDeleteDialog(false);
    setRowToDelete(null); // Reset the rowToDelete when closing the dialog
  };

  const getResumes = (getres) => {
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };
    axios.get(`${APPLIED_CANDIDATES}${getres.code}`,config).then((response) => {
      setResumes(response.data)
    });
  }

  const handleClickOpen = (row) => {
    setOpen(true);
    getResumes(row)
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get(`${GET_JOB}`).then((response) => {
      setData(response.data);
    });
  }, []);
  const openModal = (job = null) => {
    if (job) {
      setIsEditing(true);
      setJobid(job.code);
      setCompanyName(job.company_name);
      setJobrole(job.job_title);
      setJobtype(job.employment_type);
      // setExperienceyears(job.experience_years);
      setExperiencerequired(job.experience_required);
      setSalary(job.salary_offered);
      setNofPositions(job.number_of_positions);
      setRTS(job.skills);
      setLocation(job.location);

      setNoticeperiod(job.notice_period);
      setJobdescription(job.description);
    } else {
      setIsEditing(false);
      // Clear form for adding a new job
      setCompanyName("");
      setJobrole("");
      setJobtype("");
      // setExperienceyears("");
      setExperiencerequired("");
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
  const handleShowResumes = (resume) => {
    setSelectedResume(resume);
    setResumeModalOpen(true);
  };
  const handleNext = () => {
    const payload = {
    company_name:company_name,
    employment_type:employment_type,
    skills:skills,
    industry:industry,
    work_mode:work_mode,
    state:state,
    location:location,
    description:description,
    salary_offered:salary_offered,
    department:department,
    disability_eligible:disability,
    experience_required:experience_required,
    company_website:companywebsite,
    number_of_positions:number_of_positions,
    notice_period:notice_period,
    job_title:job_title,
    };
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };
    console.log(config);
    if (isEditing) {
      console.log("Editing job:", payload);
      axios.put(`${UPDATE_JOB}${jobid}/`, payload, config).then((response) => {
        console.log(response);
      });
      // Update your state or API call for editing here
    } else {
      console.log("Adding job:", payload);
      axios
        .post(`${CREATE_JOB}`, payload, config)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {});
    }

    closeModal();
  };

  const handleEdit = (row) => {
    openModal(row);
  };

  const [checked, setChecked] = React.useState(true);

  const handleSwitch = (event, index) => {
    const updatedResumes = [...resumes];
    updatedResumes[index].checked = event.target.checked;
    // setResumes(updatedResumes);
    // console.log(resumes);
  };

  const handleActive = (row) => {
    const updatedStatus = !row.activation_status;
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };
  
    axios
      .put(`${ACTIVATE_JOB}${row.code}/`,{ activation_status: updatedStatus },config)
      .then((response) => {
        setRows(prevRows =>
          prevRows.map(r => 
            r.code === row.code ? { ...r, activation_status: updatedStatus } : r
          )
        );
      });
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
          <h2 style={{margin:"0",textAlign:"center"}}>{isEditing ? "Edit Job" : "Add Job"}</h2>

          {/* Row 1 */}
          <div className="employ-row">
            <input
              type="text"
              placeholder="Company Name"
              value={company_name}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Job Role"
              value={job_title}
              onChange={(e) => setJobrole(e.target.value)}
            />
            <input
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          {/* Row 2 */}
          <div className="employ-row">
            <input
              type="text"
              placeholder="Salary"
              value={salary_offered}
              onChange={(e) => setSalary(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <select
              value={employment_type}
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
          </div>

          {/* Row 3 */}
          <div className="employ-row">
            <input
              type="text"
              placeholder="Industry"
              value={industry}
              onChange={(e) => setindustry(e.target.value)}
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <input
              type="text"
              placeholder="Required Technology Stack"
              value={skills}
              onChange={(e) => setRTS(e.target.value)}
            />
          </div>

          {/* Row 4 */}
          <div className="employ-row">
            <input
              type="text"
              placeholder="Number of Positions"
              value={number_of_positions}
              onChange={(e) => setNofPositions(e.target.value)}
            />
            <input
              type="text"
              placeholder="Experience Required"
              value={experience_required}
              onChange={(e) => setExperiencerequired(e.target.value)}
            />
            <select
              value={work_mode}
              onChange={(e) => setWorkmode(e.target.value)}
            >
              <option disabled>Mode of Work</option>
              <option>On-site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>

          {/* Row 5 */}
          <div className="employ-row">
            <input
              type="text"
              placeholder="Company Website"
              value={companywebsite}
              onChange={(e) => setcompanywebsite(e.target.value)}
            />
            {/* <input
              type="text"
              placeholder="Disability Eligible"
              value={disability}
              onChange={(e) => setdisability(e.target.value)}
            /> */}
             <select
              value={disability}
              onChange={(e) => setdisability(e.target.value)}
            >
              <option disabled>Disability Eligible</option>
              <option>Visual impairment</option>
              <option>Low vision</option>
              <option>Mental Illness</option>
              <option>Cerebral Palsy</option>
              <option>Acid Attack Victim</option>
              <option>Hemophilia</option>
            </select>
             <input
            type="text"
            value={notice_period}
            onChange={(e) => setNoticeperiod(e.target.value)}
            placeholder="Notice Period"
          />
          </div>

          {/* Description and Notice Period */}
          <textarea
            value={description}
            onChange={(e) => setJobdescription(e.target.value)}
            placeholder="Job Description"
            rows="4"
          />
         <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
        <Button variant="outlined" color="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {isEditing ? "Update" : "Save"}
        </Button>
      </div>
        </Box>
      </div>
    </Modal>

      <div>
        <Dialog open={opendeletedialog} onClose={handleClosedeleteDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this row?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosedeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={confirmation} onClose={onclose}>
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
            <DialogContentText>Deleted Successfully</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirm} color="primary">
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Resumes
            </Typography>
          </Toolbar>
        </AppBar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell align="right">Last Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Mobile Number</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resumes.map((resume, index) => (
                <StyledTableRow key={resume.first_name}>
                  <StyledTableCell component="th" scope="row">
                    {resume.first_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {resume.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{resume.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    {resume.mobile_number}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <VisibilityIcon
                      onClick={() => handleShowResumes(resume.resume)}
                      style={{ cursor: "pointer" }}
                    />
                    <Switch
                      checked={resume.checked}
                      onChange={(event) => handleSwitch(event, index)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <Dialog
              fullScreen
              open={resumeModalOpen}
              onClose={() => setResumeModalOpen(false)}
              TransitionComponent={Transition}
            >
              <AppBar sx={{ position: "relative" }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => setResumeModalOpen(false)}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                  >
                    Resume Viewer
                  </Typography>
                </Toolbar>
              </AppBar>
              <Box sx={{ p: 2 }}>
                {selectedResume ? (
                  <PDFReader url={selectedResume} showAllPage={true} />
                ) : (
                  <Typography>No Resume Available</Typography>
                )}
              </Box>
            </Dialog>
          </Table>
        </TableContainer>
      </Dialog>
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
                            <VisibilityIcon
                              onClick={() => handleClickOpen(row)}
                              style={{ cursor: "pointer", marginRight: "2px" }}
                              fontSize="small"
                            />
                            <EditIcon
                              onClick={() => handleEdit(row)}
                              style={{ cursor: "pointer", marginRight: "2px" }}
                              fontSize="small"
                            />
                            <Switch
                              checked={row.activation_status}
                              onChange={() => handleActive(row)}
                              inputProps={{ "aria-label": "controlled" }}
                               size="small"
                            />
                            {/* <DeleteIcon
                              onClick={() => handleDelete(row)}
                              style={{ cursor: "pointer", color: "red" }}
                              fontSize="small"
                            /> */}
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
