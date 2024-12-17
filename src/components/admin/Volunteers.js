import * as React from "react";
import Layout from "../sidenav/Layout";
import Paper from "@mui/material/Paper";
import {
  GET_JOB,
  ACTIVATE_JOB,
  GET_JOB_EMPLOYEE,
  VOLUNTEERS_LIST,
} from "../../endpoints";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import Aadhar from "../../images/aadharcard.png";
import Pancard from "../../images/pancard.webp";
import Resume from "../../images/resume.png";
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


const columns = [
  { id: "first_name", label: "First Name", minWidth: 100 },
  { id: "last_name", label: "Last Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "mobile_number", label: "Mobile Number", minWidth: 100 },
  { id: "state", label: "State", minWidth: 100 },
 
  { id: "status", label: "Actions", minWidth: 150 },
];

export default function Volunteers() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false)
  const [rows, setData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJobCode, setSelectedJobCode] = useState(null); 
  useEffect(() => {
    
    setLoading(true)
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };
    axios.get(`${VOLUNTEERS_LIST}`).then((response) => {
      setData(response.data);
    }).catch((error) => {
      console.log(error)
    }).finally(()=> {
      setLoading(false)
    })
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

  const openPostJobModal = () => {
    setSelectedJob(null); 
    setIsPostJobOpen(true);
  };
  const closePostJobModal = () => {
    setSelectedJob(null);
    setIsPostJobOpen(false);
  };
  const handleOpenDialog = (jobCode) => {
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

  return (
    <div>
      <Layout>
      {loading && (
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      )}
        <div className="jobs"></div>
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
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  margin: "0",
                                }}
                              >
                                <button
                                onClick={(e)=>window.open(row.aadhar_card)}
                                  style={{
                                    padding:'0',
                                    border: "none",
                                    background: "none",
                                    margin: "0",
                                  }}
                                >
                                  <img
                                    src={Aadhar}
                                    style={{ width: "25px", height: "25px",margin:'0', }}
                                  />
                                </button>

                                <button
                                onClick={(e)=>window.open(row.pan_card)}
                                  style={{
                                    padding:'0',
                                    border: "none",
                                    background: "none",
                                    margin: "0",
                                  }}
                                >
                                  <img
                                    src={Pancard}
                                    style={{ width: "25px", height: "25px",margin:'0', }}
                                  />
                                </button>
                                <button
                                onClick={(e) => window.open(row.resume)}
                                  style={{
                                    padding:'0',
                                    border: "none",
                                    background: "none",
                                    margin: "0",
                                  }}
                                >
                                  <img
                                  
                                    src={Resume}
                                    style={{ width: "25px", height: "25px",margin:'0', }}
                                  />
                                </button>
                              </div>
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
        {/* <Postajob modalIsOpen={isPostJobOpen} closeModal={closePostJobModal} selectedJob={selectedJob}  /> */}

        {/* Applied Candidates Dialog */}
        {/* <AppliedCandidatesDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          jobCode={selectedJobCode} // Pass the jobCode to the dialog
        /> */}
      </Layout>
    </div>
  );
}
