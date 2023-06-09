import React from 'react'
import AdminNav from '../components/AdminNav'
import AdminManageUsers from '../components/AdminManageUsers'
// import AdminDashboard from '../components/AdminDashboard'
import { Routes, Route } from "react-router-dom";
import AdminManageContents from '../components/AdminManageContents';
const Admin = () => {
  return (
    <div className='flex flex-wrap'>
      <AdminNav />
      <Routes>
        <Route path="/manageusers" element={<AdminManageUsers />} />
        <Route path="/managecontents" element={<AdminManageContents />} />
      </Routes>


    </div>
  )
}

export default Admin