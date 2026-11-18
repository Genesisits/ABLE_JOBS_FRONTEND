import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Lets signed-in users through; sends everyone else to /login.
export default function ProtectedRoute() {
  const location = useLocation();
  const signedIn = !!localStorage.getItem("access_token");

  return signedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
