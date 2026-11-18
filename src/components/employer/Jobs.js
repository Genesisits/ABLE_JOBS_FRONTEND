import * as React from "react";
import Layout from "../sidenav/Layout";
import { GET_JOB, ACTIVATE_JOB, GET_JOB_EMPLOYEE, APPLIED_CANDIDATES } from "../../endpoints";
import "./jobs-panel.css";
import { useState, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { CircularProgress, Tooltip } from "@mui/material";
import "./jobs.css";
import "../ajhdash/dashboard-theme.css";
import "./jobs-cards.css";
import JobCardDetails from "./JobCardDetails";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessibleIcon from "@mui/icons-material/Accessible";
import AddIcon from "@mui/icons-material/Add";
import BusinessIcon from "@mui/icons-material/Business";
import { USE_DEMO_DATA, DEMO_JOBS } from "./demoData";
import Postajob from "./postajob";
import AppliedCandidatesDialog from "./Appliedcandidates";


// Numeric salaries show as ₹30,000; text like "6 - 9 LPA" is shown unchanged.
const money = (v) => {
  const x = Number(v);
  return v !== "" && v !== null && v !== undefined && Number.isFinite(x)
    ? `₹${x.toLocaleString("en-IN")}`
    : v;
};

export default function Jobs() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false)
  const [panel, setPanel] = useState(null); // 'jobs' | 'active' | 'applicants' | 'shortlisted'
  const [people, setPeople] = useState([]);
  const [peopleLoading, setPeopleLoading] = useState(false);
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
    }
    axios.get(`${GET_JOB_EMPLOYEE}`, config).then((response) => {
      const data = Array.isArray(response.data) ? response.data : [];
      setData(data.length === 0 && USE_DEMO_DATA ? DEMO_JOBS : data);
    }).catch((error) => {
      console.log(error)
      if (USE_DEMO_DATA) setData(DEMO_JOBS);
    }).finally(() => {
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
        item.code === row.code ? { ...item, activation_status: updatedStatus } : item
      ));

    axios
      .put(`${ACTIVATE_JOB}${row.code}/`, { activation_status: updatedStatus }, config)
      .then((response) => {
        console.log(response)
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
  }

  const n = (v) => Number(v) || 0;
  const stats = {
    jobs: rows.length,
    active: rows.filter((r) => r.activation_status).length,
    applied: rows.reduce((a, r) => a + n(r.applied), 0),
    shortlisted: rows.reduce((a, r) => a + n(r.shortlisted), 0),
  };
  const withApplicants = rows.filter((r) => n(r.applied) > 0);
  const togglePanel = (key) => setPanel((p) => (p === key ? null : key));

  // Applicants / Shortlisted panels list the actual candidates of every job
  useEffect(() => {
    if (panel !== "applicants" && panel !== "shortlisted") return;
    let cancelled = false;
    setPeopleLoading(true);
    Promise.all(
      withApplicants.map((job) =>
        axios
          .get(`${APPLIED_CANDIDATES}${job.code}`)
          .then((res) => (Array.isArray(res.data) ? res.data : []).map((c) => ({ ...c, job_title: job.job_title, job_code: job.code })))
          .catch(() => [])
      )
    ).then((lists) => { if (!cancelled) setPeople(lists.flat()); })
      .finally(() => { if (!cancelled) setPeopleLoading(false); });
    return () => { cancelled = true; };
    // eslint-disable-next-line
  }, [panel, rows]);

  const statusOf = (c) => (c.onboarded_status ? "Onboarded" : c.shortlisted_status ? "Shortlisted" : "Applied");
  const jobRows = panel === "active" ? rows.filter((r) => r.activation_status) : rows;
  const peopleRows = panel === "shortlisted" ? people.filter((c) => c.shortlisted_status || c.onboarded_status) : people;
  const PANEL_TITLE = { jobs: "All jobs", active: "Active jobs", applicants: "All applicants", shortlisted: "Shortlisted candidates" };
  const pageRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Layout bare>
      {loading && (
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      )}

      <div className="ajh-search" style={{ justifyContent: "space-between" }}>
        <div>
          <strong style={{ fontSize: 18, color: "var(--ajh-navy)" }}>Your job postings</strong>
          <div style={{ color: "var(--ajh-muted)", fontSize: 14 }}>
            Manage openings and review who has applied
          </div>
        </div>
        <button type="button" className="ajh-btn gold" onClick={openPostJobModal}>
          <AddIcon /> Post a Job
        </button>
      </div>

      <div className="ajh-stats">
        <button type="button" className={`ajh-stat ajh-stat-btn${panel === "jobs" ? " is-open" : ""}`} aria-expanded={panel === "jobs"} onClick={() => togglePanel("jobs")}><div className="ajh-stat-ico"><WorkOutlineIcon /></div><div><b>{stats.jobs}</b><small>Total Jobs</small></div></button>
        <button type="button" className={`ajh-stat ajh-stat-btn${panel === "active" ? " is-open" : ""}`} aria-expanded={panel === "active"} onClick={() => togglePanel("active")}><div className="ajh-stat-ico green"><CheckCircleIcon /></div><div><b>{stats.active}</b><small>Active Jobs</small></div></button>
        <button type="button" className={`ajh-stat ajh-stat-btn${panel === "applicants" ? " is-open" : ""}`} aria-expanded={panel === "applicants"} onClick={() => togglePanel("applicants")}><div className="ajh-stat-ico gold"><PeopleAltIcon /></div><div><b>{stats.applied}</b><small>Applicants</small></div></button>
        <button type="button" className={`ajh-stat ajh-stat-btn${panel === "shortlisted" ? " is-open" : ""}`} aria-expanded={panel === "shortlisted"} onClick={() => togglePanel("shortlisted")}><div className="ajh-stat-ico violet"><PeopleAltIcon /></div><div><b>{stats.shortlisted}</b><small>Shortlisted</small></div></button>
      </div>

      {panel && (
        <section className="jp-panel" aria-live="polite">
          <div className="jp-head">
            <h3>{PANEL_TITLE[panel]}</h3>
            <button type="button" className="jp-close" onClick={() => setPanel(null)} aria-label="Close">✕</button>
          </div>
          <div className="jp-scroll">
            {(panel === "jobs" || panel === "active") ? (
              <table className="jp-table">
                <thead><tr><th>Job</th><th>Location</th><th>Type</th><th>Status</th><th>Applied</th><th>Shortlisted</th><th></th></tr></thead>
                <tbody>
                  {jobRows.length === 0 && <tr><td colSpan={7} className="jp-empty">No jobs to show.</td></tr>}
                  {jobRows.map((r) => (
                    <tr key={r.code}>
                      <td><b>{r.job_title}</b></td><td>{r.location}</td><td>{r.employment_type}</td>
                      <td><span className={`ajh-badge ${r.activation_status ? "new" : "off"}`}>{r.activation_status ? "Active" : "Inactive"}</span></td>
                      <td>{n(r.applied)}</td><td>{n(r.shortlisted)}</td>
                      <td><button type="button" className="jp-link" onClick={() => handleOpenDialog(r.code)}>View applicants</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : peopleLoading ? (
              <div className="jp-empty">Loading…</div>
            ) : (
              <table className="jp-table">
                <thead><tr><th>Candidate</th><th>Email</th><th>Job</th><th>Applied on</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {peopleRows.length === 0 && <tr><td colSpan={6} className="jp-empty">No candidates to show.</td></tr>}
                  {peopleRows.map((c) => (
                    <tr key={`${c.job_code}-${c.application_code}`}>
                      <td><b>{c.employee_name}</b></td><td>{c.employee_email}</td><td>{c.job_title}</td>
                      <td>{c.applied_at ? new Date(c.applied_at).toLocaleDateString() : "-"}</td>
                      <td><span className={`jp-status ${statusOf(c).toLowerCase()}`}>{statusOf(c)}</span></td>
                      <td><button type="button" className="jp-link" onClick={() => handleOpenDialog(c.job_code)}>Open</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}

      <div className="ajh-list">
        {pageRows.length === 0 && !loading && (
          <div className="ajh-empty">You haven't posted any jobs yet. Click “Post a Job” to get started.</div>
        )}
        {pageRows.map((row) => (
          <article key={row.code} className="ajh-card">
            <div className="ajh-logo">
              <div>
                <div className="ajh-logo-badge">{(row.company_name || row.job_title || "?").charAt(0)}</div>
                <small>{n(row.applied)} applied</small>
              </div>
            </div>

            <div className="ajh-body">
              <h3 className="ajh-title">{row.job_title}</h3>
              <div className="ajh-company"><BusinessIcon fontSize="small" /> {row.company_name || "Your company"}</div>
              <div className="ajh-meta">
                <span><PlaceIcon /> {row.location}</span>
                <span><AccessTimeIcon /> {row.employment_type}</span>
                <span><AccessibleIcon /> {row.experience_required} exp • {money(row.salary_offered)}</span>
              </div>
              <div className="ajh-tags">
                {(row.skills || "").split(",").map((t) => t.trim()).filter(Boolean)
                  .map((t) => <span className="ajh-tag" key={t}>{t}</span>)}
              </div>
              <JobCardDetails row={row} />
            </div>

            <span className={`ajh-badge ${row.activation_status ? "new" : "off"}`}>
              {row.activation_status ? "Active" : "Inactive"}
            </span>

            <div className="ajh-actions">
              <Tooltip title="View applicants">
                <button type="button" className="ajh-icon-btn" aria-label="View applicants" onClick={() => handleOpenDialog(row.code)}>
                  <VisibilityIcon fontSize="small" />
                </button>
              </Tooltip>
              <Tooltip title="Edit">
                <button type="button" className="ajh-icon-btn" aria-label="Edit job" onClick={() => openEditJobModal(row)}>
                  <EditIcon fontSize="small" />
                </button>
              </Tooltip>
              <Tooltip title={row.activation_status ? "Deactivate Job" : "Activate Job"} arrow>
                <Switch
                  checked={!!row.activation_status}
                  onChange={() => handleActive(row)}
                  inputProps={{ "aria-label": "Activate or deactivate job" }}
                />
              </Tooltip>
            </div>
          </article>
        ))}
      </div>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Postajob modalIsOpen={isPostJobOpen} closeModal={closePostJobModal} selectedJob={selectedJob} />

      <AppliedCandidatesDialog open={isDialogOpen} onClose={handleCloseDialog} jobCode={selectedJobCode} />
    </Layout>
  );
}