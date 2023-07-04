import React from 'react'

import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,

} from "chart.js";
import {Bar} from 'react-chartjs-2';

ChartJs.register(CategoryScale, LinearScale,BarElement, Title, Legend);

export const options ={
    Plugins:{
        title:{
            display:true,
            text:"Month sales",
        },
    },
    responsive: true,
    scales:{
        x:{
            stacked: true,
        },
        y:{
            stacked:true,
        },
    },
}

const labels = ["january", 'February', 'March',"April"];

export const data = {
  labels,
  datasets: [
    {
      label: "Plan 1",
      data: [300, 300, -400],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Plan 2",
      data: [500, 300, 800],
      backgroundColor: "rgb(76, 192, 132)",
    },
    {
      label: "Plan 3",
      data: [500, 300, -400],
      backgroundColor: "rgb(53, 162, 132)",
    },
  ],
};

const StackedBarChart = () => {
  return (
    <Bar options={options} data={data}/>
  )
}

export default StackedBarChart