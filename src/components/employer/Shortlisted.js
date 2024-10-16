import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField"; // Import TextField for search
import Button from "@mui/material/Button"; // Import Button for search
import Layout from "../sidenav/Layout"; // Import the Layout component
import "./shortlisted.css";

const columns = [
  { id: "userid", label: "User ID", minWidth: 170 },
  { id: "jobid", label: "Job ID", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 170, align: "right" },
];

function createData(userid, jobid, status) {
  return { userid, jobid, status };
}

const initialRows = [
  createData("001", "REF1", "Not shortlisted"),
  createData("002", "REF2", "Shortlisted"),
  createData("003", "REF3", "Shortlisted"),
];

export default function Shortlisted() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState(""); // State for search term
  const [filteredRows, setFilteredRows] = React.useState(initialRows); // State for filtered rows

  const handleSearch = () => {
    const filteredData = initialRows.filter(
      (row) =>
        row.companyname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.jobrole.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filteredData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Layout>
      <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
        {/* <div style={{ display: "flex", alignItems: "center" }}> */}
          <input
            className="search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="search-button" onClick={handleSearch}>
            Search
          </Button>
        {/* </div> */}

        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ backgroundColor: "#1976d2", color: "white" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.companyname}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
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
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Layout>
  );
}
