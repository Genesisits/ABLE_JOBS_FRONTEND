import * as React from "react";
import Layout from "../sidenav/Layout";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
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
// import "./jobs.css";
// import Postajob from "./postajob";
// import AppliedCandidatesDialog from "./Appliedcandidates";

const columns = [
  { id: "job_title", label: "Job Role", minWidth: 100 },
  { id: "experience_required", label: "Experience", minWidth: 100 },
  { id: "salary_offered", label: "Salary", minWidth: 100 },
  { id: "skills", label: "Required Technology Stack", minWidth: 100 },
  { id: "location", label: "Location", minWidth: 100 },
  { id: "description", label: "Job Description", minWidth: 100 },
  // { id: "status", label: "Actions", minWidth: 150 },
];

export default function Employers({ Employer }) {
  const [tabValue, setTabvalue] = useState("1");
  const [page, setPage] = useState(0);
  const [endDate, setEnddate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
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
  const handleTabchange = (event, newValue) => {
    setTabvalue(newValue);
  };
  useEffect(() => {
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
      });
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
    setSelectedRow(row); // Update state with the selected row data
  };

  const openPostJobModal = () => {
    setSelectedJob(null); // Set the selected job for editing
    setIsPostJobOpen(true); // Open the modal
  };
  const closePostJobModal = () => {
    setSelectedJob(null);
    setIsPostJobOpen(false);
  };
  const handleOpenDialog = (jobCode) => {
    setSelectedRow(jobCode);
    setSelectedJobCode(jobCode); // Set the selected job code
    setIsDialogOpen(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  const openEditJobModal = (job) => {
    setSelectedJob(job);
    setIsPostJobOpen(true);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRows(
      rows.filter((row) =>
        Object.values(row).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(query)
        )
      )
    );
  };

  return (
    <Layout>
      <Box style={{margin:'0px 10%'}}>
        <Grid container sx={{ marginBottom: 1 }}>
          <Grid item xs={4}>
           <TextField
              fullWidth
              variant="outlined"
              placeholder="Search jobs"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={4}>
            <DatePicker
              label="Start Date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="Start Date"
              popperPlacement="right-start"
              popperClassName="react-datepicker-popper" // Aligns the dropdown on the right
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEnddate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="End Date"
              popperPlacement="right-start"
              popperClassName="react-datepicker-popper"
              fullWidth
            />
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
              {rows.length === 0 ? (
                // Display message if no data is available
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No jobs posted by this employer.
                  </TableCell>
                </TableRow>
              ) : (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      onClick={() => handleOpenDialog(row)}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.company_name}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      {columns.map((column) => {
                        if (column.id === "status") {
                          return <TableCell key={column.id}></TableCell>;
                        }
                        return (
                          <TableCell key={column.id}>
                            {row[column.id]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
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
