import React from "react";
import { HiHome, HiUserGroup, HiServer } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className="p-2 w-2/12 h-screen bg-slate-900 text-white border-r ">
      <h3 className="mb-12">Netflix Admin</h3>
      <ul>
        <NavLink to="/admin/dashboard">
          {({ isActive, isPending }) => (
            <li className={isActive ? "border flex items-center mb-4  border-white py-2 px-1 rounded cursor-pointer" : "flex items-center mb-4  border-white py-2 px-1 rounded cursor-pointer"}>
              <HiHome />
              <p className="ml-2">Dashboard</p>
            </li>
          )}
        </NavLink>
        <NavLink to="/admin/manageusers">
          {({ isActive, isPending }) => (
            <li className={isActive ? "border flex items-center mb-4  border-white py-2 px-1 rounded cursor-pointer" : "flex items-center mb-4  border-white py-2 px-1 rounded cursor-pointer"}>
              <HiUserGroup />
              <p className="ml-2">Manage Users</p>
            </li>
          )}
        </NavLink>
        <NavLink to="/admin/managecontents">
          {({ isActive, isPending }) => (
            <li className={isActive ? "border flex items-center mb-4  border-white py-2 px-1 rounded cursor-pointer" : "flex items-center mb-4  border-white py-2 px-1 rounded cursor-pointer"}>
              <HiServer />
              <p className="ml-2">Manage Contents</p>
            </li>
          )}
        </NavLink>


      </ul>
    </div>
  );
};

export default AdminNav;
