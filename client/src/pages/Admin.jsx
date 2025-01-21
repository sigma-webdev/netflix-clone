import React, { useEffect } from "react";
import AdminNav from "../components/admin/AdminNav";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="flex">
      <AdminNav />
      <Outlet />
    </div>
  );
};

export default Admin;
