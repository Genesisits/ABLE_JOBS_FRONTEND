import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, Button, TextField, Grid } from '@mui/material';
import { UPLOAD_RESUME } from './../../endpoints';
import axios from 'axios';

const UploadResume = ({ open, onClose }) => {
    const [pdfFile, setPdfFile] = useState(null); // State for PDF file
    const [videoFile, setVideoFile] = useState(null); // State for Video file

    const handleUploadResume = async () => {
        const token = localStorage.getItem("access_token");
        console.log("Token being sent:", token);

        const formData = new FormData();
        if (pdfFile) formData.append("resume", pdfFile);
        if (videoFile) formData.append("video_resume", videoFile);

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

            if (response.status === 201) {
                alert("Resume uploaded successfully!");
            } else {
                alert("Failed to upload the resume.");
            }
        } catch (error) {
            console.error("Full error response:", error.response);
            alert(error.response?.data?.detail || "There was an error uploading the resume.");
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <label style={{ fontSize: '18px' }}>Upload Resume (PDF)</label>
                        <TextField
                            type="file"
                            onChange={(event) => setPdfFile(event.target.files[0])} // Update state
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
                            onChange={(event) => setVideoFile(event.target.files[0])} // Update state
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
        </Dialog>
    );
};

export default UploadResume;
