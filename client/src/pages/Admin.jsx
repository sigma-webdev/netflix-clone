import React from 'react'
import AdminNav from '../components/AdminNav'
import AdminManageUsers from '../components/AdminManageUsers'
// import AdminDashboard from '../components/AdminDashboard'

const Admin = () => {
  return (
    <div className='flex flex-wrap'>
        <AdminNav />
        <AdminManageUsers />
        {/* <AdminDashboard /> */}
    </div>
  )
}

export default Admin