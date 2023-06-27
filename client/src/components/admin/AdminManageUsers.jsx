import React, { useState } from "react";

const AdminManageUsers = () => {
  const usersDetails = [
    {
      name: "nasikh cl",
      email: "nasikcl@gmail.com",
      phoneNumber: "9988776655",
    },
    {
      name: "mang",
      email: "nasikcl@gmail.com",
      phoneNumber: "9988776655",
    },
    {
      name: "subham",
      email: "nasikcl@gmail.com",
      phoneNumber: "9988776655",
    },
    {
      name: "nasikh cl",
      email: "nasikcl@gmail.com",
      phoneNumber: "9988776655",
    },
    {
      name: "mang",
      email: "nasikcl@gmail.com",
      phoneNumber: "9988776655",
    },
    {
      name: "subham",
      email: "nasikcl@gmail.com",
      phoneNumber: "9988776655",
    },
    {
      name: "nasikh cl",
      email: "nasikcl@gmail.com",
      phoneNumber: "9988776655",
    },
    {
      name: "mang",
      email: "nasikcl@gmail.com",
      phoneNumber: "9988776655",
    },
    {
      name: "subham",
      email: "nasikcl@gmail.com",
      phoneNumber: "9988776655",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (val) => {
    setIsOpen(val);
  };

  return (
    <>
      {isOpen && (
        <div className="absolute w-full h-full bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="relative w-96 bg-white rounded-lg py-12 px-4">
            <div
              onClick={() => toggleModal(false)}
              className="absolute top-2 right-3 text-black text-3xl cursor-pointer"
            >
              &times;
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2 text-black"
            >
              <div className="flex gap-x-2 items-center border-y-2 py-2 ">
                <span>Name :</span>
                <p className="font-semibold">Nasikh CL</p>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white rounded py-2">
                Block User
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="w-10/12 flex flex-col gap-5 items-center py-4 bg-slate-100 overflow-y-scroll max-h-[100vh]">
        <h2 className="text-[#E50914]">Manage Users</h2>
        <table className="table-auto w-5/6 overflow-scroll text-gray-200 border border-gray-300">
          <thead className="text-left">
            <tr className="text-white bg-[#E50914]">
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
                      (index + 1) % 2 === 0 ? "bg-[#342e2b]" : "bg-[#2e2f3a]"
                    }
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.phoneNumber}</td>
                    <td className="px-4 py-2">
                      <div
                        onClick={toggleModal}
                        className="py-2 text-center bg-[#E50914] hover:bg-[#d4252e] text-white font-bold rounded cursor-pointer"
                      >
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
  );
};

export default AdminManageUsers;
