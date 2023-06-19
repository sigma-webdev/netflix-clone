import React, { useState } from 'react'

const AdminManageUsers = () => {

  const usersDetails = [
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

  const [isOpen, setIsOpen] = useState(false);


  const toggleModal = (val) => {
    setIsOpen(val)
  }


  return (
    <>
      {
        isOpen &&
        <div className='absolute w-full h-full bg-gray-600 bg-opacity-50 flex items-center justify-center'>
          <div className='relative w-96 bg-cyan-600 rounded-lg py-12 px-4'>
            <div onClick={() => toggleModal(false)} className='absolute top-2 right-3 text-white text-3xl cursor-pointer'>X</div>
          <form onSubmit={(e)=> e.preventDefault()} className='flex flex-col gap-2 text-white'>
            <label htmlFor="name">Name:</label>
            <input className='bg-transparent border p-2 rounded' type="text" name="name" id="name" value="Nasikh CL"/>
            <label htmlFor="name">Email:</label>
            <input className='bg-transparent border p-2 rounded' type="email" name="email" id="email" value="nasikh@ineuron.ai"/>
            <label htmlFor="name">Phone:</label>
            <input className='bg-transparent border p-2 rounded' type="tel" name="phone" id="phone" value="9988998781"/>
            <label htmlFor="name">  Plan:</label>
            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value="NONE"/>
            <button className='bg-red-600 hover:bg-red-700 text-white rounded py-2'>Block User</button>

          </form>
          </div>
        </div>
      }
      <div className='w-10/12 flex flex-col gap-5 items-center py-4 bg-slate-800 overflow-y-scroll max-h-[100vh]'>
        <h2 className='text-white'>Manage Users</h2>
        <table className="table-auto w-5/6 overflow-scroll text-gray-200 border border-gray-300">
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
                      <div onClick={toggleModal} className='py-2 text-center bg-[#E50914] hover:bg-[#d4252e] text-white font-bold rounded cursor-pointer' >
                        View
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>

  )
}

export default AdminManageUsers