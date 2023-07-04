import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { isLoggedIn, userData } = useSelector((state) => state.auth);
  const plan = userData?.plan;
  const role = userData?.role;
  return isLoggedIn &&
    (role === "USER" || role === "ADMIN") &&
    allowedRoles.includes(role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to={"/denied"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/signin"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
