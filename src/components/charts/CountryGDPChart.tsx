import React from 'react';
import BaseChart from './BaseChart';
import { CountryData } from '../../data/npi-data';

interface CountryGDPChartProps {
  country: CountryData;
  width?: string | number;
  height?: string | number;
}

const CountryGDPChart: React.FC<CountryGDPChartProps> = ({
  country,
  width = '100%',
  height = '300px',
}) => {
  // Prepare chart data
  const data = {
    labels: ['GDP per Capita', 'Growth Rate'],
    datasets: [
      {
        label: country.name,
        data: [country.gdpPerCapita, country.growthRate],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${country.name} - Economic Indicators`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (
    <div style={{ width, height }}>
      <BaseChart
        type="bar"
        data={data}
        options={options}
        width={width}
        height={height}
      />
    </div>
  );
};

export default CountryGDPChart;
