/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Layout from "../sidenav/Layout";
import { EMPLOYERS_LIST, JOBS_LIST_BASED_ON_EMPLOYER } from "../../endpoints";
import OnboardCandidates from "./OnboardCandidates";

export default function Employers() {
  const [expanded, setExpanded] = useState(null);
  const [employersData, setEmployersData] = useState([]);
  const [selectedEmployerDetails, setSelectedEmployerDetails] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [docData, setDocData] = useState("");
  const [employerPage, setEmployerPage] = useState(0);
  const [employerRowsPerPage, setEmployerRowsPerPage] = useState(5);

  // Fetch Employers List
  useEffect(() => {
    axios
      .get(EMPLOYERS_LIST)
      .then((response) => {
        setEmployersData(response.data);
      })
      .catch((error) => console.error("Error fetching employers:", error));
  }, []);

  // Handle Accordion Click
  const handleExpansion = (id) => (event, isExpanded) => {
    if (isExpanded) {
      setExpanded(id);
      if (!selectedEmployerDetails[id]) {
        fetchEmployerDetails(id);
      }
    } else {
      setExpanded(null);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  // Fetch Job Details for Selected Employer
  const fetchEmployerDetails = (id) => {
    axios
      .post(JOBS_LIST_BASED_ON_EMPLOYER, { code: id })
      .then((response) => {
        setSelectedEmployerDetails((prevState) => ({
          ...prevState,
          [id]: Array.isArray(response.data) ? response.data : [],
        }));
      })
      .catch((error) =>
        console.error("Error fetching employer details:", error)
      );
  };

  // Pagination Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (job) => {
    setSelectedRow(job);
    // setSelectedJobCode(jobCode); // Set the selected job code
    setIsDialogOpen(true);
  };

  const handleOpenPopup = (data) => {
    setDocData(data);
    setOpen(true);
  };


  const handleChangeEmployerPage = (event, newPage) => {
    setEmployerPage(newPage);
  };

  const handleChangeEmployerRowsPerPage = (event) => {
    setEmployerRowsPerPage(parseInt(event.target.value, 10));
    setEmployerPage(0);
  };

  return (
    <Layout>
      <div>
        {employersData.map((employer) => (
          <Accordion
            key={employer.code}
            expanded={expanded === employer.code}
            onChange={handleExpansion(employer.code)}
            style={{
              marginBottom: "10px",
              borderRadius: "10px",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${employer.code}-content`}
              id={`panel${employer.code}-header`}
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: "10px",
                padding: "10px 20px",
              }}
            >
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  color: "#333",
                }}
              >
                {employer.company_name}
              </Typography>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "center",
                  // marginTop: "5%",
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleOpenPopup(employer.pan)}
                >
                  PAN
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() =>
                    handleOpenPopup(employer.registration_certificate)
                  }
                >
                  <Typography style={{ fontSize: "7px" }}>
                    Registration Certificate
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  onClick={() => handleOpenPopup(employer.gst)}
                >
                  GST
                </Button>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className="max-w-3xl h-[100vh] relative">
                    <button
                      onClick={() => setOpen(false)}
                      className="absolute top-2 right-1 text-xl font-bold bg-transparent border-none cursor-pointer"
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <DialogTitle>Document Preview</DialogTitle>
                    {/* </DialogHeader> */}

                    {/* File Viewer */}
                    {docData ? (
                      docData.endsWith(".pdf") ? (
                        // PDF Viewer using an iframe
                        <iframe
                          src={docData}
                          className="w-full h-[100vh]"
                          style={{ border: "none" }}
                        />
                      ) : docData.endsWith(".doc") ||
                        docData.endsWith(".docx") ? (
                        // Word Document Viewer using Microsoft Office Viewer
                        <iframe
                          src={`https://view.officeapps.live.com/op/embed.aspx?src=${window.location.origin + docData}`}
                          className="w-full h-[100vh]"
                          style={{ border: "none" }}
                        />
                      ) : (
                        <p>Unsupported file type</p>
                      )
                    ) : (
                      <p>No file selected</p>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </AccordionSummary>
            <AccordionDetails style={{ padding: "20px" }}>
              <TableContainer
                component={Paper}
                style={{ borderRadius: "10px", overflow: "hidden" }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#0077b6" }}>
                      <TableCell style={tableHeaderStyle}>Job Title</TableCell>
                      <TableCell style={tableHeaderStyle}>
                        Employment Type
                      </TableCell>
                      <TableCell style={tableHeaderStyle}>Skills</TableCell>
                      <TableCell style={tableHeaderStyle}>Salary</TableCell>
                      <TableCell style={tableHeaderStyle}>Location</TableCell>
                      <TableCell style={tableHeaderStyle}>Experience</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedEmployerDetails[employer.code] && Array.isArray(selectedEmployerDetails[employer.code]) ? (
                      selectedEmployerDetails[employer.code]
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((job, i) => (
                          <TableRow
                            key={i}
                            style={{
                              backgroundColor:
                                i % 2 === 0 ? "#f9f9f9" : "#ffffff",
                              transition: "background 0.3s",
                            }}
                            onClick={() => handleRowClick(job)}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#e3f2fd")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                i % 2 === 0 ? "#f9f9f9" : "#ffffff")
                            }
                          >
                            <TableCell style={tableCellStyle}>
                              {job.job_title}
                            </TableCell>
                            <TableCell style={tableCellStyle}>
                              {job.employment_type}
                            </TableCell>
                            <TableCell style={tableCellStyle}>
                              {job.skills}
                            </TableCell>
                            <TableCell style={tableCellStyle}>
                              ₹{job.salary_offered}
                            </TableCell>
                            <TableCell style={tableCellStyle}>
                              {job.location}, {job.state}
                            </TableCell>
                            <TableCell style={tableCellStyle}>
                              {job.experience_required} yrs
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          style={{
                            textAlign: "center",
                            padding: "10px",
                            fontStyle: "italic",
                            color: "#555",
                          }}
                        >
                          Loading job details...
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {selectedRow && (
                  <OnboardCandidates
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    selectedRow={selectedRow}
                  />
                )}
                {selectedEmployerDetails[employer.code] && (
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={selectedEmployerDetails[employer.code].length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{
                      backgroundColor: "#f8f9fa",
                      borderTop: "1px solid #ddd",
                    }}
                  />
                )}
              </TableContainer>
            </AccordionDetails>
          </Accordion>
          
        ))}
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={employersData.length}
          rowsPerPage={employerRowsPerPage}
          page={employerPage}
          onPageChange={handleChangeEmployerPage}
          onRowsPerPageChange={handleChangeEmployerRowsPerPage}
          style={{
            backgroundColor: "#f8f9fa",
            borderTop: "1px solid #ddd",
          }}
        />
      </div>
    </Layout>
  );
}

const tableCellStyle = {
  padding: "10px",
  textAlign: "center",
  fontSize: "0.9rem",
  borderBottom: "1px solid #ddd",
};

const tableHeaderStyle = {
  backgroundColor: "#000000", // Black background
  color: "#ffffff", // White text
  fontWeight: "bold",
  textTransform: "uppercase",
  padding: "14px",
  textAlign: "center",
  borderBottom: "3px solid #333333", // Dark grey bottom border for depth
};
