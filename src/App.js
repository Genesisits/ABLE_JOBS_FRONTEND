import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import Header from "./components/header/header";
import Main from "./components/main/main";
import About from "./components/about/about";
import Blog from "./components/blog/blog" ;
import Careers from "./components/careers/careers";
import Contact from "./components/contact/contact";
import Gallery from "./components/gallery/gallery";
import Services from "./components/services/services";
import Wedding from "./components/services/wedding";
import CorporateEvents from "./components/services/corporateevents";
import MiceEvents from "./components/services/mice";
import MovieEvents from "./components/services/moviepublicity";
import BirthdayEvents from "./components/services/birthday";
import SportsEvents from "./components/services/sports";
import MediaEvents from "./components/services/media";
import CelebrityEvents from "./components/services/celebrity";
import OccasionalEvents from "./components/services/occasional";
import EntertainmentEvents from "./components/services/entertainment";
import SfxEvents from "./components/services/sfxproducts";
import VenderLogin from "./vender/vlogin";
import Register from "./Auth/Register";
import Registeras from "./Auth/Registeras";
import SignupOtp from "./vender/signupotp";
import './styles.css';
import ReactGA from "react-ga4";
import Admin from "./admin/admin";
import Vender from "./vender/vender";
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
import Volunteer from './Auth/Volunteer'
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
          <Route path="/about" element={<About />} />
          <Route path="/jobstatus" element={<Jobstatus />} />
          <Route path="/trainer" element={<Trainer/>}/>
          <Route path="/volunteer" element={<Volunteer/>}/>
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/shortlisted" element={<Shortlisted />} />
          <Route path="/register" element={<Registeras />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/findjobs" element={<Findjobs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/forgetpassword" element={<ForgetPassword/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/verify" element={<VerifyOTP />} />
          <Route path="/services" element={<Services/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/wedding" element={<Wedding/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/corporateevents" element={<CorporateEvents/>} />
          <Route path="/miceevents" element={<MiceEvents/>} />
          <Route path="/movieevents" element={<MovieEvents/>} />
          <Route path="/birthdayevents" element={<BirthdayEvents/>} />
          <Route path="/jobsapplied" element={<Jobsapplied/>} />
          <Route path="/sportsevents" element={<SportsEvents/>} />
          <Route path="/mediaevents" element={<MediaEvents/>} />
          <Route path="/celebrityevents" element={<CelebrityEvents/>} />
          <Route path="/occasionalevents" element={<OccasionalEvents/>} />
          <Route path="/entertainmentevents" element={<EntertainmentEvents/>} />
          <Route path="/sfxevents" element={<SfxEvents/>} />
          <Route path="/signupotp" element={<SignupOtp/>} />
          <Route path="/login" element={<VenderLogin/>} />
          <Route path="/employeeregister" element={<Register/>} />
          <Route path="/employerregister" element={<Employerregister/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          {shouldRedirectToAdmin ? <Navigate to="/admin" /> : null}
          <Route path="/admin" element={<Admin/>} />
          <Route path="/vender" element={<Vender/>} />
          <Route path="/addevent" element={<AddEvent/>} />
          <Route path="/caddevent" element={<AddEventItems/>} />
          <Route path="/eventitem" element={<EventItems/>} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/resetpassword" element={<ResetPassword/>} />
          <Route path="/employeedata" element={<EmployeeData/>} />
          <Route path="/findajob" element={<Findjob/>} />
          <Route path="/applied" element={<Applied/>} />
          <Route path="/shortlist" element={<Shortlist/>} />
        </Routes>
      </div>
    </Router>
  );
}