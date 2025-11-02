import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Economic Indicators',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      type: 'linear' as const,
    },
    x: {
      type: 'category' as const,
    },
  },
};

export const createChartRef = (chartRef: React.MutableRefObject<HTMLCanvasElement | null>) => {
  return chartRef.current?.getContext('2d') || null;
};

export const destroyChart = (chartInstance: ChartJS | null) => {
  if (chartInstance) {
    chartInstance.destroy();
  }
};
