// UploadResume.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid } from '@mui/material';

const UploadResume = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {/* <DialogTitle>Upload Resume</DialogTitle> */}
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <label style={{fontSize:'18px'}}>Upload Resume (pdf)</label>
          <TextField
                                    type="file"
                                    // onChange={(event) => setGst(event.target.files[0])}
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className="custom-input"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#fff',
                                            '& fieldset': {
                                                borderColor: '#ccc',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#888',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#000',
                                            },
                                        },
                                        '& input[type="file"]': {
                                            display: 'block',
                                            cursor: 'pointer',
                                        },
                                    }}
                                />
          </Grid>
          <Grid item xs={12}>
          <label style={{fontSize:'18px'}}>Upload Resume (video)</label>
          <TextField
                                    type="file"
                                    // onChange={(event) => setGst(event.target.files[0])}
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className="custom-input"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#fff',
                                            '& fieldset': {
                                                borderColor: '#ccc',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#888',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#000',
                                            },
                                        },
                                        '& input[type="file"]': {
                                            display: 'block',
                                            cursor: 'pointer',
                                        },
                                    }}
                                />
          </Grid>
          
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={onClose} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadResume;
