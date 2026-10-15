import * as React from 'react';
import Layout from '../sidenav/Layout';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState, useEffect , useRef} from 'react';
import { APPLIED_JOB } from './../../endpoints';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import './applied.css';

const columns = [
  { id: "code", label: "Job code", minWidth: 5 },
  { id: "job_title", label: "Job Title", minWidth: 100 },
  { id: "company_name", label: "Company Name", minWidth: 100 },
  { id: "location", label: "Location", minWidth: 100 },
  { id: "number_of_positions", label: "Number of Positions", minWidth: 100 },
  { id: "status", label: "Actions", minWidth: 150 },
];

function Applied() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const token = localStorage.getItem('access_token'); // Fetch the token from localStorage or wherever it is stored

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const hasFetched = useRef(false);
  const handleOpenDialog = (Job) => {
    setSelectedJob(Job);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
  };
useEffect(() => {
  if (!hasFetched.current) {
    hasFetched.current = true; // Mark as fetched
    axios.get(`${APPLIED_JOB}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setData(Array.isArray(response.data) ? response.data : []);
    })
    .catch(error => {
      console.error('Error fetching applied jobs:', error);
      setData([]);
    });
  }
}, [token]);

  return (
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
            {rows.length === 0 ? (
    <TableRow>
      <TableCell
  colSpan={columns.length}
  align="center"
  sx={{ color: "red", fontStyle: "italic" }}
>
  No applied jobs found
</TableCell>
    </TableRow>
  ) : (
    rows
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.company_name}>
          {columns.map((column) => {
                        if (column.id === "status") {
                          return (
                            <TableCell key={column.id}>
                              <VisibilityIcon
                                style={{ cursor: "pointer", marginLeft: "12%" }}
                                fontSize="small"
                                onClick={() => handleOpenDialog(row)} 
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
      ))
  )}
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>Job Details</DialogTitle>
        <DialogContent>
          {selectedJob && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr ', gap: '8px' }}>
               <p><strong>Job Title:</strong> {selectedJob.job_title}</p>
        <p><strong>Company:</strong> {selectedJob.company_name}</p>
        <p><strong>Location:</strong> {selectedJob.location}</p>
        <p><strong>Employment Type:</strong> {selectedJob.employment_type}</p>
        <p><strong>Skills Required:</strong> {selectedJob.skills}</p>
        <p><strong>Department:</strong> {selectedJob.department}</p>
        <p><strong>Industry:</strong> {selectedJob.industry}</p>
        <p><strong>Work Mode:</strong> {selectedJob.work_mode}</p>
        <p><strong>Salary Offered:</strong> {selectedJob.salary_offered}</p>
        <p><strong>Experience Required:</strong> {selectedJob.experience_required}</p>
        <p><strong>Company Website:</strong> <a href={selectedJob.company_website} target="_blank" rel="noopener noreferrer">{selectedJob.company_website}</a></p>
        <p><strong>Number of Positions:</strong> {selectedJob.number_of_positions}</p>
        <p><strong>Notice Period:</strong> {selectedJob.notice_period}</p>
        <p><strong>Job Code:</strong> {selectedJob.code}</p>
        <p><strong>Description:</strong> {selectedJob.description}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
          {/* <Button onClick={handleApplyNow} color="secondary" variant="contained">Apply Now</Button> */}
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export default Applied;
