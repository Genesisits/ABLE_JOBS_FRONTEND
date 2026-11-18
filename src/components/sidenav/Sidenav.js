import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import useRole from "../ajhdash/useRole";
import sideMark from "../../images/dash-side-mark.png";
import "../ajhdash/dashboard-theme.css";

// [label, route, icon]
const EMPLOYEE_MENU = [
  ["Find a Job", "/findajob", <WorkOutlineIcon />],
  ["Applied", "/applied", <GroupsIcon />],
  ["Shortlist", "/shortlist", <PeopleAltIcon />],
  ["On Board", "/onboard", <CheckCircleIcon />],
];
const EMPLOYER_MENU = [
  ["Jobs", "/jobs", <WorkOutlineIcon />],
  ["Shortlisted", "/shortlisted", <PersonSearchIcon />],
  ["Reports", "/reports", <AssessmentIcon />],
];
const TRAINER_MENU = [
  ["Trainer Dashboard", "/trainerdashboard", <DashboardIcon />],
  ["Profile", "/profile", <PeopleAltIcon />],
];
const ADMIN_MENU = [
  ["Dashboard", "/dashboard", <DashboardIcon />],
  ["People Added", "/peopleadded", <GroupAddIcon />],
  ["Employee", "/employee", <PeopleAltIcon />],
  ["Employers", "/employers", <CorporateFareIcon />],
  ["Volunteers", "/volunteers", <VolunteerActivismIcon />],
  ["Trainers", "/trainers", <SportsGymnasticsIcon />],
];

export default function Sidenav() {
  const navigate = useNavigate();
  const { pathname, isEmployee, isEmployer, isTrainer, isAdmin } = useRole();

  const menu = isEmployee ? EMPLOYEE_MENU
    : isTrainer ? TRAINER_MENU
    : isEmployer ? EMPLOYER_MENU
    : isAdmin ? ADMIN_MENU : [];

  // On phones/tablets the menu is a scrolling row: keep the active tab visible
  useEffect(() => {
    const el = document.querySelector(".ajh-nav-item.active");
    if (el && el.scrollIntoView) el.scrollIntoView({ inline: "center", block: "nearest" });
  }, [pathname]);

  const handleLogout = () => {
    ["access_token", "refresh_token", "is_employee", "is_employer", "is_admin", "is_trainer"]
      .forEach((k) => localStorage.removeItem(k));
    navigate("/login");
    window.location.reload();
  };

  return (
    <aside className="ajh-side" aria-label="Dashboard menu">
      <nav className="ajh-nav">
        {menu.map(([label, route, icon]) => (
          <Link
            key={label}
            to={route}
            className={`ajh-nav-item${pathname === route ? " active" : ""}`}
            aria-current={pathname === route ? "page" : undefined}
          >
            {icon}
            {label}
          </Link>
        ))}
        {menu.length > 0 && (
          <button type="button" className="ajh-nav-item" onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </button>
        )}
      </nav>

      <div className="ajh-side-foot">
        <img src={sideMark} alt="" />
       
      </div>
    </aside>
  );
}