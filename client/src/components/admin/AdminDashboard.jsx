import React from "react";
import DashboardCard from "../card/DashboardCard";
import Barchart from "../../components/charts/Barchart";
import PieChart from "../../components/charts/PieChart";


const AdminDashboard = () => {
  
  return (
    <div className=" w-10/12 text-zinc-100 bg-slate-100">
      <div className="flex flex-wrap items-center justify-evenly lg:flex-nowrap ">
        <DashboardCard />
        <PieChart />
      </div>
      <Barchart />
    </div>
  );
};

export default AdminDashboard;
