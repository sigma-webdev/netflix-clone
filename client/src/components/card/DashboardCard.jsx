import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMoviesData,
  getSeriesData,
  getUsersData,
} from "../../store/dashboardSlice";

const DashboardCard = () => {
  const movieCount = useSelector((state) => state.dashboard.moviesCount);
  const seriesNum = useSelector((state) => state.dashboard.seriesCount);
  const usersData = useSelector((state) => state.dashboard.usersData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesData());
    dispatch(getSeriesData());
    dispatch(getUsersData());
  }, [dispatch]);

  console.log(usersData?.data?.data, "//////////////////////");

  return (
    <div className=" h-fit">
      <div className=" flex flex-wrap gap-6 p-8">
        <div className="w-5/6 rounded border bg-green-600 p-2 text-right shadow ">
          <h5 className="">Total no Of Movies</h5>
          <h3 className="text-3xl">{movieCount?.data?.data?.moviesCount}</h3>
        </div>
        <div className=" w-5/6 rounded border bg-red-600 p-2 text-right shadow">
          <h5 className="">Total no Of Series</h5>
          <h3 className="text-3xl ">{seriesNum?.data?.data?.seriesCount}</h3>
        </div>
        <div className="w-5/6 rounded border bg-blue-600 p-2 text-right shadow ">
          <h5 className="">Total no Of Users</h5>
          <h3 className="text-3xl ">{usersData?.data?.data?.usersCount}</h3>
        </div>
        <div className="w-5/6 rounded border bg-orange-600 p-2 text-right shadow ">
          <h5 className="">Total No. Of Active Subscription</h5>
          <h3 className="text-3xl ">
            {usersData?.data?.data?.usersCountWithActiveSubscription}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
