import React from "react";
import { HiHome, HiUserGroup, HiServer } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import netflixLogo from "../../assets/netflix_logo.png";

const AdminNav = () => {
  return (
    <div className="h-screen w-2/12 border-r bg-white py-2 text-black ">
      {/* adding the netlfix logo */}
      <div className="flex w-full flex-wrap items-end ">
        <Link to={"/browse"}>
          <img className="mx-auto my-5 w-[60%]" src={netflixLogo} alt="" />
        </Link>
      </div>
      <ul>
        <NavLink to="/admin/dashboard">
          {({ isActive }) => (
            <li
              className={
                isActive
                  ? " flex cursor-pointer items-center border-white bg-[#E50914] px-2 py-4 font-bold  text-white"
                  : " flex cursor-pointer items-center px-2 py-4 hover:bg-[#e509143b]"
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
                  ? " flex cursor-pointer items-center border-white bg-[#E50914] px-2 py-4 font-bold  text-white"
                  : " flex cursor-pointer items-center px-2 py-4 hover:bg-[#e509143b]"
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
                  ? "flex cursor-pointer items-center border-white bg-[#E50914] px-2 py-4 font-bold  text-white"
                  : " flex cursor-pointer items-center px-2 py-4 hover:bg-[#e509143b]"
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
