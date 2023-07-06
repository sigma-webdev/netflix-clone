import { useEffect } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { getUsersData } from "../../store/dashboardSlice";
import { useSelector, useDispatch } from "react-redux";

const PieChart = () => {
  const usersData = useSelector((state) => state.dashboard.usersData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);

  const data = {
    labels:
      Object.keys(usersData).length && Object.keys(usersData?.data?.plans),
    datasets: [
      {
        label: "Popularity",
        data:
          Object.keys(usersData).length &&
          Object.values(usersData?.data?.plans),
        backgroundColor: [
          "#f44336",
          "#9c27b0",
          "#03a9f4",
          "#8bc34a",
          "#ffc107",
        ],
        borderColor: "#f44336",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-[450px] w-[450px]">
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
