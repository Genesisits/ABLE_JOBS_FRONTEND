import * as React from "react";
import Sidenav from "./Sidenav";
import useRole from "../ajhdash/useRole";
import "../ajhdash/dashboard-theme.css";

// Hero copy per page: [line 1, gold line 2, subtitle]
const HERO = {
  "/findajob": ["Find Your Dream Job", "Build a Better Future", "Inclusive Employment for a More Equal Society"],
  "/applied": ["Track Your", "Applications", "See where every application stands"],
  "/shortlist": ["You Made", "the Shortlist", "Employers are interested in your profile"],
  "/onboard": ["Welcome", "On Board", "Your journey with your new team begins here"],
  "/uploadresume": ["Showcase", "Your Talent", "Keep your resume up to date"],
  "/jobs": ["Hire Great Talent", "Build an Inclusive Team", "Post jobs and reach differently abled candidates"],
  "/shortlisted": ["Your Shortlisted", "Candidates", "Review and onboard the best fit"],
  "/reports": ["Hiring Insights", "At a Glance", "Applications, shortlists and onboarding in one place"],
  "/peopleadded": ["People", "Added", "See everyone who has joined Able Jobs Hub"],
  "/trainerdashboard": ["Train. Guide.", "Empower.", "Support candidates on their path to work"],
};
const DEFAULT_HERO = ["Welcome to", "Able Jobs Hub", "Inclusive Employment for a More Equal Society"];

// Mobile overflow fix (self-contained, independent of the CSS file)
const FIX = `
.ajh-main{min-width:0;max-width:100%}
.ajh-main>*{min-width:0;max-width:100%;box-sizing:border-box}
.ajh-footer-strip{margin:8px 0 0!important}
.ajh-main .MuiPaper-root,.ajh-main .MuiTableContainer-root{max-width:100%}
.ajh-footer-strip { background: linear-gradient(100deg, transparent 0%, var(--ajh-navy) 40.2%);}
@media (max-width:1000px){
  .ajh-main .MuiTable-root.ajh-stack{min-width:0!important}
  .ajh-main .MuiTablePagination-toolbar{flex-wrap:wrap;justify-content:flex-end;padding-left:8px}
  .ajh-main .MuiTablePagination-spacer{display:none}
  .ajh-side{width:95%}
}`;

export default function Layout({ children, bare = false }) {
  const { pathname } = useRole();
  const [l1, l2, sub] = HERO[pathname] || DEFAULT_HERO;

  return (
    <div className="ajh-shell">
      <style>{FIX}</style>
      <Sidenav />
      <main className="ajh-main">
        <section className="ajh-hero">
          <div className="ajh-hero-text">
            <h1>{l1}<span>{l2}</span></h1>
            <p>{sub}</p>
          </div>
          <div className="ajh-hero-art" role="img" aria-label="Smiling professional working on a laptop" />
        </section>
        {bare ? children : <div className="ajh-content-pad">{children}</div>}
        <div className="ajh-footer-strip">
          Equal Opportunity<i>•</i>Inclusive Growth<i>•</i>A Stronger Tomorrow
        </div>
      </main>
    </div>
  );
}