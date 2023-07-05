import React from "react";
import { Pie } from "react-chartjs-2";

import { useSelector } from "react-redux";

const PieChart = () => {
  const usersData = useSelector((state) => state.dashboard.usersData);

  const data = {
    labels: Object.keys(usersData?.data?.data?.plans),
    datasets: [
      {
        label: "Popularity",
        data: Object.values(usersData?.data?.data?.plans),
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
