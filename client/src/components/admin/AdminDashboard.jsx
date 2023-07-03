import React from "react";
import DashboardCard from "../card/DashboardCard";
import Barchart from "../../Charts/Barchart";
import PieChart from "../../Charts/PieChart";
import StackedBarChart from "../../Charts/StackedBarChart";

const AdminDashboard = () => {
  return (
    <div className=" text-zinc-100 w-full">
      <div className="flex flex-wrap justify-evenly items-center lg:flex-nowrap ">
        <DashboardCard />
        <PieChart />
      </div>
      <Barchart />
    </div>
  );
};

export default AdminDashboard;
