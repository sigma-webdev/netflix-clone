import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/userSlice";

const AdminManageUsers = () => {



  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);

  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1) 
  const limit = 10
  
  useEffect(() => {
    console.log("Dd");
    dispatch(getAllUsers(page));
  }, [page]);

  

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
      <div className=" max-h-screen w-10/12 overflow-y-scroll bg-slate-100 py-4">
        <h2 className="text-[#E50914]">Manage Users</h2>
        <table className="mx-auto w-5/6 table-auto overflow-scroll  text-gray-200">
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
            {allUsers?.data?.users?.length > 0 &&
              allUsers?.data?.users?.map((user, index) => {
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
        <div className="flex justify-between w-10/12 my-2 mx-auto">
                <div className="bg-[#E50914] hover:bg-[#d4252e] text-white  py-1 px-2" onClick={()=>setPage((pre)=>pre-1)}>Previous</div>
                <div className=" px-[10px ] border-2 border-[#E50914] text-[#E50914] text-xl font-bold rounded-full ">
                  1
                </div>
                <button onClick={()=>{
                  console.log("object");
                  setPage((pre)=>pre+1)}} className="bg-[#E50914] hover:bg-[#d4252e] text-white  py-1 px-4">Next</button>
              </div>
      </div>
    </>
  );
};

export default AdminManageUsers;
