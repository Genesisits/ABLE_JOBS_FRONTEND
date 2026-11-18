import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessibleIcon from "@mui/icons-material/Accessible";
import BoltIcon from "@mui/icons-material/Bolt";
import { GET_JOB } from "../../endpoints";
import "./main.css";
import "../ajhdash/dashboard-theme.css";
import "./alljobs.css";


const isNewJob = (job) => {
  if (!job.posted_date) return false;
  const days = (Date.now() - new Date(job.posted_date).getTime()) / 86400000;
  return days >= 0 && days <= 7;
};
const place = (job) => [job.location, job.state].filter(Boolean).join(", ");
const skillList = (job) =>
  (job.skills || "").split(",").map((s) => s.trim()).filter(Boolean);

// Public page listing every active job, newest first.
export default function AllJobs() {
  const navigate = useNavigate();
  const detailsRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [where, setWhere] = useState("");
  const [type, setType] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(GET_JOB)
      .then((response) => {
        const list = Array.isArray(response.data) ? response.data : [];
        const active = list
          .filter((job) => job.activation_status)
          .sort((a, b) => b.id - a.id);
        setJobs(active);
        setSelectedJob(active.length > 0 ? active[0] : null);
      })
      .catch((error) => console.error(error.response?.data || error))
      .finally(() => setLoading(false));
  }, []);

  const locations = useMemo(
    () => [...new Set(jobs.map(place).filter(Boolean))].sort(),
    [jobs]
  );
  const types = useMemo(
    () => [...new Set(jobs.map((j) => j.employment_type).filter(Boolean))].sort(),
    [jobs]
  );

  const visibleJobs = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    const w = where.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchK =
        !k ||
        [job.job_title, job.company_name, job.skills, job.industry, job.department]
          .some((v) => (v || "").toLowerCase().includes(k));
      const matchW = !w || place(job).toLowerCase().includes(w);
      const matchT = !type || job.employment_type === type;
      return matchK && matchW && matchT;
    });
  }, [jobs, keyword, where, type]);

  // keep the details pane in sync with the search results
  useEffect(() => {
    if (!visibleJobs.some((j) => selectedJob && j.id === selectedJob.id)) {
      setSelectedJob(visibleJobs.length > 0 ? visibleJobs[0] : null);
    }
  }, [visibleJobs]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasFilters = keyword || where || type;
  const clearAll = () => {
    setKeyword("");
    setWhere("");
    setType("");
  };

  const selectJob = (job) => {
    setSelectedJob(job);
    // On phones the details panel sits below the list – bring it into view.
    if (window.matchMedia("(max-width: 900px)").matches) {
      setTimeout(() => detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    }
  };

  const onApply = () => {
    if (localStorage.getItem("access_token")) {
      if (localStorage.getItem("is_employee") === "true") {
        navigate("/findajob");
      } else if (localStorage.getItem("is_employer") === "true") {
        navigate("/jobs");
      }
    } else {
      navigate("/login");
    }
  };

  const job = selectedJob;

  return (
    <div className="my-container home">
      {loading && (
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      )}

      <div className="aj-page">
        <Link to="/" className="aj-back">
          <ArrowBackIcon fontSize="small" /> Back to Home
        </Link>

        <section className="ajh-hero aj-hero">
          <div className="ajh-hero-text">
            <h1>Explore All Jobs<span>Find Your Fit</span></h1>
            <p>Inclusive Employment for a More Equal Society</p>
          </div>
          <div className="ajh-hero-art" role="img" aria-label="Smiling professional working on a laptop" />
        </section>

        {/* ---------- Search ---------- */}
        <form
          className="ajh-search aj-search"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="ajh-field aj-field-wide">
            <SearchIcon />
            <input
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job title, company or skill"
              aria-label="Job title, company or skill"
            />
          </label>

          <label className="ajh-field">
            <PlaceIcon />
            <input
              type="text"
              list="aj-locations"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
              placeholder="Location"
              aria-label="Location"
            />
          </label>
          <datalist id="aj-locations">
            {locations.map((l) => <option key={l} value={l} />)}
          </datalist>

          <label className="ajh-field">
            <WorkOutlineIcon />
            <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Job type">
              <option value="">All job types</option>
              {types.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>

          <button type="submit" className="ajh-btn">
            <SearchIcon /> Search
          </button>
        </form>

        <div className="aj-resultbar" aria-live="polite">
          <span>
            <b>{visibleJobs.length}</b> job{visibleJobs.length === 1 ? "" : "s"} found
          </span>
          {hasFilters && (
            <button type="button" className="aj-clear" onClick={clearAll}>
              <CloseIcon fontSize="small" /> Clear filters
            </button>
          )}
        </div>

        {/* ---------- List + details ---------- */}
        <div className="aj-board">
          <div className="aj-list" role="list">
            {visibleJobs.map((j) => (
              <button
                type="button"
                role="listitem"
                key={j.id}
                className={`aj-item${job && job.id === j.id ? " active" : ""}`}
                onClick={() => selectJob(j)}
                aria-current={job && job.id === j.id ? "true" : undefined}
              >
                <span className="aj-avatar">{(j.company_name || "?").charAt(0)}</span>
                <span className="aj-item-body">
                  <span className="aj-item-title">
                    {j.job_title}
                    {isNewJob(j) && <em className="aj-new"><BoltIcon style={{ fontSize: 14 }} /> New</em>}
                  </span>
                  <span className="aj-item-company">{j.company_name}</span>
                  <span className="aj-item-meta">
                    <PlaceIcon style={{ fontSize: 15 }} /> {place(j)}
                    {j.employment_type && <> &nbsp;•&nbsp; {j.employment_type}</>}
                  </span>
                </span>
              </button>
            ))}
            {!loading && visibleJobs.length === 0 && (
              <div className="ajh-empty">
                No jobs match your search.
                {hasFilters && (
                  <div><button type="button" className="aj-clear" onClick={clearAll}>Clear filters</button></div>
                )}
              </div>
            )}
          </div>

          <aside className="aj-details" ref={detailsRef} aria-label="Job details">
            {job ? (
              <>
                <div className="aj-d-head">
                  <span className="aj-avatar lg">{(job.company_name || "?").charAt(0)}</span>
                  <div>
                    <h2>{job.job_title}</h2>
                    <div className="ajh-company"><BusinessIcon fontSize="small" /> {job.company_name}</div>
                  </div>
                </div>

                <div className="ajh-meta">
                  <span><PlaceIcon /> {place(job)}</span>
                  {job.employment_type && <span><AccessTimeIcon /> {job.employment_type}</span>}
                  <span><AccessibleIcon /> Open to Differently Abled</span>
                </div>

                <div className="aj-salary">
                  {job.salary_offered && <span className="aj-pill gold">₹{job.salary_offered}</span>}
                  {job.work_mode && <span className="aj-pill">{job.work_mode}</span>}
                  {job.industry && <span className="aj-pill">{job.industry}</span>}
                </div>

                <div className="aj-facts">
                  <div><small>Experience</small><b>{job.experience_required || "—"}</b></div>
                  <div><small>Qualification</small><b>{job.qualification_required || "—"}</b></div>
                  <div><small>Positions</small><b>{job.number_of_positions || "—"}</b></div>
                  <div><small>Disability eligible</small><b>{job.disability_eligible || "—"}</b></div>
                </div>

                {skillList(job).length > 0 && (
                  <>
                    <h4>Skills</h4>
                    <div className="ajh-tags" style={{ marginTop: 0 }}>
                      {skillList(job).map((s) => <span className="ajh-tag" key={s}>{s}</span>)}
                    </div>
                  </>
                )}

                <h4>Description</h4>
                <p className="aj-desc">{job.description}</p>

                <button type="button" className="ajh-btn gold aj-apply" onClick={onApply}>
                  Apply Now <ArrowForwardIcon />
                </button>
              </>
            ) : (
              <p className="aj-placeholder">Select a job to view details</p>
            )}
          </aside>
        </div>
      </div>

      

    </div>
  );
}
