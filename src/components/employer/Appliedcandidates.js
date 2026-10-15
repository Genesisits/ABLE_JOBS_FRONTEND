import React, { useState, useEffect } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Paper,
  Slide,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  CircularProgress,
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import { APPLIED_CANDIDATES, SHORTLIST_CANDIDATES, ERESUME } from "../../endpoints";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppliedCandidatesDialog({ open, onClose, jobCode }) {
  const [loading, setLoading] = useState(false);
  const [appliedCandidates, setAppliedCandidates] = useState([]);

  // Fetch applied candidates
  useEffect(() => {
    if (open && jobCode) {
      setLoading(true);
      axios
        .get(`${APPLIED_CANDIDATES}${jobCode}/`)
        .then((response) => {
          setAppliedCandidates(Array.isArray(response.data) ? response.data : []);
        })
        .catch((error) => {
          console.error("Error fetching candidates:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, jobCode]);

  // Toggle active status
  const handleActive = (row) => {
    const updatedCandidates = appliedCandidates.map((candidate) =>
      candidate.application_code === row.application_code
        ? { ...candidate, shortlisted_status: !candidate.shortlisted_status }
        : candidate
    );
    setAppliedCandidates(updatedCandidates);

    axios
      .put(`${SHORTLIST_CANDIDATES}${row.application_code}/`, {
        shortlisted_status: !row.shortlisted_status,
      })
      .catch((error) => {
        console.error("Error updating candidate status:", error);
        // Revert toggle in case of error
        setAppliedCandidates((prevState) =>
          prevState.map((candidate) =>
            candidate.application_code === row.application_code
              ? { ...candidate, shortlisted_status: !candidate.shortlisted_status }
              : candidate
          )
        );
      });
  };

  // Handle opening files
  const handleOpenFile = (code, type) => {
    axios
      .get(`${ERESUME}${code}/`)
      .then((response) => {
        if (response.data.resumes && response.data.resumes.length > 0) {
          const resumeData = response.data.resumes[0]; 
  
          
          const fileUrl = type === "pdf" ? resumeData.resume : resumeData.video_resume;
  
          console.log(fileUrl); 
  
          
          if (fileUrl) {
            if (type === "pdf") {
              // Open the PDF in a new tab
              const pdfWindow = window.open(fileUrl, "_blank");
              if (!pdfWindow) {
                console.error("Popup blocked. Unable to open the PDF.");
              }
            } else if (type === "video") {
              // Open the video in a new tab with an embedded video player
              const videoWindow = window.open("", "_blank");
              if (videoWindow) {
                videoWindow.document.write(`
                  <html>
                    <head><title>Video Resume</title></head>
                    <body>
                      <video controls src="${fileUrl}" style="width: 100%; height: 700px;"></video>
                    </body>
                  </html>
                `);
              } else {
                console.error("Popup blocked. Unable to open the video.");
              }
            }
          } else {
            console.error("File URL is missing");
          }
        } else {
          console.error("No resumes found for this code:", code);
        }
      })
      .catch((error) => {
        console.error("Error fetching file:", error);
      });
  };
  
  
  // Handle closing the dialog
  const handleCloseDialog = () => {
    onClose();
    setAppliedCandidates([]);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleCloseDialog}
      TransitionComponent={Transition}
    >
      {loading && (
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      )}
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            width='30px'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2, flex: 1 }}>
            Applied Candidates
          </Typography>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Application Code</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {appliedCandidates.length > 0 ? (
    appliedCandidates.map((candidate) => (
      <TableRow key={candidate.application_code}>
        <TableCell>{candidate.application_code}</TableCell>
        <TableCell>{candidate.employee_name}</TableCell>
        <TableCell>
          <IconButton
            onClick={() =>
              handleOpenFile(candidate.application_code, "pdf")
            }
            title="View Resume"
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              handleOpenFile(candidate.application_code, "video")
            }
            title="View Video Resume"
          >
            <PlayArrowIcon />
          </IconButton>
          <Switch
            checked={candidate.shortlisted_status}
            onChange={() => handleActive(candidate)}
            size="small"
          />
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={3} align="center">
        No applied candidates found.
      </TableCell>
    </TableRow>
  )}
</TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
}
