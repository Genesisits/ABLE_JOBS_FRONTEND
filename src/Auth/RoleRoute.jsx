import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { CircularProgress } from "@mui/material";
import Layout from "../components/sidenav/Layout";
import { USER_PROFILE } from "../endpoints";

/*
  ONE PLACE TO ADJUST: how each role is recognised from the profile API.
  1) If the profile has a role field (role / user_type / user_role / type),
     it must contain one of the `words`.
  2) Otherwise `fallback(profile)` decides, using fields only that role has.
  Change these if your backend identifies users differently.
*/
const ROLES = {
  employer: {
    words: ["employer"],
    fallback: (p) => "company_name" in p,
    plural: "employers",
  },
  employee: {
    words: ["employee", "candidate", "job seeker", "jobseeker", "job_seeker"],
    // no role field: an employee is anyone who is not an employer or a trainer
    fallback: (p) => !("company_name" in p) && !("training_subject" in p),
    plural: "employees",
  },
  trainer: {
    words: ["trainer"],
    fallback: (p) => "training_subject" in p,
    plural: "trainers",
  },
};

const matchesRole = (profile, role) => {
  if (!profile || typeof profile !== "object") return false;
  const rule = ROLES[role];
  if (!rule) return false;
  const value = String(
    profile.role || profile.user_type || profile.user_role || profile.type || ""
  ).toLowerCase();
  if (value) return rule.words.some((w) => value.includes(w));
  return rule.fallback(profile);
};

// Remember the profile per token so moving between protected pages doesn't re-check every time
let cache = { token: null, profile: null };

/*
  Usage in App.jsx:
  <Route element={<RoleRoute role="employer" />}>   // or "employee" / "trainer"
    <Route path="/jobs" element={<Jobs />} />
  </Route>
*/
export default function RoleRoute({ role = "employer" }) {
  const token = localStorage.getItem("access_token");
  const cached = token && cache.token === token ? cache.profile : null;

  const [profile, setProfile] = useState(cached);
  const [checking, setChecking] = useState(!!token && !cached);

  useEffect(() => {
    if (!token || cached) return;
    axios
      .get(USER_PROFILE, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const p = res.data.user_profile || res.data;
        cache = { token, profile: p };
        setProfile(p);
      })
      .catch((err) => console.log(err))
      .finally(() => setChecking(false));
  }, [token, cached]);

  if (checking) {
    return (
      <Layout>
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      </Layout>
    );
  }

  if (token && matchesRole(profile, role)) return <Outlet />;

  const who = ROLES[role]?.plural || "authorised users";
  const article = /^[aeiou]/i.test(role) ? "an" : "a";
  return (
    <Layout>
      <Paper sx={{ p: 4, textAlign: "center", maxWidth: 520, mx: "auto", mt: 6 }}>
        <h2 style={{ marginTop: 0 }}>Access restricted</h2>
        <p style={{ color: "#5a6070" }}>
          {token
            ? `This page can only be accessed by ${who}.`
            : `Please sign in with ${article} ${role} account to view this page.`}
        </p>
        {!token && <Link to="/login">Go to sign in</Link>}
      </Paper>
    </Layout>
  );
}
