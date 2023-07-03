import React from 'react'
import { Bar} from 'react-chartjs-2'
import { Chart as ChartJs } from 'chart.js/auto'

const data = {
    labels:['Plan1', "Plan2", "Plan3", "Plan4"],
    datasets: [
        {
           label: "Popularity",
           data:[40, 23, 12, 6,9],
           backgroundColor:['#f44336', '#9c27b0','#03a9f4', '#8bc34a',"#ffc107"],
           borderColor: '#f44336',
           borderWidth: 1,
        },
    ],
};

 const Barchart = () => {
  return (
    <div className="w-[80%]">
      <Bar data={data} />
    </div>
  );
  
}

export default Barchart