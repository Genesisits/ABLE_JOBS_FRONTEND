import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, Button, TextField, Grid, Snackbar, Alert ,CircularProgress, } from '@mui/material';
import { UPLOAD_RESUME } from './../../endpoints';
import axios from 'axios';

const UploadResume = ({ open, onClose }) => {
    const [pdfFile, setPdfFile] = useState(null); 
    const [videoFile, setVideoFile] = useState(null); 
    const [snackbarOpen, setSnackbarOpen] = useState(false); 
    const [snackbarMessage, setSnackbarMessage] = useState(''); 
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
    const [loading, setLoading] = useState(false);

    
    const validateFile = (file, type) => {
        const maxSize = 5 * 1024 * 1024; 
        if (file.size > maxSize) {
            setSnackbarMessage('File size exceeds 5MB');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return false;
        }

       
        const validTypes = type === 'pdf' 
            ? ['application/pdf'] 
            : ['video/mp4', 'video/avi', 'video/mkv'];

        if (!validTypes.includes(file.type)) {
            setSnackbarMessage(type === 'pdf' ? 'Please upload a valid PDF file' : 'Please upload a valid video file');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return false;
        }

        return true;
    };

    const handleUploadResume = async () => {
       
        if (!pdfFile) {
            setSnackbarMessage('Please upload a PDF file');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        if (!videoFile) {
            setSnackbarMessage('Please upload a video file');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        
        if (!validateFile(pdfFile, 'pdf') || !validateFile(videoFile, 'video')) return;
        setLoading(true);
        const token = localStorage.getItem("access_token");
        console.log("Token being sent:", token);

        const formData = new FormData();
        formData.append("resume", pdfFile);
        formData.append("video_resume", videoFile);

        try {
            const response = await axios.post(
                UPLOAD_RESUME,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            
            if (response.status === 200 || response.status === 201) {
                setSnackbarMessage("Resume uploaded successfully!");
                setSnackbarSeverity('success');
                setTimeout(() => {
                    window.location.reload();
                  }, 5000);
            } else {
                setSnackbarMessage("Failed to upload the resume.");
                setSnackbarSeverity('error');
            }
        } catch (error) {
            console.error("Full error response:", error.response);
            setSnackbarMessage(error.response?.data?.detail || "There was an error uploading the resume.");
            setSnackbarSeverity('error');
        }
        finally {
            setLoading(false); 
            setSnackbarOpen(true); 
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Dialog open={open} onClose={onClose}>
             {loading && (
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
          <p style={{ marginTop: '15px', fontSize: '18px', fontWeight: 'bold', color: '#00000' }}>
                Please wait...
            </p>
        </div>
      )}
            <DialogContent>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12}>
                        <label style={{ fontSize: '18px' }}>Upload Resume (PDF)</label>
                        <TextField
                            type="file"
                            onChange={(event) => setPdfFile(event.target.files[0])} 
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
                        <label style={{ fontSize: '18px' }}>Upload Resume (Video)</label>
                        <TextField
                            type="file"
                            onChange={(event) => setVideoFile(event.target.files[0])} 
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
                <Button onClick={handleUploadResume} color="primary">Submit</Button>
            </DialogActions>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default UploadResume;
