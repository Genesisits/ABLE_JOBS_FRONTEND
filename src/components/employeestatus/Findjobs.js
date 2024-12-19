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
      flex: 1, 
      marginRight: 1 
    }}
  />
  <Button
    variant="contained"
    color="primary"
    sx={{
      flex: 0.2 
    }}
  >
    Search
  </Button>
 </Box>
  )
}

export default Findjobs