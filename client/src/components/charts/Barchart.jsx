import React,{useEffect} from 'react';
import "chart.js/auto";
import { Bar} from 'react-chartjs-2'
import { getUsersData } from "../../store/dashboardSlice";
import { useSelector, useDispatch } from "react-redux";


 const Barchart = () => {

  const usersData = useSelector((state) => state.dashboard.usersData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);
const data = {
  labels: Object.keys(usersData).length && Object.keys(usersData?.data?.plans),
  datasets: [
    {
      label: "Popularity",
      data:
        Object.keys(usersData).length && Object.values(usersData?.data?.plans),
      backgroundColor: ["#f44336", "#9c27b0", "#03a9f4", "#8bc34a", "#ffc107"],
      borderColor: "#f44336",
      borderWidth: 2,
    },
  ],
};
  return (
    <div className="w-[80%]">
      <Bar data={data} />
    </div>
  );
  
}

export default Barchart