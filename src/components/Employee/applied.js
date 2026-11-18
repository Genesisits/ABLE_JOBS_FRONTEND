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
import JobDetailsDialog from './JobDetailsDialog';
import './applied.css';

const columns = [
  { id: "code", label: "Job code", minWidth: 5 },
  { id: "job_title", label: "Job Title", minWidth: 100 },
  { id: "company_name", label: "Company Name", minWidth: 100 },
  { id: "location", label: "Location", minWidth: 100 },
  { id: "number_of_positions", label: "Number of Positions", minWidth: 100 },
  { id: "applied_at", label: "Applied On", minWidth: 100 },
  { id: "application_status", label: "Status", minWidth: 100 },
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
      setData(response.data);
    })
    .catch(error => {
      console.error('Error fetching applied jobs:', error);
    });
  }
}, [token]);

  return (
    <Layout>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "max(320px, calc(100vh - 320px))" }}>
          <Table stickyHeader aria-label="sticky table" className="ajh-stack">
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
        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
          {columns.map((column) => {
                        if (column.id === "status") {
                          return (
                            <TableCell key={column.id} data-label={column.label}>
                              <VisibilityIcon
                                style={{ cursor: "pointer", marginLeft: "12%" }}
                                fontSize="small"
                                onClick={() => handleOpenDialog(row)} 
                              />
                            </TableCell>
                          );
                        }
                        if (column.id === "applied_at") {
                          return (
                            <TableCell key={column.id} data-label={column.label}>
                              {row.applied_at ? new Date(row.applied_at).toLocaleDateString() : "-"}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} data-label={column.label}>
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
      <JobDetailsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        job={selectedJob}
        primaryLabel="Applied"
      />
    </Layout>
  );
}

export default Applied;