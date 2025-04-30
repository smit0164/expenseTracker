import { Line } from 'react-chartjs-2';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

// Ensure chart.js is properly registered
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ExpenseTrendChart = () => {
  const { expenses } = useSelector(state => state.expense);

  // Format expenses data into monthly breakdown
  const expenseTrendData = useMemo(() => {
    const trend = expenses.reduce((acc, expense) => {
      // Format the date to 'MMM YYYY' for grouping by month
      const month = dayjs(expense.date).format('MMM YYYY');
      const amount = parseFloat(expense.amount);

      // Sum up the amount for each month
      if (acc[month]) {
        acc[month] += amount;
      } else {
        acc[month] = amount;
      }

      return acc;
    }, {});

    // Create arrays of labels (months) and corresponding data (total expenses)
    const labels = Object.keys(trend);
    const data = Object.values(trend);

    return { labels, data };
  }, [expenses]);

  const chartData = {
    labels: expenseTrendData.labels,
    datasets: [
      {
        label: 'Monthly Expense Trend',
        data: expenseTrendData.data,
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Expense Trend Over Time' },
      tooltip: {
        callbacks: {
          // Custom tooltip callback for formatting the tooltip value
          label: (context) => `$${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Expense Amount ($)',
        },
        ticks: {
          beginAtZero: true,
          callback: (value) => `$${value.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense Trend Over Time</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ExpenseTrendChart;
