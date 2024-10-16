import * as React from 'react';
import { CssBaseline, Box, Toolbar } from '@mui/material';
import Sidenav from './Sidenav'; // Import your Sidenav component

export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidenav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        //   marginLeft: '240px', 
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
