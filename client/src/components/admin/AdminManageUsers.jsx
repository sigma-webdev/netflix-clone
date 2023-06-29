import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/userSlice";

const AdminManageUsers = () => {
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.user.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (val) => {
    setIsOpen(val);
  };

  return (
    <>
      {isOpen && (
        <div className="absolute flex h-full w-full items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="relative w-96 rounded-lg bg-white px-4 py-12">
            <div
              onClick={() => toggleModal(false)}
              className="absolute right-3 top-2 cursor-pointer text-3xl text-black"
            >
              &times;
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2 text-black"
            >
              <div className="flex items-center gap-x-2 border-y-2 py-2 ">
                <span>Name :</span>
                <p className="font-semibold">Nasikh CL</p>
              </div>
              <button className="rounded bg-red-600 py-2 text-white hover:bg-red-700">
                Block User
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="flex max-h-[100vh] w-10/12 flex-col items-center gap-5 overflow-y-scroll bg-slate-100 py-4">
        <h2 className="text-[#E50914]">Manage Users</h2>
        <table className="w-5/6 table-auto overflow-scroll border border-gray-300 text-gray-200">
          <thead className="text-left">
            <tr className="bg-[#E50914] text-white">
              <th className="px-4 py-2">S. No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              {/* <th className="px-4 py-2">Number</th> */}
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className=" border-opacity-0  ">
            {allUsers.length > 0 &&
              allUsers.map((user, index) => {
                return (
                  <tr
                    key={user._id}
                    className={
                      (index + 1) % 2 === 0 ? "bg-[#342e2b]" : "bg-[#2e2f3a]"
                    }
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{user.email.split("@")[0]}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    {/* <td className="px-4 py-3">{user.phoneNumber}</td> */}
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
