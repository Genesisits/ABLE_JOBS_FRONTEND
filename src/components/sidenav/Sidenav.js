import * as React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidenav() {
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
          color:'blue',
          borderRadius: '10px',
          marginTop:'5%',
          marginLeft: '0.5%'
        },
      }}
    >
      <Toolbar />
      <Divider />
      { localStorage.getItem('is_employee') ===  true ? 
      <List>
        {['Dashboard','Find jobs', 'Job status','Jobs Applied', 'Profile', 'Logout'].map((text, index) => (
           <ListItem
           button
           key={text}
           component={Link}
           to={`/${text.replace(/\s+/g, '').toLowerCase()}`}
           sx={{
             '&:hover': {
               backgroundColor: '#5384c9', // Light blue color for hover
             },
           }}
         >
            <ListItemText primary={text} />
          </ListItem>
        ))} 
      </List> :
      //    <List>
      //   {['Jobs','Reports', 'Shortlisted',  'Profile', 'Logout'].map((text, index) => (
      //      <ListItem
      //      key={text}
      //      component={Link}
      //      to={`/${text.replace(/\s+/g, '').toLowerCase()}`}
      //      sx={{
      //        '&:hover': {
      //          backgroundColor: '#5384c9', // Light blue color for hover
      //        },
      //      }}
      //    >
      //       <ListItemText primary={text} />
      //     </ListItem>
      //   ))}
      // </List> 
      <List>
        {['find a Job','Applied', 'Shortlist', 'Logout'].map((text, index) => (
           <ListItem
           key={text}
           component={Link}
           to={`/${text.replace(/\s+/g, '').toLowerCase()}`}
           sx={{
             '&:hover': {
               backgroundColor: '#5384c9', // Light blue color for hover
             },
           }}
         >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> 
      
      }
    </Drawer>
  );
}
