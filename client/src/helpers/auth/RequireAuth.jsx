import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { GET_USER } from "../../store/authSlice";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dispatch(GET_USER());
  }, []);

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
