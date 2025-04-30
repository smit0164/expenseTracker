import React from 'react';
import { Link } from 'react-router'; // use react-router-dom, not react-router
import Header from './Header';
import { useSelector, useDispatch } from 'react-redux'; // Assuming you have a Redux store set up
import { useEffect,useState } from 'react';
import { fetchGroups } from '../features/groupSlice';
import { fetchExpenses } from '../features/expenseSlice';
import MonthlyPieChart from './MonthlyPieChart';
import ExpenseTrendChart from './ExpenseTrendChart'
const Dashboard = () => {
  const dispatch = useDispatch();


  const handleDownloadPdf = () => {
    console.log("hii");
    // Update this to the full URL of your Laravel backend API
    window.location.href = 'http://localhost:8000/api/download-expense-pdf'; // Laravel backend URL
  };
  

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-white shadow-lg p-6 hidden md:block">
        <Header />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto">
        {/* Title and Buttons */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-800">Dashboard</h1>

          <div className="flex gap-6">
            <Link
              to="/manage-expense"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-md transition duration-300"
            >
              Manage Expense
            </Link>
            <Link
              to="/manage-group"
              className="bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg text-base font-semibold shadow-md transition duration-300"
            >
              Manage Group
            </Link>

            {/* Download PDF Button */}
            <button
  onClick={() => handleDownloadPdf()} // Correctly invoking the function
  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-md transition duration-300"
>
  Download Expense PDF
</button>


          </div>
        </div>

        {/* Expense Distribution - Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense Distribution</h2>
          <MonthlyPieChart />
        </div>

        {/* Expense Trend Over Time - Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ExpenseTrendChart />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;