import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useEffect } from 'react';

export default function PieChart({ data }) {
  const [chartData, setChartData] = useState({});
  const pieData = () => {
    setChartData({
      labels: ['Posts WITH a solution', 'Posts WITHOUT a solution'],
      datasets: [
        {
          data: [data.totalPostsWithSolutions, data.totalPostsWithoutSolutions],
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB']
        }
      ]
    });
  };

  useEffect(() => {
    pieData();
  }, [data]);

  return (
    <div>
      <Pie
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
