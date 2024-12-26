import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/header/header";
import Main from "./components/main/main";
import Contact from "./components/contact/contact";
import Gallery from "./components/gallery/gallery";
// import VenderLogin from "./vender/vlogin";
import Register from "./Auth/Register";
import Registeras from "./Auth/Registeras";
import './styles.css';
import ReactGA from "react-ga4";
import Admin from "./admin/admin";
import AddEvent from "./admin/addevent";
import AddEventItems from "./admin/caddevent";
import EventItems from "./admin/assign";
import ForgotPassword from "./components/password/forgotpassword";
import ResetPassword from "./components/password/resetpassword";
import Login from "./Auth/Login";
import ScrollToTop from './scroll';
import Dashboard from "./components/Dashboard/Dashboard";
import ForgetPassword from "./Auth/ForgetPassword";
import VerifyOTP from "./Auth/VerifyOTP";
import Profile from "./components/Profile";
import Jobstatus from "./components/employeestatus/Jobstatus";
import Employerregister from "./Auth/Employerregister";
import Jobsapplied from "./components/employeestatus/Jobsapplied";
import Jobs from "./components/employer/Jobs";
import Findjobs from "./components/employeestatus/Findjobs";
import Shortlisted from "./components/employer/Shortlisted";
import EmployeeData from "./components/Employee/employee";
import Findjob from "./components/Employee/findajob";
import Applied from "./components/Employee/applied";
import Shortlist from "./components/Employee/shortlist";
import Trainer from './Auth/Trainer';
import Volunteer from './Auth/Volunteer';
import UploadResume from './components/Employee/uploadresume';
import Onboarded from './components/Employee/onboarded';
import Email from './Auth/emailsuccess';
import Employers from "./components/admin/Employers";
import Volunteers from "./components/admin/Volunteers";
import Trainers from "./components/admin/Trainers";
import EmployeeList from "./components/admin/employeelist";
import OnboardCandidates from "./components/admin/OnboardCandidates";
const TRACKING_ID = 'G-3Z5SJGDL7N';

ReactGA.initialize(TRACKING_ID);
ReactGA.send({ 
  hitType: "pageview",
   page:"/",
    title: "main",
   })

export default function App() {
  // const navigate = Navigate();
  const shouldRedirectToAdmin = false;
  <ScrollToTop />
  
  return (
    <Router>
      <div className="App">
      <ScrollToTop />
      <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/jobstatus" element={<Jobstatus />} />
          <Route path="/trainer" element={<Trainer/>}/>
          <Route path="/volunteer" element={<Volunteer/>}/>
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/shortlisted" element={<Shortlisted />} />
          <Route path="/register" element={<Registeras />} />
          <Route path="/findjobs" element={<Findjobs />} />
          <Route path="/forgetpassword" element={<ForgetPassword/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/onboardedcandidates" element={<OnboardCandidates />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/verify" element={<VerifyOTP />} />
          <Route path="/employers/:id" element={<Employers />} />
          <Route path="/volunteers" element={<Volunteers/>} />
          <Route path="/trainers" element={<Trainers/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/jobsapplied" element={<Jobsapplied/>} />
          {/* <Route path="/login" element={<VenderLogin/>} /> */}
          <Route path="/employeeregister" element={<Register/>} />
          <Route path="/employerregister" element={<Employerregister/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          {shouldRedirectToAdmin ? <Navigate to="/admin" /> : null}
          <Route path="/admin" element={<Admin/>} />
          <Route path="/addevent" element={<AddEvent/>} />
          <Route path="/caddevent" element={<AddEventItems/>} />
          <Route path="/eventitem" element={<EventItems/>} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/resetpassword" element={<ResetPassword/>} />
          <Route path="/employeedata" element={<EmployeeData/>} />
          <Route path="/findajob" element={<Findjob/>} />
          <Route path="/applied" element={<Applied/>} />
          <Route path="/shortlist" element={<Shortlist/>} />
          <Route path="/uploadresume" element={<UploadResume/>} />
          <Route path="/onboard" element={<Onboarded/>} />
          <Route path="/email" element={<Email/>} />
          <Route path="/employee" element={<EmployeeList/>} />
        </Routes>
      </div>
    </Router>
  );
}