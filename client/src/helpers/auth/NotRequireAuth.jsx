import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const NotRequireAuth = () => {
  const location = useLocation();
  useEffect(() => {
    if (!location.pathname.includes("/signin")) {
      localStorage.setItem("lastLocation", location.pathname);
    }
  }, [location]);
  const lastLocation = localStorage.getItem("lastLocation");
  // localStorage.removeItem("lastLocation");

  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? (
    <Navigate to={lastLocation || "/browse"} replace />
  ) : (
    <Outlet />
  );
};

export default NotRequireAuth;
