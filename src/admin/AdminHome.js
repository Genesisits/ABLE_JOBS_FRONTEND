import { Navigate } from "react-router-dom";

// /admin entry point: signed-in admins go to the People Added page,
// everyone else goes to the login page.
export default function AdminHome() {
  const signedInAdmin =
    !!localStorage.getItem("access_token") && localStorage.getItem("is_admin") === "true";
  return <Navigate to={signedInAdmin ? "/peopleadded" : "/login"} replace />;
}
