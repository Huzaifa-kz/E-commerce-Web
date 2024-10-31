import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Get the token from local storage
  const location = useLocation(); // Get the current location

  if (!token) {
    // If there is no token, redirect to the login page
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If authenticated, render the children components (protected routes)
  return children;
};

export default PrivateRoute;
