import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ChartData, ChartOptions, ChartType } from 'chart.js';
import { chartOptions } from '../../utils/chartUtils';

interface BaseChartProps {
  type: ChartType;
  data: ChartData;
  options?: ChartOptions;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const BaseChart: React.FC<BaseChartProps> = ({
  type,
  data,
  options = {},
  width = '100%',
  height = '300px',
  className = '',
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Create new chart instance
    chartInstance.current = new ChartJS(ctx, {
      type,
      data,
      options: { ...chartOptions, ...options },
    });

    // Cleanup function to destroy chart on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [type, data, options]);

  return (
    <div style={{ width, height }} className={className}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BaseChart;
