import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../store/adminPlansSlice";

const AdminManagePlans = () => {
  const dispatch = useDispatch();
  const allPlan = useSelector((state) => state.plans.allPlans);
  console.log(allPlan);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);
  return (
    <>
      <h1>Admin Manage Plans</h1>
      <p>Work Under Progress</p>
    </>
  );
};

export default AdminManagePlans;
