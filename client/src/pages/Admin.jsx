import React from "react";
import AdminNav from "../components/admin/AdminNav";
import { Outlet } from "react-router-dom";


const Admin = () => {
  return (
    <div className="flex flex-wrap">
      <AdminNav />
      <Outlet/>
    </div>
  );
};

export default Admin;
