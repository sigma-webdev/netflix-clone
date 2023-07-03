import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/userSlice";
import { HiSearch } from "react-icons/hi";

const AdminManageUsers = () => {



  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1) 
  const [searchText, setSearchText] = useState("")
  
  useEffect(() => {
    dispatch(getAllUsers({pageNo:page}));
  }, [page]);

  

  const toggleModal = (val) => { 
    setIsOpen(val);
  };



  const prevPage = () =>{
    if(allUsers?.data?.previous === undefined){
      return;
    
    }else {
      setPage((pre)=>pre-1)
 
    }
  }
  
  const nextPage = () => {
    if(allUsers?.data?.next === undefined){
      return
    }else{
      setPage((next)=>(next+1))

    }

  }

  const getSearch = (e) => {
     e.preventDefault()
    dispatch(getAllUsers({pageNo:page, searchValue:searchText}));
    setSearchText("")

  }
 

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
      <div className=" max-h-screen w-10/12 overflow-y-scroll bg-slate-100 py-10">
        <div className="flex justify-between w-5/6 mx-auto">
        <h3 className="text-white bg-[#E50914] px-3 rounded-t-md">Manage Users</h3>
        <div className="flex justify-between border-2 border-[#E50914] items-center w-1/3 bg-white ">
          <form onSubmit={getSearch} className="w-full">
          <input onChange={(e)=>{setSearchText(e.target.value)}} value={searchText} type="text" placeholder="Search here" className=" px-2 outline-none w-full" />
          </form>
          <HiSearch className="text-4xl"/>
        </div>
        </div>
        <table className="mx-auto w-5/6 table-auto overflow-scroll  text-gray-200">
          <thead className="text-left">
            <tr className="bg-[#E50914] text-white">
              <th className="px-4 py-2">S. No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
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
                    <td className="px-4 py-3">{(page -1 )*10 +index + 1}</td>
                    <td className="px-4 py-3">{user?.email?.split("@")[0]}</td>
                    <td className="px-4 py-3">{user?.email}</td>
                    <td className="px-4 py-2">
                      <div
                        onClick={toggleModal}
                        className=" rounded bg-[#E50914] py-2 text-center font-bold text-white hover:bg-[#d4252e]"
                      >
                        View
                      </div>
                    </td>
                  </tr>
                );
              })} 
          </tbody>
        </table>
        <div className="flex justify-between w-10/12 my-5 mx-auto">
                <button className={allUsers?.data?.previous === undefined ? "bg-[#e5091451]  text-white  py-1 px-2 cursor-not-allowed":"bg-[#E50914] hover:bg-[#d4252e] text-white  py-1 px-2"} onClick={prevPage}>Previous Page</button>
                <div className=" px-[10px] border-2 border-[#e509144d] text-[#E50914] text-xl font-bold rounded-full ">
                 {page}
                </div>
                <button onClick={nextPage} className={allUsers?.data?.next === undefined? "bg-[#e5091451]  text-white  py-1 px-2 cursor-not-allowed":"bg-[#E50914] hover:bg-[#d4252e] text-white  py-1 px-4"}>Next Page</button>
              </div>
      </div>
    </>
  );
};

export default AdminManageUsers;


