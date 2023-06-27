import React from "react";
import { HiHome, HiUserGroup, HiServer } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import netflixLogo from "../../assets/netflix_logo.png";

const AdminNav = () => {
  return (
    <div className="p-2 w-2/12 h-screen bg-white text-black border-r ">
      <div className="w-full flex flex-wrap items-end ">
        <img className="w-[60%] mx-auto my-5" src={netflixLogo} alt="" />
      </div>
      <ul>
        <NavLink to="/admin/dashboard">
          {({ isActive }) => (
            <li
              className={
                isActive
                  ? "bg-[#E50914] text-white flex items-center mb-4 font-bold border-white py-2 px-2  cursor-pointer"
                  : "flex items-center mb-4 py-2 px-2 hover:bg-[#e509143b] cursor-pointer"
              }
            >
              <HiHome />
              <p className="ml-2">Dashboard</p>
            </li>
          )}
        </NavLink>
        <NavLink to="/admin/manageusers">
          {({ isActive }) => (
            <li
              className={
                isActive
                  ? "bg-[#E50914] text-white flex items-center mb-4 font-bold border-white py-2 px-2  cursor-pointer"
                  : "flex items-center mb-4 py-2 px-2 hover:bg-[#e509143b] cursor-pointer"
              }
            >
              <HiUserGroup />
              <p className="ml-2">Manage Users</p>
            </li>
          )}
        </NavLink>
        <NavLink to="/admin/managecontents">
          {({ isActive }) => (
            <li
              className={
                isActive
                  ? "bg-[#E50914] text-white flex items-center mb-4 font-bold border-white py-2 px-2  cursor-pointer"
                  : "flex items-center mb-4 py-2 px-2 hover:bg-[#e509143b] cursor-pointer"
              }
            >
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
