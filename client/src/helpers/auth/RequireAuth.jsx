import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const plan = userData?.plan;
  const role = userData?.role;

  useEffect(() => {
    if (!location.pathname.includes("/signin")) {
      localStorage.setItem("lastLocation", location.pathname);
    }
  }, [location]);
  const lastLocation = localStorage.getItem("lastLocation");
  // localStorage.removeItem("lastLocation");

  return isLoggedIn &&
    (role === "USER" || role === "ADMIN") &&
    allowedRoles.includes(role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate
      to={"/denied"}
      state={{ from: lastLocation || location }}
      replace
    />
  ) : (
    <Navigate
      to={"/signin"}
      state={{ from: lastLocation || location }}
      replace
    />
  );
};

export default RequireAuth;
