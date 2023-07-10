import React, { useEffect } from "react";
import AdminNav from "../components/admin/AdminNav";
import { Outlet, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  // sending the user to admin dashboard once he visit admin
  useEffect(() => {
    navigate("/admin/dashboard");
  }, []);

  return (
    <div className="flex  ">
      <AdminNav />
      <Outlet />
    </div>
  );
};

export default Admin;
