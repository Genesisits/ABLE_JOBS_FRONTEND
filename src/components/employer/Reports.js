import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import { CircularProgress } from "@mui/material";
import Layout from "../sidenav/Layout";
import { GET_JOB_EMPLOYEE } from "../../endpoints";
import { USE_DEMO_DATA, DEMO_JOBS } from "./demoData";
import "./jobs.css";
import "./reports.css";

const columns = [
  { id: "job_title", label: "Job Role", minWidth: 150 },
  { id: "location", label: "Location", minWidth: 100 },
  { id: "applied", label: "Applied", minWidth: 80 },
  { id: "shortlisted", label: "Shortlisted", minWidth: 100 },
  { id: "onboarded", label: "Onboarded", minWidth: 100 },
  { id: "activation_status", label: "Status", minWidth: 100 },
];

export default function Reports() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    };
    axios
      .get(`${GET_JOB_EMPLOYEE}`, config)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setRows(data.length === 0 && USE_DEMO_DATA ? DEMO_JOBS : data);
      })
      .catch((error) => {
        console.log(error);
        if (USE_DEMO_DATA) setRows(DEMO_JOBS);
      })
      .finally(() => setLoading(false));
  }, []);

  const n = (v) => Number(v) || 0;

  const totals = useMemo(
    () => ({
      jobs: rows.length,
      active: rows.filter((r) => r.activation_status).length,
      applied: rows.reduce((a, r) => a + n(r.applied), 0),
      shortlisted: rows.reduce((a, r) => a + n(r.shortlisted), 0),
      onboarded: rows.reduce((a, r) => a + n(r.onboarded), 0),
    }),
    [rows]
  );

  const maxApplied = Math.max(1, ...rows.map((r) => n(r.applied)));

  const cards = [
    { label: "Total Jobs", value: totals.jobs },
    { label: "Active Jobs", value: totals.active },
    { label: "Applications", value: totals.applied },
    { label: "Shortlisted", value: totals.shortlisted },
    { label: "Onboarded", value: totals.onboarded },
  ];

  return (
    <Layout>
      {loading && (
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      )}
      <div className="reports-page">
        <h2 className="reports-title">Reports</h2>

        <div className="reports-cards">
          {cards.map((c) => (
            <div className="report-card" key={c.label}>
              <div className="label">{c.label}</div>
              <div className="value">{c.value}</div>
            </div>
          ))}
        </div>

        <div className="reports-panel">
          <h3>Candidates per Job</h3>
          {rows.length === 0 && <div>No data available.</div>}
          {rows.map((r) => (
            <div className="bar-row" key={r.code}>
              <div className="bar-label" title={r.job_title}>{r.job_title}</div>
              <div className="bar-track">
                <div className="bar-fill applied" style={{ width: `${(n(r.applied) / maxApplied) * 100}%` }} />
                <div className="bar-fill shortlisted" style={{ width: `${(n(r.shortlisted) / maxApplied) * 100}%` }} />
                <div className="bar-fill onboarded" style={{ width: `${(n(r.onboarded) / maxApplied) * 100}%` }} />
              </div>
              <div className="bar-count">{n(r.applied)}</div>
            </div>
          ))}
          <div className="bar-legend">
            <span className="applied">Applied</span>
            <span className="shortlisted">Shortlisted</span>
            <span className="onboarded">Onboarded</span>
          </div>
        </div>

        <Paper sx={{ width: "100%", overflow: "hidden", backgroundColor: "#ffffff" }}>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="reports table">
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
                    <TableRow hover tabIndex={-1} key={row.code}>
                      {columns.map((column) =>
                        column.id === "activation_status" ? (
                          <TableCell key={column.id}>
                            <Chip
                              size="small"
                              label={row.activation_status ? "Active" : "Inactive"}
                              color={row.activation_status ? "success" : "default"}
                            />
                          </TableCell>
                        ) : (
                          <TableCell key={column.id}>
                            {column.id === "applied" || column.id === "shortlisted" || column.id === "onboarded"
                              ? n(row[column.id])
                              : row[column.id]}
                          </TableCell>
                        )
                      )}
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
            onPageChange={(e, p) => setPage(p)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
          />
        </Paper>
      </div>
    </Layout>
  );
}
