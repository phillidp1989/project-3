import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';

export default function BarChart({ data, list }) {
  console.log(data.categoryCount);
  const [chartData, setChartData] = useState({});

  const barData = () => {
    setChartData({
      labels: ['Business', 'Design', 'Gaming', 'Journalism', 'Marketing'],
      datasets: [
        {
          label: 'No. of posts per category',
          data: data.categoryCount,
          backgroundColor: [
            '#64dd17',
            '#ff6d00',
            '#d500f9',
            'ff4081',
            '#80d8ff'
          ],
          borderColor: 'black',
          borderWidth: 1,
          hoverBackgroundColor: [
            '#1faa00',
            '#c43c00',
            '#9e00c5',
            'c60055',
            '#49a7cc'
          ]
        }
      ]
    });
  };

  useEffect(() => {
    barData();
  }, [data]);

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          legend: { labels: { fontColor: '#fff' } },
          scales: {
            yAxes: [
              {
                ticks: {
                  fontColor: 'fff',
                  stepSize: 1,
                  beginAtZero: true
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: 'fff'
                }
              }
            ]
          }
        }}
      />
    </div>
  );
}
