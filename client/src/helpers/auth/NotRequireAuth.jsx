import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const NotRequireAuth = () => {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!location.pathname.includes("/signin")) {
      localStorage.setItem("lastLocation", location.pathname);
    }
  }, [location.pathname]);
  const lastLocation = localStorage.getItem("lastLocation");
  // localStorage.removeItem("lastLocation");

  return isLoggedIn ? (
    <Navigate to={lastLocation || "/browse"} replace />
  ) : (
    <Outlet />
  );
};

export default NotRequireAuth;
