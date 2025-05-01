import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlyExpense = () => {
    const { expenses } = useSelector((state) => state.expense);
      

  const chartData = useMemo(() => {
    // Group expenses by month (just an example)
    const monthlyMap = {};

    expenses.forEach((expense) => {
     const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
      monthlyMap[month] = (monthlyMap[month] || 0) + parseFloat(expense.amount);
    });
   
    return {
      labels: Object.keys(monthlyMap),
      datasets: [
        {
          label: 'Monthly Expenses',
          data: Object.values(monthlyMap),
          backgroundColor: 'rgba(0, 102, 102, 0.9)', 
        },
      ],
    };
   
  }, [expenses]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Expense Trend' },
    },
  };

  return (
    <div className="w-full h-full mx-auto mt-6">
      <Bar data={chartData} options={options} />
    </div>
      
  );
};

export default MonthlyExpense;
