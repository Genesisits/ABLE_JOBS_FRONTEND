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
} from "@mui/material";
import Switch from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import { ONBOARD_CANDIDATE, ONBOARDED_LIST } from "../../endpoints"; 

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OnboardCandidates({ open, onClose, selectedRow }) {
  const [appliedCandidates, setAppliedCandidates] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false)

  
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
    
    const updatedCandidates = appliedCandidates.map((candidate) => {
      if (candidate.application_code === row.application_code) {
        
        return {
          ...candidate,
          onboarded_status: !candidate.onboarded_status,
        };
      }
      return candidate;
    });

    
    setAppliedCandidates(updatedCandidates);

    
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    axios
      .put(`${ONBOARD_CANDIDATE}${row.application_code}/`)
      .then((response) => {
        
        console.log(response);
      })
      .catch((error) => {
        
        console.error("Error onboarding candidate:", error);
        
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
                  Onboarded candidadates not found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
}
