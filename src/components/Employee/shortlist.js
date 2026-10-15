import * as React from 'react';
import Layout from '../sidenav/Layout';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState, useEffect , useRef} from 'react';
import { SHORTLIST_JOB } from './../../endpoints';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from '@mui/material/Button';
import './applied.css';

const columns = [
  { id: "code", label: "Job code", minWidth: 5 },
  { id: "job_title", label: "Job Title", minWidth: 100 },
  { id: "company_name", label: "Company Name", minWidth: 100 },
  { id: "location", label: "Location", minWidth: 100 },
  { id: "number_of_positions", label: "Number of Positions", minWidth: 100 },
];

function Shortlist() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setData] = useState([]);

  const token = localStorage.getItem('access_token'); // Fetch the token from localStorage or wherever it is stored

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const hasFetched = useRef(false);

useEffect(() => {
  if (!hasFetched.current) {
    hasFetched.current = true; // Mark as fetched
    axios.get(`${SHORTLIST_JOB}`, {
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
  No short listed jobs found
</TableCell>
    </TableRow>
  ) : (
    rows
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
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{
                                padding: '4px 8px',
                                minHeight: '14px',
                                fontSize: '0.675rem',
                              }}
                            >
                              View
                            </Button>
                          </TableCell>
                        );
                      }
                    return <TableCell key={column.id}>{row[column.id]}</TableCell>;
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
    </Layout>
  );
}

export default Shortlist;
