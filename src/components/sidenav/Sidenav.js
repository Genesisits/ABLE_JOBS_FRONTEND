import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Drawer, List, ListItem, ListItemText, Toolbar, Divider, Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel } from '@mui/material';
import { Link, useNavigate ,useLocation, Route, Routes} from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EMPLOYERS_LIST } from '../../endpoints';
import Employers from '../admin/Employers';

const drawerWidth = 240;

export default function Sidenav() {
    const [selectedEmployer, handleEmployerSelect] = useState("");
    const [selectedEmployerID, setEmployerID] = useState("")
    const [employers, setEmployers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const isEmployee = localStorage.getItem('is_employee') === 'true';
    const isEmployer = localStorage.getItem('is_employer') === 'true';
    const isAdmin = localStorage.getItem('is_admin') === 'true';

    useEffect(() => {
        if (isAdmin) {
            axios.get(`${EMPLOYERS_LIST}`).then((response) => {
                let employers_data = []
                for(let j in response.data) {
                    employers_data.push({name:response.data[j].company_name,id:response.data[j].code})
                }
                setEmployers(employers_data)
              });
        }
    }, [isAdmin]);

    let menuItems = [];
    if (isEmployee) {
        menuItems = ['Find a Job', 'Applied', 'Shortlist', 'On Board', 'Logout'];
    } else if (isEmployer) {
        menuItems = ['Jobs', 'Shortlisted', 'Reports', 'Logout'];
    }

    const handleEmployer = (empname, empId) => {
        handleEmployerSelect(empname)
        setEmployerID(empId)
        navigate(`/employers/${empId}`);
        // console.log(selectedEmployer)
        // localStorage.setItem('selectedEmployer', empId)
        // navigate('/employers')
    }

    const handleLogout = () => {
        // Clear relevant items from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('is_employee');
        localStorage.removeItem('is_employer');
        localStorage.removeItem('is_admin');
        // Navigate to login or home page
        navigate('/login');
    };

    // Now rendering Drawer based on user role
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#1976D2',
                    color: 'white',
                    borderRadius: '10px',
                    marginTop: '5%',
                    marginLeft: '0.5%',
                },
            }}
        >
            <Toolbar />
            <Divider />
            <List>
                {isEmployee || isEmployer ? (
                    menuItems.map((text) => (
                        <ListItem
                            button
                            key={text}
                            component={text === 'Logout' ? 'div' : Link}
                            to={text === 'Logout' ? undefined : `/${text.replace(/\s+/g, '').toLowerCase()}`}
                            onClick={text === 'Logout' ? handleLogout : undefined}
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#5384c9',
                                },
                            }}
                        >
                            <ListItemText primary={text} sx={{ color: 'white' }} />
                        </ListItem>
                    ))
                ) : isAdmin ? (
                    <>
                        {/* Admin-specific menu items */}
                        <ListItem
                            button
                            component={Link}
                            to="/dashboard"
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#5384c9',
                                },
                                py: 0.5,
                                px: 1,
                            }}
                        >
                            <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
                        </ListItem>

                        <Accordion
                            sx={{
                                backgroundColor: '#1976D2',
                                color: 'white',
                                boxShadow: 'none',
                                '&:before': { display: 'none' },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                aria-controls="employer-content"
                                id="employer-header"
                                sx={{
                                    textAlign: 'left', // Align text to the left
                                    '& .MuiAccordionSummary-content': {
                                        marginLeft: 0, // Ensure left alignment
                                    },
                                }}
                            >
                                <ListItemText primary="Employers" />
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    padding: 0,
                                    scrollbarWidth: 'thin',
                                    '&::-webkit-scrollbar': {
                                        width: '8px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: '#5384c9',
                                        borderRadius: '10px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        backgroundColor: '#e0e0e0',
                                        borderRadius: '10px',
                                    },
                                }}
                            >
                                <List component="div" disablePadding>
                                    {employers.map((employer) => (
                                        <ListItem
                                            key={employer.id}
                                            button
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#5384c9',
                                                    borderRadius: '2px',
                                                },
                                                margin:'0',
                                                padding:'0',
                                                py: 0.5,
                                                px: 1,
                                            }}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                    size="small"
                                                        checked={selectedEmployerID === employer.id}
                                                        onChange={()=>handleEmployer(employer.name,employer.id)}
                                                        sx={{
                                                            color: 'white',
                                                            '&.Mui-checked': { color: '#ffffff' },
                                                            marginLeft: 0, // Align checkbox to the left
                                                        }}
                                                    />
                                                }
                                                label={employer.name}
                                                sx={{
                                                    color: 'white',
                                                    margin: '0px',
                                                    fontSize: '0.6rem',
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>

                        {/* Other Admin menu items */}
                        <ListItem
                            button
                            component={Link}
                            to="/employee"
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#5384c9',
                                },
                                py: 0.5,
                                px: 1,
                            }}
                        >
                            <ListItemText primary="Employee" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/volunteers"
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#5384c9',
                                },
                                py: 0.5,
                                px: 1,
                            }}
                        >
                            <ListItemText primary="Volunteers" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/trainers"
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#5384c9',
                                },
                                py: 0.5,
                                px: 0.5,
                            }}
                        >
                            <ListItemText primary="Trainers" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem
                            button
                            onClick={handleLogout}
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#5384c9',
                                },
                                py: 0.5,
                                px: 1,
                            }}
                        >
                            <ListItemText primary="Logout" sx={{ color: 'white' }} />
                        </ListItem>
                    </>
                ) : null}
            </List>
            {selectedEmployerID && 
            <Employers Employer={selectedEmployerID} /> }
        </Drawer>
    );
}
