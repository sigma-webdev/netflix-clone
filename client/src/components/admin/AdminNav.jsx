import React from "react";
import { HiHome, HiUserGroup, HiServer } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import netflixLogo from "../../assets/netflix_logo.png";

const AdminNav = () => {
  return (
    <div className="h-screen w-2/12 border-r bg-black p-2 text-white ">
      <div className="mb-12 flex w-full flex-wrap items-end">
        <img className="w-[60%]" src={netflixLogo} alt="" />
        <h4 className=""> Admin</h4>
      </div>
      <ul>
        <NavLink to="/admin/dashboard">
          {({ isActive }) => (
            <li
              className={
                isActive
                  ? "mb-4 flex cursor-pointer items-center border-white bg-[#E50914] px-2 py-2  font-bold"
                  : "mb-4 flex cursor-pointer items-center px-2 py-2 hover:bg-[#e509143b]"
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
                  ? "mb-4 flex cursor-pointer items-center border-white bg-[#E50914] px-2 py-2  font-bold"
                  : "mb-4 flex cursor-pointer items-center px-2 py-2 hover:bg-[#e509143b]"
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
                  ? "mb-4 flex cursor-pointer items-center border-white bg-[#E50914] px-2 py-2  font-bold"
                  : "mb-4 flex cursor-pointer items-center px-2 py-2 hover:bg-[#e509143b]"
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
