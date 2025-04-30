import React, { useEffect, useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroups } from '../features/groupSlice';

ChartJS.register(ArcElement, Tooltip, Legend);

const MonthlyPieChart = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.group);
  const { expenses } = useSelector((state) => state.expense); // Assuming you have an expense slice

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  console.log("groups", groups);
  console.log("expenses", expenses);

  // Adjusted to group expenses by category
  const categoryData = useMemo(() => {
    const categoryMap = {};

    // Loop through expenses and match each expense with the corresponding group
    expenses.forEach(expense => {
      // Find the group by matching the group_id in the expense with the group's id
      const group = groups.find(g => g.id === expense.group_id);
      
      if (group) {
        const category = group.name; // Use group name as the category (or any other property you prefer)
        const amount = parseFloat(expense.amount);

        if (categoryMap[category]) {
          categoryMap[category] += amount;
        } else {
          categoryMap[category] = amount;
        }
      }
    });

    // Convert the categoryMap into arrays for labels and data
    const labels = Object.keys(categoryMap); 
    const data = Object.values(categoryMap);

    console.log("Category data:", { labels, data });

    return { labels, data };
  }, [groups, expenses]);

  // Check if category data is available
  if (categoryData.labels.length === 0 || categoryData.data.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto mt-6 text-center">
        <p>No data available to display.</p>
      </div>
    );
  }

  const chartData = {
    labels: categoryData.labels,
    datasets: [
      {
        label: 'Expense Distribution by Category',
        data: categoryData.data,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#C9CBCF', '#5DADE2',
          '#45B39D', '#AF7AC5', '#F5B041', '#DC7633',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Expense Distribution by Category' },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default MonthlyPieChart;
