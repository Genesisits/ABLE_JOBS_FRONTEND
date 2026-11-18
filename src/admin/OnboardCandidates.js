import React, { useState, useEffect } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Button,
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
import Switch from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import VideoResumePlayerDialog from "../employer/VideoResumePlayerDialog";
import PdfResumeViewerDialog from "../employer/PdfResumeViewerDialog";
import EmployeeDetailsDialog from "../employer/EmployeeDetailsDialog";
import PersonIcon from "@mui/icons-material/Person";
import { ONBOARD_CANDIDATE, ONBOARDED_LIST } from "../../endpoints"; // Correct endpoint import

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OnboardCandidates({ open, onClose, selectedRow }) {
  const [appliedCandidates, setAppliedCandidates] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [player, setPlayer] = useState({ open: false, url: null, name: "" });
  const [pdf, setPdf] = useState({ open: false, url: null, name: "" });
  const [details, setDetails] = useState({ open: false, code: null });
  const [loading, setLoading] = useState(false)

  // Fetch applied candidates whenever jobCode changes
  useEffect(() => {
    setLoading(true)
    if (open && selectedRow) {
      axios
        .get(`${ONBOARDED_LIST}${selectedRow.code}`)
        .then((response) => {
          setAppliedCandidates(response.data);
        })
        .catch((error) => {
          console.error("Error fetching candidates:", error);
        }).finally(()=> {
          setLoading(false)
        })
    }
  }, [open, selectedRow]);

  const handleActive = (row) => {
    // Optimistically update the local state
    const updatedCandidates = appliedCandidates.map((candidate) => {
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
        setAppliedCandidates((prevState) =>
          prevState.map((candidate) =>
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

  const handleOpenPdf = (candidate) =>
    setPdf({
      open: true,
      url: candidate.resume_url || null,
      name: candidate.employee_name || "",
    });

  const handleOpenVideo = (candidate) =>
    setPlayer({
      open: true,
      url: candidate.video_resume_url || null,
      name: candidate.employee_name || "",
    });

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
            Onboarded Candidates for{" "}
            {selectedRow ? selectedRow.job_title : "Unknown Job"}
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
                  <TableCell>
          <Button
            size="small"
            onClick={() => setDetails({ open: true, code: candidate.application_code })}
            sx={{ textTransform: "none", fontWeight: 600, p: 0, minWidth: 0 }}
            title="View all details"
          >
            {candidate.employee_name}
          </Button>
        </TableCell>
                  <TableCell>{candidate.job_title}</TableCell>
                  <TableCell>
                    <IconButton
          onClick={() => setDetails({ open: true, code: candidate.application_code })}
          title="View all details"
        >
          <PersonIcon />
        </IconButton>
        <IconButton
                      onClick={() => handleOpenPdf(candidate)}
                      disabled={!candidate.resume_url}
                      title={candidate.resume_url ? "View Resume" : "No resume"}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenVideo(candidate)}
                      disabled={!candidate.video_resume_url}
                      color="primary"
                      title={candidate.video_resume_url ? "Watch Video Resume" : "No video resume"}
                    >
                      <PlayArrowIcon />
                    </IconButton>
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
                  Onboarded candidadates not found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <EmployeeDetailsDialog
        open={details.open}
        applicationCode={details.code}
        onClose={() => setDetails({ open: false, code: null })}
      />
      <PdfResumeViewerDialog
        open={pdf.open}
        url={pdf.url}
        candidateName={pdf.name}
        onClose={() => setPdf({ open: false, url: null, name: "" })}
      />
      <VideoResumePlayerDialog
        open={player.open}
        url={player.url}
        candidateName={player.name}
        onClose={() => setPlayer({ open: false, url: null, name: "" })}
      />
    </Dialog>
  );
}
