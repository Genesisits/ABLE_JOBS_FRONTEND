import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import GroupsIcon from "@mui/icons-material/Groups";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Layout from "../sidenav/Layout";
import { ADMIN_STATS } from "../../endpoints";
import "./peopleadded.css";

// key = key used by the API, to = existing admin list page for that role
const ROLES = [
  { key: "employees", label: "Employees", singular: "Employee", to: "/employee", icon: <PeopleAltIcon />, tone: "blue" },
  { key: "employers", label: "Employers", singular: "Employer", to: "/employers", icon: <CorporateFareIcon />, tone: "gold" },
  { key: "trainers", label: "Trainers", singular: "Trainer", to: "/trainers", icon: <SportsGymnasticsIcon />, tone: "green" },
  { key: "volunteers", label: "Volunteers", singular: "Volunteer", to: "/volunteers", icon: <VolunteerActivismIcon />, tone: "violet" },
];

const num = (n) => (Number(n) || 0).toLocaleString("en-IN");

export default function PeopleAdded() {
  const token = localStorage.getItem("access_token");
  const isAdmin = localStorage.getItem("is_admin") === "true";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("all");

  const load = useCallback(() => {
    setLoading(true);
    setError("");
    axios
      .get(ADMIN_STATS, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setData(res.data))
      .catch((err) => {
        const status = err.response?.status;
        setError(
          status === 403 || status === 401
            ? "Only admins can view this page."
            : "Could not load the numbers. Please try again."
        );
      })
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (token && isAdmin) load();
    else setLoading(false);
  }, [token, isAdmin, load]);

  if (!token || !isAdmin) {
    return (
      <Layout>
        <div className="pa-empty">
          <h2>Access restricted</h2>
          <p>{token ? "This page can only be accessed by admins." : "Please sign in with an admin account to view this page."}</p>
          {!token && <Link to="/login">Go to sign in</Link>}
        </div>
      </Layout>
    );
  }

  const people = data?.people;
  const all = people?.all;

  // rows for the "Recently added" table
  const recentRows = !data
    ? []
    : (tab === "all" ? ROLES : ROLES.filter((r) => r.key === tab)).flatMap((r) =>
        (data.recent[r.key] || []).map((p) => ({ ...p, role: r.singular, tone: r.tone }))
      );

  return (
    <Layout>
      <div className="pa-page">
        <div className="pa-top">
          <div>
            <h2 className="pa-h2">People Added</h2>
            <p className="pa-sub">Everyone who has registered on Able Jobs Hub</p>
          </div>
          <button type="button" className="pa-refresh" onClick={load} disabled={loading}>
            <RefreshIcon /> Refresh
          </button>
        </div>

        {loading && !data ? (
          <div className="pa-loading"><CircularProgress /></div>
        ) : error && !data ? (
          <div className="pa-empty">
            <p>{error}</p>
            <button type="button" className="pa-refresh" onClick={load}>Try again</button>
          </div>
        ) : data ? (
          <>
            {/* Total */}
            <section className="pa-total">
              <div className="pa-total-main">
                <span className="pa-total-ico"><GroupsIcon /></span>
                <div>
                  <b>{num(all.total)}</b>
                  <small>people added in total</small>
                </div>
              </div>
              <div className="pa-total-side">
                <div><b>{num(all.active)}</b><small>Active</small></div>
                <div><b>{num(all.pending)}</b><small>Not verified yet</small></div>
              </div>
              <div className="pa-bar" role="img" aria-label="Share of each group">
                {ROLES.map((r) => {
                  const n = people[r.key].total;
                  return n > 0 ? (
                    <span key={r.key} className={`pa-seg ${r.tone}`} style={{ flexGrow: n }} title={`${r.label}: ${n}`} />
                  ) : null;
                })}
              </div>
              <div className="pa-legend">
                {ROLES.map((r) => (
                  <span key={r.key}><i className={`pa-dot ${r.tone}`} /> {r.label}</span>
                ))}
              </div>
            </section>

            {/* One card per role */}
            <section className="pa-cards">
              {ROLES.map((r) => (
                <Link key={r.key} to={r.to} className="pa-card">
                  <span className={`pa-ico ${r.tone}`}>{r.icon}</span>
                  <div className="pa-card-body">
                    <b>{num(people[r.key].total)}</b>
                    <strong>{r.label}</strong>
                    <small>{num(people[r.key].active)} active · {num(people[r.key].pending)} not verified</small>
                  </div>
                  <ArrowForwardIcon className="pa-go" />
                </Link>
              ))}
            </section>

            {/* Other numbers */}
            <section className="pa-mini">
              <div className="pa-mini-item">
                <span className="pa-ico blue"><DescriptionIcon /></span>
                <div><b>{num(data.employees_with_resume)}</b><small>Employees with a resume</small></div>
              </div>
              <div className="pa-mini-item">
                <span className="pa-ico gold"><DescriptionIcon /></span>
                <div><b>{num(data.employees_without_resume)}</b><small>Employees without a resume</small></div>
              </div>
              <div className="pa-mini-item">
                <span className="pa-ico green"><WorkOutlineIcon /></span>
                <div><b>{num(data.jobs.active)} <em>/ {num(data.jobs.total)}</em></b><small>Active / total jobs</small></div>
              </div>
              <div className="pa-mini-item">
                <span className="pa-ico violet"><AssignmentTurnedInIcon /></span>
                <div>
                  <b>{num(data.applications.total)}</b>
                  <small>
                    Applications · {num(data.applications.last_7_days)} this week · {num(data.applications.shortlisted)} shortlisted · {num(data.applications.onboarded)} onboarded
                  </small>
                </div>
              </div>
            </section>

            {/* Recently added */}
            <section className="pa-recent">
              <div className="pa-recent-head">
                <h3>Recently added</h3>
                <div className="pa-tabs" role="tablist">
                  {[{ key: "all", label: "All" }, ...ROLES].map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      role="tab"
                      aria-selected={tab === t.key}
                      className={tab === t.key ? "on" : ""}
                      onClick={() => setTab(t.key)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {recentRows.length === 0 ? (
                <div className="pa-none">Nobody added yet.</div>
              ) : (
                <div className="pa-table-wrap">
                  <table className="pa-table">
                    <thead>
                      <tr><th>Name</th><th>Role</th><th>Email</th><th>Code</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {recentRows.map((p) => (
                        <tr key={`${p.role}-${p.code || p.email}`}>
                          <td data-label="Name">{p.name}</td>
                          <td data-label="Role"><span className={`pa-pill ${p.tone}`}>{p.role}</span></td>
                          <td data-label="Email">{p.email}</td>
                          <td data-label="Code">{p.code || "-"}</td>
                          <td data-label="Status">
                            <span className={`pa-status ${p.is_active ? "ok" : "wait"}`}>{p.is_active ? "Active" : "Not verified"}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <p className="pa-note">Shows the latest 5 added in each group. Use the cards above to see everyone.</p>
            </section>
          </>
        ) : null}
      </div>
    </Layout>
  );
}
