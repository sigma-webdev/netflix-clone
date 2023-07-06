import React from "react";
import DashboardCard from "../card/DashboardCard";
import Barchart from "../../components/charts/Barchart";
import PieChart from "../../components/charts/PieChart";
import StackedBarChart from "../../components/charts/StackedBarChart";

const AdminDashboard = () => {
  
  return (
    <div className=" w-full text-zinc-100">
      <div className="flex flex-wrap items-center justify-evenly lg:flex-nowrap ">
        <DashboardCard />
        <PieChart />
      </div>
      <Barchart />
    </div>
  );
};

export default AdminDashboard;
