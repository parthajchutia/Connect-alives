import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ user, isPublic = false, redirect = "/" }) => {
  if (isPublic) {
    // Public route - redirect if user exists
    return user ? <Navigate to={redirect} replace /> : <Outlet />;
  }
  
  // Protected route - redirect if no user
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectRoute;