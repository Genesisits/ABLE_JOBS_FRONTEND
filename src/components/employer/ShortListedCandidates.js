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
  CircularProgress, // Import TableContainer
} from "@mui/material";
import Switch from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from "axios";
import { ONBOARD_CANDIDATE, SHORTLIST_CANDIDATES, SHORTLIST_ONBOARD } from "../../endpoints"; // Correct endpoint import

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShortListedCandidates({ open, onClose, jobCode }) {
  const [loading, setLoading] = useState(false)
  const [appliedCandidates, setAppliedCandidates] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch applied candidates whenever jobCode changes
  useEffect(() => {
    if (open && jobCode) {
      setLoading(true)
      axios.get(`${SHORTLIST_ONBOARD}${jobCode}`)
        .then((response) => {
          setAppliedCandidates(response.data);
        })
        .catch((error) => {
          console.error("Error fetching candidates:", error);
        }).finally(() => {
          setLoading(false)
        })
    }
  }, [open ,jobCode]);

  const handleActive = (row) => {
    // Optimistically update the local state
    const updatedCandidates = appliedCandidates.map(candidate => {
      if (candidate.application_code === row.application_code) {
        // Toggle the onboarded status locally
        return {
          ...candidate,
          onboarded_status: !candidate.onboarded_status,
        };
      }
      return candidate;
    });
  
    // Update the state with the new values
    setAppliedCandidates(updatedCandidates);
  
    // Now make the API call to update the backend
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };
  
    axios
      .put(`${ONBOARD_CANDIDATE}${row.application_code}/`)
      .then((response) => {
        // Optionally handle the success response
        console.log(response);
      })
      .catch((error) => {
        // If API call fails, revert the local state change
        console.error("Error onboarding candidate:", error);
        // Revert the switch state if the API call fails
        setAppliedCandidates(prevState =>
          prevState.map(candidate =>
            candidate.application_code === row.application_code
              ? { ...candidate, onboarded_status: !candidate.onboarded_status }
              : candidate
          )
        );
      });
  };
  

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
              <TableCell>Actions</TableCell>
              {/* <TableCell>Video Resume</TableCell> */}
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
                      <Switch
                              checked={candidate.onboarded_status}
                              onChange={() => handleActive(candidate)}
                              inputProps={{ "aria-label": "controlled" }}
                               size="small"
                               disabled={candidate.onboarded_status} 
                            />
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
