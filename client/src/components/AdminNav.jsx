import React from "react";
import { HiHome, HiUserGroup, HiServer } from "react-icons/hi";
const AdminNav = () => {
  return (
    <div className="p-2 w-2/12 h-screen bg-slate-900 text-white border-r ">
      <h3 className="mb-12">Netflix Admin</h3>
      <ul>
        <li className="flex items-center mb-4 border-white py-2 px-1 rounded cursor-pointer">
          <HiHome />
          <p className="ml-2">Dashboard</p>
        </li>
        <li className="flex items-center mb-4 border border-white py-2 px-1 rounded cursor-pointer">
          <HiUserGroup />
          <p className="ml-2">Manage Users</p>
        </li>
        <li className="flex items-center mb-4  border-white py-2 px-1 rounded cursor-pointer">
          <HiServer />
          <p className="ml-2">Manage Contents</p>
        </li>
      </ul>
    </div>
  );
};

export default AdminNav;
