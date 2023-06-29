import React from "react";
import AdminNav from "../components/admin/AdminNav";
import AdminManageUsers from "../components/admin/AdminManageUsers";
// import AdminDashboard from '../components/AdminDashboard'
import { Routes, Route } from "react-router-dom";
import AdminManageContents from "../components/admin/AdminManageContents";
import AdminContentView from "../components/admin/AdminContentView";
const Admin = () => {
  return (
    <div className="flex flex-wrap">
      <AdminNav />
      <Routes>
        <Route path="manageusers/" element={<AdminManageUsers />} />
        <Route path="managecontents/" element={<AdminManageContents />} />
        <Route path="managecontents/:id" element={<AdminContentView />} />
      </Routes>
    </div>
  );
};

export default Admin;
