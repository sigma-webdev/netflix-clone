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
        <div className="absolute flex h-full w-full items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="relative w-96 rounded-lg bg-cyan-600 px-4 py-12">
            <div
              onClick={() => toggleModal(false)}
              className="absolute right-3 top-2 cursor-pointer text-3xl text-white"
            >
              X
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2 text-white"
            >
              <label htmlFor="name">Name:</label>
              <input
                className="rounded border bg-transparent p-2"
                type="text"
                name="name"
                id="name"
                value="Nasikh CL"
              />
              <label htmlFor="name">Email:</label>
              <input
                className="rounded border bg-transparent p-2"
                type="email"
                name="email"
                id="email"
                value="nasikh@ineuron.ai"
              />
              <label htmlFor="name">Phone:</label>
              <input
                className="rounded border bg-transparent p-2"
                type="tel"
                name="phone"
                id="phone"
                value="9988998781"
              />
              <label htmlFor="name"> Plan:</label>
              <input
                className="rounded border bg-transparent p-2"
                type="text"
                name="plan"
                id="plan"
                value="NONE"
              />
              <button className="rounded bg-red-600 py-2 text-white hover:bg-red-700">
                Block User
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="flex max-h-[100vh] w-10/12 flex-col items-center gap-5 overflow-y-scroll bg-slate-800 py-4">
        <h2 className="text-white">Manage Users</h2>
        <table className="w-5/6 table-auto overflow-scroll border border-gray-300 text-gray-200">
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
                      <div
                        onClick={toggleModal}
                        className="cursor-pointer rounded bg-[#E50914] py-2 text-center font-bold text-white hover:bg-[#d4252e]"
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
