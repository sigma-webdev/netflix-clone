import React from "react";

const DashboardCard = () => {
  return (
    <div className=" h-fit">
      <div className=" flex flex-wrap    gap-6 p-8">
        <div className="w-5/6 rounded border bg-green-600 p-2 text-right shadow ">
          <h5 className="">Total Revenue</h5>
          <h3 className="text-3xl">3249&euro;</h3>
        </div>
        <div className=" w-5/6 rounded border bg-red-600 p-2 text-right shadow">
          <h5 className="">Total Revenue</h5>
          <h3 className="text-3xl ">3249&euro;</h3>
        </div>
        <div className="w-5/6 rounded border bg-blue-600 p-2 text-right shadow ">
          <h5 className="">Total Revenue</h5>
          <h3 className="text-3xl ">3249&euro;</h3>
        </div>
        <div className="w-5/6 rounded border bg-orange-600 p-2 text-right shadow ">
          <h5 className="">Total Revenue</h5>
          <h3 className="text-3xl ">3249&euro;</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
