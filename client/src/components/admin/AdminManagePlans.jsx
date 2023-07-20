import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlan,
  deletePlan,
  getAllPlans,
  updatePlanStatus,
} from "../../store/adminPlansSlice";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import TableLoading from "../loader/TableLoader";
import Dialog from "../dialogbox/Dialog";

const AdminManagePlans = () => {
  const dispatch = useDispatch();
  const allPlans = useSelector((state) => state.plans.allPlans);
  const updateLoader = useSelector((state) => state.plans.updateLoader);
  const loading = useSelector((state) => state.plans.loading);

  const initialFormState = {
    values: {
      planName: "",
      description: "",
      amount: "",
      active: false,
    },
    errors: {
      planName: "",
      description: "",
      amount: "",
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(initialFormState);

  const { values, errors } = formState;

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const toggleModal = (val) => {
    setIsOpen(val);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormState((prevFormState) => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [name]: inputValue,
      },
    }));
  };

  // form validation for new plan
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...formState.errors };

    // perform validation for each form field
    if (values.planName.trim() === "") {
      newErrors.planName = "Plan Name is required";
      isValid = false;
    } else if (values.planName.length > 14) {
      newErrors.planName = "planName must be less than 14 characters";
      isValid = false;
    } else {
      newErrors.planName = "";
    }

    if (values.description.trim() === "") {
      newErrors.description = "Descrioption is required";
      isValid = false;
    } else {
      newErrors.description = "";
    }

    if (values.amount.trim() === "") {
      newErrors.amount = "Plan Price is required";
      isValid = false;
    } else if (values.amount <= 0) {
      newErrors.amount = "Plan Price must be greater than zero";
      isValid = false;
    } else {
      newErrors.amount = "";
    }
    setFormState((prevFormState) => ({
      ...prevFormState,
      errors: newErrors,
    }));

    return isValid;
  };

  //  to add new plan
  const handleAddPlan = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(createPlan(formState.values));
      toggleModal(false);
      setFormState((prevFormState) => ({
        ...prevFormState,
        values: {
          planName: "",
          description: "",
          amount: "",
          active: false,
        },
      }));
    }
  };

  // to enable/disable plan status
  const handleToggleStatus = (planId, event, index) => {
    const active = event.target.checked;
    dispatch(updatePlanStatus({ id: planId, active: active, index: index }));
  };

  const handleDeletePlan = (id, index) => {
    dispatch(deletePlan({ id, index }));
  };

  return (
    <>
      <Dialog
        title="Add Plan"
        isOpen={isOpen}
        closeModal={() => {
          toggleModal(false);
          setFormState(initialFormState);
        }}
      >
        <form onSubmit={handleAddPlan} className=" space-y-4 text-black">
          <div>
            <label htmlFor="">
              Plan Name<span className="text-red-600">*</span> :
            </label>
            <input
              className="w-full border px-2 py-2 outline-none"
              type="text"
              id="planName"
              name="planName"
              value={values.planName}
              onChange={handleInputChange}
            />
            <div>
              {errors.planName && (
                <span className="text-red-600">{errors.planName}</span>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="">
              Description<span className="text-red-600">*</span> :
            </label>
            <input
              className="w-full border px-2 py-2 outline-none"
              type="text"
              id="description"
              name="description"
              value={values.description}
              onChange={handleInputChange}
            />
            <div>
              {errors.description && (
                <span className="text-red-600">{errors.description}</span>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="">
              Plan Price<span className="text-red-600">*</span> :
            </label>
            <input
              className="w-full border px-2 py-2 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              id="amount"
              name="amount"
              value={values.amount}
              onChange={handleInputChange}
            />
            <div>
              {errors.amount && (
                <span className="text-red-600">{errors.amount}</span>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label htmlFor="">Active Status :</label>
            <ToggleSwitch
              id="active"
              name="active"
              isOn={values.active}
              onToggle={() =>
                setFormState((prevFormData) => ({
                  ...prevFormData,
                  values: { active: !prevFormData.active },
                }))
              }
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-red-600 py-2 text-white hover:bg-red-700"
            disabled={loading ? true : false}
          >
            Add Plan
          </button>
        </form>
      </Dialog>
      <div className="w-10/12 py-5 ">
        <div className="mx-auto flex w-10/12 justify-between">
          <h3 className="rounded-t-md bg-red-600 px-3 text-white">
            Manage Plans
          </h3>
          <button
            onClick={() => {
              toggleModal(true);
            }}
            disabled={loading ? true : false}
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
              <th className="px-4 py-2">Plan Price</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableLoading colLength={6} />
            ) : allPlans?.length === 0 ? (
              <tr>
                <td className="px-2 py-6 text-center text-red-500" colSpan={5}>
                  No Plans Found
                </td>
              </tr>
            ) : (
              allPlans?.length > 0 &&
              allPlans?.map((plan, index) => {
                return (
                  <tr
                    key={plan._id}
                    className={
                      (index + 1) % 2 === 0 ? "bg-[#342e2b]" : "bg-[#2e2f3a]"
                    }
                  >
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{plan.planName}</td>
                    <td className="text-center">₹ {plan.amount}</td>
                    <td className="px-10 py-2 text-start">
                      {plan.description}
                    </td>
                    <td className="flex flex-col items-center p-2 ">
                      <ToggleSwitch
                        loading={updateLoader}
                        isOn={plan.active}
                        onToggle={(event) =>
                          handleToggleStatus(plan._id, event, index)
                        }
                      />
                      {plan.active ? (
                        <span>Enabled</span>
                      ) : (
                        <span>Disabled</span>
                      )}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => {
                          handleDeletePlan(plan._id, index);
                        }}
                        className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminManagePlans;
