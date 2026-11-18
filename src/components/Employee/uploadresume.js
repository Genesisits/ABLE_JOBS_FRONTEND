import React, { useState, useEffect } from 'react';
import { CenterPopup } from '../notify/Notify';
import { UPLOAD_RESUME, MY_RESUME } from './../../endpoints';
import axios from 'axios';
import VideoResumeField from './VideoResumeField';
import OldResumePreview from './OldResumePreview';
import PurpleDialog, { FilePick } from './PurpleDialog';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DescriptionIcon from '@mui/icons-material/Description';
import VideocamIcon from '@mui/icons-material/Videocam';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const UploadResume = ({ open, onClose }) => {
    const [pdfFile, setPdfFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [loading, setLoading] = useState(false);
    const [presentResume, setPresentResume] = useState(null); // { resume_url, resume_name } or null
    const [resumeChecked, setResumeChecked] = useState(false);
    const [showPresent, setShowPresent] = useState(false);

    // Look up the resume the student already has whenever the dialog opens
    useEffect(() => {
        if (!open) return;
        const token = localStorage.getItem('access_token');
        if (!token) { setResumeChecked(true); return; }
        setResumeChecked(false);
        setShowPresent(false);
        axios
            .get(MY_RESUME, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setPresentResume(res.data?.has_resume
                    ? { resume_url: res.data.resume_url, resume_name: res.data.resume_name }
                    : null);
            })
            .catch(() => setPresentResume(null))
            .finally(() => setResumeChecked(true));
    }, [open]);

    const validateFile = (file, type) => {
        const maxSize = type === 'pdf' ? 5 * 1024 * 1024 : 25 * 1024 * 1024;
        if (file.size > maxSize) {
            setSnackbarMessage(type === 'pdf' ? 'File size exceeds 5MB' : 'Video size exceeds 25MB');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return false;
        }

        const validTypes = type === 'pdf' ? ['application/pdf'] : null;

        if (validTypes ? !validTypes.includes(file.type) : !file.type.startsWith('video/')) {
            setSnackbarMessage(type === 'pdf' ? 'Please upload a valid PDF file' : 'Please upload a valid video file');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return false;
        }

        return true;
    };

    const handleUploadResume = async () => {
        if (!pdfFile && !videoFile) {
            setSnackbarMessage('Please upload a PDF resume or add a video resume');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        if ((pdfFile && !validateFile(pdfFile, 'pdf')) || (videoFile && !validateFile(videoFile, 'video'))) return;
        setLoading(true);
        const token = localStorage.getItem("access_token");

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
            setSnackbarMessage(error.response?.data?.detail || error.response?.data?.error || "There was an error uploading the resume.");
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
        <PurpleDialog
            open={open}
            onClose={onClose}
            title="Upload Resume"
            icon={<UploadFileIcon />}
            width={showPresent ? 860 : 640}
            loading={loading}
            actions={
                <>
                    <button type="button" className="jd-btn jd-btn-outline" onClick={onClose}>
                        <CloseIcon /> Cancel
                    </button>
                    <button type="button" className="jd-btn jd-btn-fill" onClick={handleUploadResume}>
                        <CheckIcon /> Submit
                    </button>
                </>
            }
        >
            <div className="jd-section" style={{ marginTop: 0 }}>
                <div className="jd-section-title jd-present">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <DescriptionIcon /> Upload Resume <em>(PDF)</em>
                    </span>
                    <button
                        type="button"
                        className="jd-mini"
                        disabled={!resumeChecked}
                        onClick={() => setShowPresent((v) => !v)}
                    >
                        {showPresent ? 'Hide Present Resume' : 'Your Present Resume'}
                    </button>
                </div>

                {showPresent && (
                    <div style={{ marginBottom: 12 }}>
                        {presentResume ? (
                            <OldResumePreview url={presentResume.resume_url} name={presentResume.resume_name} />
                        ) : (
                            <div className="jd-notice">
                                <DescriptionIcon />
                                <p>You have not uploaded a resume yet. Please upload one below.</p>
                            </div>
                        )}
                    </div>
                )}

                <FilePick
                    file={pdfFile}
                    accept=".pdf,application/pdf"
                    onChange={setPdfFile}
                    label="Click to choose your PDF resume"
                    hint="PDF only, up to 5 MB"
                />
            </div>

            <div className="jd-section">
                <div className="jd-section-title">
                    <VideocamIcon /> Video Resume <em>(up to 1 minute)</em>
                </div>
                <div className="jd-video">
                    <VideoResumeField
                        value={videoFile}
                        onChange={setVideoFile}
                        onError={(msg) => {
                            setSnackbarMessage(msg);
                            setSnackbarSeverity('error');
                            setSnackbarOpen(true);
                        }}
                    />
                </div>
            </div>

            <CenterPopup
                open={snackbarOpen}
                severity={snackbarSeverity}
                message={snackbarMessage}
                onClose={handleSnackbarClose}
            />
        </PurpleDialog>
    );
};

export default UploadResume;
