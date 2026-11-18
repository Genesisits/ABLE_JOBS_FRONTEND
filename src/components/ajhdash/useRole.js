import { useLocation } from "react-router-dom";

const employeePaths = ["/findajob", "/applied", "/shortlist", "/onboard", "/uploadresume"];
const employerPaths = ["/jobs", "/shortlisted", "/reports"];

// Works out which dashboard menu to show. Falls back to the current URL when
// nothing is stored in localStorage (e.g. backend down / not logged in).
export default function useRole() {
  const { pathname } = useLocation();
  const ls = (k) => localStorage.getItem(k) === "true";
  const noRole = !ls("is_employee") && !ls("is_employer") && !ls("is_admin") && !ls("is_trainer");
  return {
    pathname,
    isEmployee: ls("is_employee") || (noRole && employeePaths.includes(pathname)),
    isEmployer: ls("is_employer") || (noRole && employerPaths.includes(pathname)),
    isTrainer: ls("is_trainer") || (noRole && pathname === "/trainerdashboard"),
    isAdmin: ls("is_admin"),
  };
}
