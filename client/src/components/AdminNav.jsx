import React from "react";
import { HiHome, HiUserGroup, HiServer } from "react-icons/hi";
const AdminNav = () => {
  return (
    <div className="p-2 w-2/12 h-screen bg-slate-800 text-white">
      <h3 className="mb-12">Netflix</h3>
      <ul>
        <li className="flex items-center mb-4 border border-white py-2 px-1 rounded">
          <HiHome />
          <p className="ml-2">Dashboard</p>
        </li>
        <li className="flex items-center mb-4 border border-white py-2 px-1 rounded">
          <HiUserGroup />
          <p className="ml-2">Manage Users</p>
        </li>
        <li className="flex items-center mb-4 border border-white py-2 px-1 rounded">
          <HiServer />
          <p className="ml-2">Manage Contents</p>
        </li>
      </ul>
    </div>
  );
};

export default AdminNav;
