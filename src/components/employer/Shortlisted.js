import * as React from "react";
import Layout from "../sidenav/Layout";
import Paper from "@mui/material/Paper";
import { GET_JOB,ACTIVATE_JOB, SHORTLIST_APPLICATIONS } from "../../endpoints";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";
import axios from "axios";
import "./jobs.css";
import Postajob from "./postajob"; // Import the Postajob component
import AppliedCandidatesDialog from "./Appliedcandidates"; 
import ShortListedCandidates from "./ShortListedCandidates";

const columns = [
  { id: "job_title", label: "Job Role", minWidth: 100 },
  { id: "experience_required", label: "Experience", minWidth: 100 },
  { id: "salary_offered", label: "Salary", minWidth: 100 },
  { id: "skills", label: "Required Technology Stack", minWidth: 100 },
  { id: "location", label: "Location", minWidth: 100 },
  { id: "description", label: "Job Description", minWidth: 100 },
  { id: "status", label: "Actions", minWidth: 150 },
];

export default function Shortlisted() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false); // State to control Postajob modal
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJobCode, setSelectedJobCode] = useState(null); // Store selected job code for the dialog

  useEffect(() => {
    // Fetch job data from API
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
    axios.get(`${SHORTLIST_APPLICATIONS}`,config).then((response) => {
      setData(response.data);
    });
  }, []);

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
        item.code === row.code ? { ...item, activation_status: updatedStatus } : item
      ));
  
    axios
      .put(`${ACTIVATE_JOB}${row.code}/`,{ activation_status: updatedStatus },config)
      .then((response) => {
        console.log(response)
      });
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
    setSelectedJobCode(jobCode);  // Set the selected job code
    setIsDialogOpen(true);         // Open the dialog
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  const openEditJobModal = (job) => {
    setSelectedJob(job); 
    setIsPostJobOpen(true);
  }

  return (
    <div>
      <Layout>
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
                                style={{ cursor: "pointer", marginRight: "2px" }}
                                fontSize="small"
                                onClick={() => handleOpenDialog(row.code)} // Pass job code to dialog
                              />
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id}>
                            {row[column.id]}
                          </TableCell>
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

        {/* Post a Job Modal */}
        <Postajob modalIsOpen={isPostJobOpen} closeModal={closePostJobModal} selectedJob={selectedJob}  />

        {/* Applied Candidates Dialog */}
        <ShortListedCandidates
          open={isDialogOpen}
          onClose={handleCloseDialog}
          jobCode={selectedJobCode} // Pass the jobCode to the dialog
        />
      </Layout>
    </div>
  );
}
