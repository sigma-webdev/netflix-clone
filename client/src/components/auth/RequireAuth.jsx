import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { isLoggedIn, userDetails } = useSelector((state) => state.auth);
  console.log(isLoggedIn, userDetails);
  const plan = userDetails?.plan;
  const role = userDetails?.role;
  return isLoggedIn && role?.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to={"/denied"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/signin"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
