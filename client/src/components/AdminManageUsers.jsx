import React from 'react'

const AdminManageUsers = () => {
    const usersDetails =[
        {
            name: "nasikh cl",
            email: "nasikcl@gmail.com",
            phoneNumber: "9988776655"
        },
        {
            name: "mang",
            email: "nasikcl@gmail.com",
            phoneNumber: "9988776655"
        },
        {
            name: "subham",
            email: "nasikcl@gmail.com",
            phoneNumber: "9988776655"
        },
        {
            name: "nasikh cl",
            email: "nasikcl@gmail.com",
            phoneNumber: "9988776655"
        },
        {
            name: "mang",
            email: "nasikcl@gmail.com",
            phoneNumber: "9988776655"
        },
        {
            name: "subham",
            email: "nasikcl@gmail.com",
            phoneNumber: "9988776655"
        },
        
    ]
  return (
    <div className='w-10/12 flex items-center justify-center bg-slate-800'>
    <div></div> 
    <table className="table-auto w-5/6 text-gray-200 border border-gray-300">
      <thead className="text-left">
        <tr>
          <th className="px-4 py-2">S. No</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Number</th>
          <th className="px-4 py-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody className=" border-opacity-0">
        {usersDetails.length > 0 &&
          usersDetails.map((user, index) => {
            return (
              <tr
                key={index}
                className={
                  (index + 1) % 2 === 0 ? "bg-[#2b2c34]" : "bg-[#2e2f3a]"
                }
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phoneNumber}</td>
                <td className="px-4 py-2">
                   <div className='py-2 text-center bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded cursor-pointer' >
                    View
                   </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
    </div>

  )
}

export default AdminManageUsers