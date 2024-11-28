import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidenav() {
    const navigate = useNavigate();
    const isEmployee = localStorage.getItem('is_employee') === 'true';
    const isEmployer = localStorage.getItem('is_employer') === 'true';
    const isAdmin = localStorage.getItem('is_admin') === 'true';

    let menuItems = [];
    if (isEmployee) {
        menuItems = ['Find a Job', 'Applied', 'Shortlist','On Board', 'Logout'];
    } else if (isEmployer) {
        menuItems = ['Jobs',  'Shortlisted','Reports', 'Logout'];
    } else if (isAdmin) {
        menuItems = ['Dashboard', 'Employers','Volunteers', 'Logout'];
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
    }

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
                {menuItems.map((text) => (
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
                ))}
            </List>
        </Drawer>
    );
}
