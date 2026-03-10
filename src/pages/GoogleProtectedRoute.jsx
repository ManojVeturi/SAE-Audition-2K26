import React from "react";
import { Navigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const GoogleProtectedRoute = ({ children }) => {
  const { user } = React.useContext(UserDataContext);
  const emailFromLS = localStorage.getItem("email");

  // Allow access only if user is set in context OR email exists in localStorage
  if (!user?.email && !emailFromLS) {
    return <Navigate to="/googleAuth" replace />;
  }

  return children;
};

export default GoogleProtectedRoute;