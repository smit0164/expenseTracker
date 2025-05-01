import React from 'react';
import { Link } from 'react-router'; 
import { useDispatch } from 'react-redux';
import { downloadPdf, fetchExpenses } from '../features/expenseSlice';
import GroupWisePieChart from './GroupWisePieChart';
import { downloadGroupWiseExpenses } from '../features/expenseSlice'
import MonthlyExpense from './MonthlyExpense';
const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
        {/* Title and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link
              to="/manage-expense"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-5 py-2 rounded-md font-medium shadow text-sm sm:text-base text-center"
            >
              Manage Expense
            </Link>
            <Link
              to="/manage-group"
              className="bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 px-4 sm:px-5 py-2 rounded-md font-medium shadow text-sm sm:text-base text-center"
            >
              Manage Group
            </Link>
            <button
              onClick={() => dispatch(downloadPdf())}
              className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-5 py-2 rounded-md font-medium shadow text-sm sm:text-base"
            >
              Download Expense PDF
            </button>
            <button
              onClick={() => dispatch(downloadGroupWiseExpenses())}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2 rounded-md font-medium shadow text-sm sm:text-base"
            >
              Export Group-wise Expense
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Group-wise Expense Distribution</h2>
            <GroupWisePieChart />
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Monthly Expense Chart</h2>
            <MonthlyExpense />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

