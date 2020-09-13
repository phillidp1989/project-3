import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useEffect } from 'react';

export default function DoughnutChart({ data }) {
  const [chartData, setChartData] = useState({});

  const doughnutData = () => {
    setChartData({
      labels: ['Completed Solutions', 'In Progress Solutions'],
      datasets: [
        {
          data: [data.completedSolutions, data.inProgressSolutions],
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB']
        }
      ]
    });
  };

  useEffect(() => {
    doughnutData();
  }, [data]);

  return (
    <div>
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          legend: {
            position: 'bottom',
            labels: { fontColor: '#fff' }
          }
        }}
      />
    </div>
  );
}
