import React from 'react'
import './jobs.css'
import { Box, Button, TextField } from '@mui/material'

function Findjobs() {
  return (
 <Box sx={{ display: 'flex', width: '100%', marginBottom: 2 }}>
     <TextField
    placeholder="Search jobs..."
    fullWidth
    sx={{
      flex: 1, // This takes 80% of the width
      marginRight: 1 // Add a little space between input and button
    }}
  />
  <Button
    variant="contained"
    color="primary"
    sx={{
      flex: 0.2 // This takes 20% of the width
    }}
  >
    Search
  </Button>
 </Box>
  )
}

export default Findjobs