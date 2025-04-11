import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const guestToken = localStorage.getItem("guest_token");
  const guestExpiry = localStorage.getItem("guest_expiry");

  // If guest token exists, check for expiration
  if (guestToken && guestExpiry) {
    const now = Date.now();
    if (now > parseInt(guestExpiry)) {
      localStorage.removeItem("guest_token");
      localStorage.removeItem("guest_expiry");
      return <Navigate to="/login" replace />;
    }
    return children; // guest session valid
  }

  // If logged in user token exists
  if (token) {
    return children;
  }

  // Not logged in or guest session expired
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
