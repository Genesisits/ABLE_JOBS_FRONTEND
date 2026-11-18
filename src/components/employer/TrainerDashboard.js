import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { CircularProgress } from "@mui/material";
import Layout from "../sidenav/Layout";
import { USER_PROFILE } from "../../endpoints";
import "./reports.css";

const fields = [
  { id: "training_subject", label: "Training Subject" },
  { id: "qualification", label: "Qualification" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "languages_known", label: "Languages Known" },
  { id: "availability_of_work", label: "Availability" },
  { id: "mobile_number", label: "Mobile" },
  { id: "address", label: "Address" },
];

/*
  ONE PLACE TO ADJUST: how we decide that the signed-in user is a trainer.
  1) If your profile API returns a role field (role / user_type / user_role / type),
     it must contain the word "trainer".
  2) Otherwise, a profile that has the trainer-only field `training_subject` counts as a trainer.
  Change this function if your backend identifies trainers differently.
*/
const isTrainerProfile = (p) => {
  if (!p || typeof p !== "object") return false;
  const role = String(p.role || p.user_type || p.user_role || p.type || "").toLowerCase();
  if (role) return role.includes("trainer");
  return "training_subject" in p;
};

export default function TrainerDashboard() {
  const [loading, setLoading] = useState(true); // true first, so "no access" never flashes
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }
    axios
      .get(USER_PROFILE, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setProfile(res.data.user_profile || res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const signedIn = !!localStorage.getItem("access_token");
  const allowed = isTrainerProfile(profile);

  // 1) still checking
  if (loading) {
    return (
      <Layout>
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      </Layout>
    );
  }

  // 2) not a trainer (or not signed in / profile failed to load)
  if (!allowed) {
    return (
      <Layout>
        <div className="reports-page">
          <Paper sx={{ p: 4, textAlign: "center", maxWidth: 520, mx: "auto", mt: 6 }}>
            <h2 style={{ marginTop: 0 }}>Access restricted</h2>
            <p style={{ color: "#5a6070" }}>
              {signedIn
                ? "This page can only be accessed by trainers."
                : "Please sign in with a trainer account to view this page."}
            </p>
            {!signedIn && <Link to="/login">Go to sign in</Link>}
          </Paper>
        </div>
      </Layout>
    );
  }

  // 3) trainer: show the dashboard
  return (
    <Layout>
      <div className="reports-page">
        <h2 className="reports-title">
          Welcome{profile?.first_name ? `, ${profile.first_name} ${profile.last_name || ""}` : ""}
        </h2>
        <div className="reports-cards">
          <div className="report-card">
            <div className="label">Role</div>
            <div className="value" style={{ fontSize: 22 }}>Trainer</div>
          </div>
          <div className="report-card">
            <div className="label">Trainer Code</div>
            <div className="value" style={{ fontSize: 22 }}>{profile?.code || "-"}</div>
          </div>
        </div>
        <Paper sx={{ p: 2, textAlign: "left" }}>
          <h3 style={{ marginTop: 0 }}>Your Details</h3>
          {fields.map((f) => (
            <p key={f.id} style={{ margin: "6px 0" }}>
              <strong>{f.label}:</strong> {profile?.[f.id] || "-"}
            </p>
          ))}
        </Paper>
      </div>
    </Layout>
  );
}