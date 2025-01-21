import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  ListItemIcon,
} from "@mui/material";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TrainerIcon from "@mui/icons-material/SportsGymnastics";
import { EMPLOYERS_LIST } from "../../endpoints";
import Employers from "../admin/Employers";
import { useMediaQuery } from '@mui/material';

const drawerWidthDesktop = 240;
const drawerWidthMobile = 180; // Reduced size for mobile view

export default function Sidenav() {
  const [selectedEmployer, handleEmployerSelect] = useState("");
  const [selectedEmployerID, setEmployerID] = useState("");
  const [employers, setEmployers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  const isEmployee = localStorage.getItem("is_employee") === "true";
  const isEmployer = localStorage.getItem("is_employer") === "true";
  const isAdmin = localStorage.getItem("is_admin") === "true";

  const isMobile = useMediaQuery('(max-width: 600px)');  // Detect mobile view

  useEffect(() => {
    if (isAdmin) {
      axios.get(`${EMPLOYERS_LIST}`).then((response) => {
        let employers_data = [];
        for (let j in response.data) {
          employers_data.push({
            name: response.data[j].company_name,
            id: response.data[j].code,
          });
        }
        setEmployers(employers_data);
      });
    }
  }, [isAdmin]);

  let menuItems = [];
  let iconsMap = {};

  if (isEmployee) {
    menuItems = ["Find a Job", "Applied", "Shortlist", "On Board", "Logout"];
    iconsMap = {
      "Find a Job": <WorkIcon />,
      "Applied": <PeopleIcon />,
      "Shortlist": <PeopleIcon />,
      "On Board": <PeopleIcon />,
      "Logout": <LogoutIcon />,
    };
  } else if (isEmployer) {
    menuItems = ["Jobs", "Shortlisted", "Reports", "Logout"];
    iconsMap = {
      "Jobs": <WorkIcon />,
      "Shortlisted": <PeopleIcon />,
      "Reports": <DashboardIcon />,
      "Logout": <LogoutIcon />,
    };
  }

  const handleEmployer = (empId) => {
    navigate(`/employers/${empId}`);
  };

  const filteredEmployers = employers.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("is_employee");
    localStorage.removeItem("is_employer");
    localStorage.removeItem("is_admin");
    navigate("/login");
    window.location.reload();
  };

  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: isMobile ? drawerWidthMobile : drawerWidthDesktop,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMobile ? drawerWidthMobile : drawerWidthDesktop,
          boxSizing: "border-box",
          backgroundColor: "#1976D2",
          color: "white",
          borderRadius: "10px",
          marginTop: "5%",
          marginLeft: "0.5%",
        },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {isEmployee || isEmployer ? (
          menuItems.map((text) => {
            const route = `/${text.replace(/\s+/g, "").toLowerCase()}`;
            const isActive = location.pathname === route;

            return (
              <ListItem
                button
                key={text}
                component={text === "Logout" ? "div" : Link}
                to={text === "Logout" ? undefined : route}
                onClick={text === "Logout" ? handleLogout : undefined}
                sx={{
                  backgroundColor: isActive ? "#0056b3" : "transparent",
                  "&:hover": {
                    backgroundColor: "#5384c9",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {iconsMap[text]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: "white" }} />
              </ListItem>
            );
          })
        ) : isAdmin ? (
          <>
            <ListItem
              button
              component={Link}
              to="/dashboard"
              sx={{
                backgroundColor: location.pathname === "/dashboard" ? "#0056b3" : "transparent",
                "&:hover": {
                  backgroundColor: "#5384c9",
                },
                py: 0.5,
                px: 1,
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ color: "white" }} />
            </ListItem>

            <Accordion
              sx={{
                backgroundColor: "#1976D2",
                color: "white",
                boxShadow: "none",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="employer-content"
                id="employer-header"
                sx={{
                  textAlign: "left",
                  "& .MuiAccordionSummary-content": {
                    marginLeft: 0,
                  },
                }}
              >
                <ListItemText primary="Employers" />
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  padding: 0,
                  scrollbarWidth: "thin",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#5384c9",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#e0e0e0",
                    borderRadius: "10px",
                  },
                }}
              >
                <TextField
                  placeholder="Search Employers"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  label="Search Employers"
                  sx={{
                    width: "80%",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
                <List component="div" disablePadding>
                  {filteredEmployers.map((employer) => (
                    <ListItem
                      key={employer.id}
                      button
                      sx={{
                        backgroundColor:
                          selectedEmployer === employer.id ? "#0056b3" : "transparent",
                        "&:hover": {
                          backgroundColor: "#5384c9",
                          borderRadius: "2px",
                        },
                        margin: "0",
                        padding: "0",
                        py: 0.5,
                        px: 1,
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedEmployer === employer.id}
                            onChange={() => {
                              handleEmployerSelect(employer.id);
                              handleEmployer(employer.id);
                            }}
                            sx={{
                              color: "white",
                              "&.Mui-checked": { color: "#ffffff" },
                            }}
                          />
                        }
                        label={employer.name}
                        sx={{
                          color: "white",
                          margin: "0px",
                          fontSize: "0.4rem",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
            <ListItem
              button
              component={Link}
              to="/employee"
              sx={{
                backgroundColor: location.pathname === "/employee" ? "#0056b3" : "transparent",
                "&:hover": {
                  backgroundColor: "#5384c9",
                },
                py: 0.5,
                px: 1,
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Employee" sx={{ color: "white" }} />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/volunteers"
              sx={{
                backgroundColor: location.pathname === "/volunteers" ? "#0056b3" : "transparent",
                "&:hover": {
                  backgroundColor: "#5384c9",
                },
                py: 0.5,
                px: 1,
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <VolunteerActivismIcon />
              </ListItemIcon>
              <ListItemText primary="Volunteers" sx={{ color: "white" }} />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/trainers"
              sx={{
                backgroundColor: location.pathname === "/trainers" ? "#0056b3" : "transparent",
                "&:hover": {
                  backgroundColor: "#5384c9",
                },
                py: 0.5,
                px: 0.5,
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <TrainerIcon />
              </ListItemIcon>
              <ListItemText primary="Trainers" sx={{ color: "white" }} />
            </ListItem>
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                "&:hover": {
                  backgroundColor: "#5384c9",
                },
                py: 0.5,
                px: 1,
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: "white" }} />
            </ListItem>
          </>
        ) : null}
      </List>

      {selectedEmployerID && <Employers Employer={selectedEmployerID} />}
    </Drawer>
  );
}
