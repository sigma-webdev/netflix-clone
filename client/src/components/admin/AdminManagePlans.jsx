import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../store/adminPlansSlice";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const AdminManagePlans = () => {
  const dispatch = useDispatch();
  const allPlans = useSelector((state) => state.plans.allPlans);
  console.log(allPlans?.data, "ff ");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllPlans());
    console.log("in");
  }, [dispatch]);

  const toggleModal = (val) => {
    setIsOpen(val);
  };
  return (
    <>
      {isOpen && (
        <div className="absolute flex h-full w-full items-center justify-center bg-gray-600 bg-opacity-5">
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
                  {/* {getUser?.data?.email?.split("@")[0]} */}
                </p>
              </div>
              <div className="flex items-center gap-x-2 border-y-2 py-2 ">
                <span>Plan : </span>
                {/* <p className="font-semibold">{getUser?.data?.plan}</p> */}
              </div>
              <div className="flex items-center gap-x-2 border-y-2 py-2 ">
                <span>Subscription Status : </span>
                <p className="font-semibold">
                  {/* {getUser?.data?.subscription?.status} */}
                </p>
              </div>
              <div className="flex items-center gap-x-2 border-y-2 py-2 ">
                <span>SignUp Date : </span>
                <p className="font-semibold">
                  {/* {getUser?.data?.createdAt?.split("T")[0]} */}
                </p>
              </div>
              <button
                onClick={() => {
                  toggleModal(false);
                }}
                className="rounded bg-red-600 py-2 text-white hover:bg-red-700"
              >
                Add Plan
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-10/12 py-5 ">
        <div className="mx-auto flex w-10/12 justify-between">
          <h3 className="rounded-t-md bg-red-600 px-3 text-white">
            Manage Plans
          </h3>
          <button
            onClick={() => {
              toggleModal(true);
            }}
            className="rounded-xl border-b bg-red-600 px-4 py-2 text-white"
          >
            Add Plan
          </button>
        </div>
        <table className="mx-auto w-5/6 text-gray-200">
          <thead>
            <tr className="bg-red-600  text-white">
              <th className="px-4 py-2">Sr. No.</th>
              <th className="px-4 py-2">Plan Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {allPlans?.data?.length > 0 &&
              allPlans?.data?.map((plan, index) => {
                return (
                  <tr
                    key={plan._id}
                    className={
                      (index + 1) % 2 === 0 ? "bg-[#342e2b]" : "bg-[#2e2f3a]"
                    }
                  >
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{plan.planName}</td>
                    <td className="px-10 py-2 text-start">
                      {plan.description}
                    </td>
                    <td className="flex flex-col items-center p-2 ">
                      <ToggleSwitch />
                      {plan.active ? (
                        <span>Enabled</span>
                      ) : (
                        <span>Disabled</span>
                      )}
                    </td>
                    <td className="p-2 text-center">
                      <button className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-500">
                        Delete
                      </button>
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

export default AdminManagePlans;
