import * as React from "react";
import Layout from "../sidenav/Layout";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import CircularProgress from "@mui/material/CircularProgress";
import "./employer.css";
import {
  GET_JOB,
  ACTIVATE_JOB,
  GET_JOB_EMPLOYEE,
  JOBS_LIST_BASED_ON_EMPLOYER,
} from "../../endpoints";
import {
  Grid,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { useParams } from "react-router-dom";
import OnboardCandidates from "./OnboardCandidates";
import { Label } from "@mui/icons-material";


const columns = [
  { id: "job_title", label: "Job Role", minWidth: 100 },
  { id: "experience_required", label: "Experience", minWidth: 100 },
  { id: "salary_offered", label: "Salary", minWidth: 100 },
  { id: "skills", label: "Required Technology Stack", minWidth: 100 },
  { id: "location", label: "Location", minWidth: 100 },
  { id: "description", label: "Job Description", minWidth: 100 },
 
];

export default function Employers({ Employer }) {
  const [tabValue, setTabvalue] = useState("1");
  const [page, setPage] = useState(0);
  const [endDate, setEnddate] = useState();
  const [startDate, setStartDate] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setData] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]); // Filtered data
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false); // State to control Postajob modal
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedJobCode, setSelectedJobCode] = useState(null); // Store selected job code for the dialog
  const { id } = useParams();
  const [loading, setLoading] = useState(false)
  const handleTabchange = (event, newValue) => {
    setTabvalue(newValue);
  };
  useEffect(() => {
    setLoading(true)
    if (id) {
      let payload = {
        code: id,
      };
      axios.post(`${JOBS_LIST_BASED_ON_EMPLOYER}`, payload).then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setData(response.data);
          setFilteredRows(response.data); // Initialize filteredRows
        } else if (
          response.data.message === "No jobs posted by this employer."
        ) {
          setData([]);
          setFilteredRows([]);
        } else {
          console.error("Unexpected response format", response.data);
          setData([]);
          setFilteredRows([]);
        }
      }).catch((error) => {
        console.log(error)
      }).finally(()=> {
        setLoading(false)
      })
    }
  }, [id]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleActive = (row) => {
    const updatedStatus = !row.activation_status;
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };
    setData((prevRows) =>
      prevRows.map((item) =>
        item.code === row.code
          ? { ...item, activation_status: updatedStatus }
          : item
      )
    );

    axios
      .put(
        `${ACTIVATE_JOB}${row.code}/`,
        { activation_status: updatedStatus },
        config
      )
      .then((response) => {
        console.log(response);
      });
  };

  const handleRowClick = (row) => {
    setSelectedRow(row); 
  };

  const openPostJobModal = () => {
    setSelectedJob(null); 
    setIsPostJobOpen(true); 
  };
  const closePostJobModal = () => {
    setSelectedJob(null);
    setIsPostJobOpen(false);
  };
  const handleOpenDialog = (jobCode) => {
    setSelectedRow(jobCode);
    setSelectedJobCode(jobCode); 
    setIsDialogOpen(true); 
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); 
  };

  const openEditJobModal = (job) => {
    setSelectedJob(job);
    setIsPostJobOpen(true);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      
      setFilteredRows(rows);
    } else {
      
      setFilteredRows(
        rows.filter((row) => {
          const fieldsToSearch = [
            row.job_title,
            row.employment_type,
            row.disability_eligible,
            row.location,
            row.industry,
            row.department,
            row.description,
            row.work_mode,
            row.employment_type,
            row.skills,
            row.salary_offered,
            row.experience_required,
          ];
          return fieldsToSearch.some(
            (field) => field && field.toString().toLowerCase().includes(query)
          );
        })
      );
    }
  };

  const handleFilterSubmit = () => {
    
    
    const filterBySearch = rows.filter((row) => {
      const query = searchQuery.toLowerCase();
      const fieldsToSearch = [
        row.job_title,
        row.employment_type,
        row.disability_eligible,
        row.location,
        row.industry,
        row.department,
        row.description,
        row.work_mode,
        row.skills,
        row.salary_offered,
        row.experience_required,
      ];
  
      return fieldsToSearch.some(
        (field) => field && field.toString().toLowerCase().includes(query)
      );
    });
  
    
    const filterByDate = filterBySearch.filter((row) => {
      const rowDate = new Date(row.posted_date).setHours(0, 0, 0, 0); 
      const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
      const end = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;
  
      if (start && end) {
        return rowDate >= start && rowDate <= end;
      } else if (start) {
        return rowDate >= start;
      } else if (end) {
        return rowDate <= end;
      }
  
      return true; 
    });
  
    
    setFilteredRows(filterByDate);
  };

  return (
    <Layout>
       {loading && (
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      )}
      <Box style={{ margin: "0px 5%" }}>
        <Grid container spacing={1} sx={{ marginBottom: 1 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search jobs with experience, skills, job role,etc"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <DatePicker
              label="Start Date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="Start Date"
              popperPlacement="right-start"
              popperClassName="react-datepicker-popper" 
              fullWidth
              maxDate={new Date()}
            />
          </Grid>
          <Grid item xs={2}>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEnddate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="End Date"
              popperPlacement="right-start"
              popperClassName="react-datepicker-popper"
              fullWidth
              maxDate={new Date()}
            />
          </Grid>
          <Grid item xs={2}>
            <button style={{width:'80%'}} onClick={handleFilterSubmit}>submit</button>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h6" gutterBottom>
        Employers
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "2%" }}>
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
              {filteredRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No jobs posted by this employer.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <Tooltip title="Click anywhere to see onboarded candidates for this job" arrow>
                    <TableRow
                      key={row.code} 
                      onClick={() => handleOpenDialog(row)}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      sx={{
                        cursor: "pointer",  
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      {columns.map((column) => (
                        <TableCell key={column.id}>{row[column.id]}</TableCell>
                      ))}
                    </TableRow>
                    </Tooltip>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedRow && (
          <OnboardCandidates
            open={isDialogOpen}
            onClose={handleCloseDialog}
            selectedRow={selectedRow}
          />
        )}
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
