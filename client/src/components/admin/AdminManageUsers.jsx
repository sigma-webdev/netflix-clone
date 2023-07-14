import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUserById } from "../../store/userSlice";
import { HiSearch } from "react-icons/hi";
import TableLoading from "../loader/TableLoader";

const AdminManageUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  const loading = useSelector((state) => state.user.loading);
  const getUser = useSelector((state) => state.user.userById);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getAllUsers({ pageNo: page }));
  }, [page]);

  const toggleModal = (val) => {
    setIsOpen(val);
  };

  const prevPage = () => {
    if (allUsers?.data?.previous === undefined) {
      return;
    } else {
      setPage((pre) => pre - 1);
    }
  };

  const nextPage = () => {
    if (allUsers?.data?.next === undefined) {
      return;
    } else {
      setPage((next) => next + 1);
    }
  };

  const getSearch = (e) => {
    e.preventDefault();
    dispatch(getAllUsers({ pageNo: page, searchValue: searchText }));
    setSearchText("");
  };

  const userById = (id) => {
    toggleModal(true);
    dispatch(getUserById(id));
  };

  return (
    <>
      {isOpen && (
        <div className="absolute z-20 flex h-full w-full items-center justify-center bg-gray-600 bg-opacity-5">
          <div className="relative w-96 rounded-lg bg-white px-4 py-12">
            <div
              onClick={() => toggleModal(false)}
              className="absolute right-3 top-2 cursor-pointer text-3xl text-black"
            >
              &times;
            </div>
            <div className="flex flex-col gap-2 text-black">
              <div className="flex items-center gap-x-2 border-y-2 py-2 ">
                <span>Name : </span>
                <p className="font-semibold">
                  {getUser?.data?.email?.split("@")[0]}
                </p>
              </div>
              <div className="flex items-center gap-x-2 border-y-2 py-2 ">
                <span>Plan : </span>
                <p className="font-semibold">{getUser?.data?.plan}</p>
              </div>
              <div className="flex items-center gap-x-2 border-y-2 py-2 ">
                <span>Subscription Status : </span>
                <p className="font-semibold">
                  {getUser?.data?.subscription?.status}
                </p>
              </div>
              <div className="flex items-center gap-x-2 border-y-2 py-2 ">
                <span>SignUp Date : </span>
                <p className="font-semibold">
                  {getUser?.data?.createdAt?.split("T")[0]}
                </p>
              </div>
              <button
                onClick={() => {
                  toggleModal(false);
                }}
                className="rounded bg-red-600 py-2 text-white hover:bg-red-700"
              >
                Action
              </button>
            </div>
          </div>
        </div>
      )}
      <div className=" max-h-screen w-10/12 overflow-y-scroll bg-slate-100 py-10">
        <div className="mx-auto flex w-5/6 justify-between">
          <h3 className="rounded-t-md bg-red-600 px-3 text-white">
            Manage Users
          </h3>
          <div className="flex w-1/3 items-center justify-between border-2 border-red-600 bg-white ">
            <form onSubmit={getSearch} className="w-full">
              <input
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                value={searchText}
                type="text"
                placeholder="Search user"
                className=" w-full px-2 outline-none"
              />
            </form>
            <HiSearch className="text-4xl" />
          </div>
        </div>
        <table className="mx-auto w-5/6 table-auto overflow-scroll  text-gray-200">
          <thead className="text-left">
            <tr className="bg-red-600 text-white">
              <th className="px-4 py-2">Sr. No.</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className=" border-opacity-0">
            {loading ? (
              <TableLoading colLength={4} />
            ) : (
              allUsers?.data?.users?.length > 0 &&
              allUsers?.data?.users?.map((user, index) => {
                return (
                  <tr
                    key={user._id}
                    className={
                      (index + 1) % 2 === 0 ? "bg-[#342e2b]" : "bg-[#2e2f3a]"
                    }
                  >
                    <td className="px-4 py-3">{(page - 1) * 10 + index + 1}</td>
                    <td className="px-4 py-3">{user?.email?.split("@")[0]}</td>
                    <td className="px-4 py-3">{user?.email}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => {
                          userById(user._id);
                        }}
                        className=" rounded bg-red-600 px-16 py-2 text-center font-bold text-white hover:bg-red-500"
                      >
                        View User
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <div className="mx-auto my-5 flex w-10/12 justify-between">
          <button
            className={
              allUsers?.data?.previous === undefined
                ? "cursor-not-allowed  bg-red-300  px-2 py-1 text-white"
                : "bg-red-600 px-2 py-1  text-white hover:bg-red-500"
            }
            onClick={prevPage}
          >
            Previous Page
          </button>
          <div className=" rounded-full border-2 border-red-400 px-[10px] text-xl font-bold text-red-600 ">
            Page {page} of {allUsers?.data?.totalPages}
          </div>
          <button
            onClick={nextPage}
            className={
              allUsers?.data?.next === undefined
                ? "cursor-not-allowed  bg-red-300  px-2 py-1 text-white"
                : "bg-red-600 px-4 py-1  text-white hover:bg-red-500"
            }
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminManageUsers;
