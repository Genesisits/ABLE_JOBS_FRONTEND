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
  TableContainer, // Import TableContainer
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { APPLIED_CANDIDATES } from "../../endpoints"; // Correct endpoint import

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppliedCandidatesDialog({ open, onClose, jobCode }) {
  const [appliedCandidates, setAppliedCandidates] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch applied candidates whenever jobCode changes
  useEffect(() => {
    if (jobCode) {
      axios.get(`${APPLIED_CANDIDATES}${jobCode}`)
        .then((response) => {
          setAppliedCandidates(response.data);
        })
        .catch((error) => {
          console.error("Error fetching candidates:", error);
        });
    }
  }, [jobCode]);

  const handleCloseDialog = () => {
    onClose();
    setAppliedCandidates([]);
    setSelectedJob(null);
  };

  const handleOpenFile = (fileUrl, type) => {
    if (type === "pdf") {
      window.open(fileUrl, "_blank");
    } else if (type === "video") {
      const videoWindow = window.open("", "_blank");
      videoWindow.document.write(
        `<video controls src="${fileUrl}" style="width: 100%; height: auto;"></video>`
      );
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleCloseDialog}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2, flex: 1 }}>
            Applied Candidates for {selectedJob?.job_title || "Unknown Job"}
          </Typography>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Application Code</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Resume</TableCell>
              <TableCell>Video Resume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appliedCandidates.length > 0 ? (
              appliedCandidates.map((candidate, index) => (
                <TableRow key={index}>
                  <TableCell>{candidate.application_code}</TableCell>
                  <TableCell>{candidate.employee_name}</TableCell>
                  <TableCell>{candidate.job_title}</TableCell>
                  <TableCell>
                    {candidate.resume_url && (
                      <IconButton
                        onClick={() => handleOpenFile(candidate.resume_url, "pdf")}
                        title="View Resume"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    {candidate.video_resume_url && (
                      <IconButton
                        onClick={() =>
                          handleOpenFile(candidate.video_resume_url, "video")
                        }
                        title="View Video Resume"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
