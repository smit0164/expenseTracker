import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, logout } from '../features/authSlice';
import { fetchExpenses } from '../features/expenseSlice';
import { fetchGroups } from '../features/groupSlice';
import LoadingSpinner from './ui/LoadingSpinner';
import SummaryCard from './ui/SummaryCard';
import UserInfo from './ui/UserInfo';
const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    totalExpense: 0,
    highestExpense: null,
    highestThisMonth: null,
  });
  const { user, loading } = useSelector((state) => state.auth);
  const { expenses, loading: expenseLoading, error: expenseError } = useSelector((state) => state.expense);
  const {groups,loading:groupLoading,error:groupError}=useSelector((state)=>state.group);
  useEffect(() => {
    if(!user){
      dispatch(fetchUser());
    }
    if(expenses.length==0){
      dispatch(fetchExpenses());
    }
    if(groups.length==0){
      dispatch(fetchGroups());
    }
  }, [dispatch]);

  useEffect(() => {
    if (expenses.length > 0) {
      calculateDashboardStats(expenses);
    }
  }, [expenses]);


  const calculateDashboardStats = (expenses) => {
    if (!expenses || expenses.length === 0) return;

    const totalExpense = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

    const highestExpense = expenses.reduce((max, exp) =>
      parseFloat(exp.amount) > parseFloat(max.amount) ? exp : max, expenses[0]
    );

    const currentMonth = new Date().getMonth();
    const expensesThisMonth = expenses.filter(exp => new Date(exp.date).getMonth() === currentMonth);
    const highestThisMonth = expensesThisMonth.reduce((max, exp) =>
      parseFloat(exp.amount) > parseFloat(max.amount) ? exp : max, expensesThisMonth[0] || null
    );

    setSummary({
      totalExpense,
      highestExpense,
      highestThisMonth,
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <header className="bg-gray-50 border-b border-gray-200 shadow-md rounded-2xl mb-8">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">
            <Link to="/" className="hover:text-indigo-500">Expense Tracker App</Link>
          </div>
        </div>
      </header>

      {/* User Account Information (Moved Below Header) */}
      <div className="max-w-7xl mx-auto px-4 py-4 mb-10">
        {loading ? (
          <LoadingSpinner />
        ) : user ? (
          <UserInfo user={user} onLogout={handleLogout} />
        ) : (
          <div className="flex items-center space-x-6">
            <Link to="/login" className="bg-indigo-500 text-white px-6 py-2 rounded-full text-sm">Login</Link>
            <Link to="/signup" className="border border-indigo-500 text-indigo-600 px-6 py-2 rounded-full text-sm">Sign Up</Link>
          </div>
        )}
      </div>



      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-6 mb-10 px-4 max-w-7xl mx-auto">
  <SummaryCard
    title="Total Expenses"
    amount={summary.totalExpense ?? 0}
  />
  <SummaryCard
    title="Highest Expense"
    name={summary.highestExpense?.name}
    amount={summary.highestExpense?.amount ?? 0}
    color="text-red-600"
  />
  <SummaryCard
    title="Highest This Month"
    name={summary.highestThisMonth?.name}
    amount={summary.highestThisMonth?.amount ?? 0}
    color="text-yellow-500"
  />
</section>


    </>
  );
};

export default SideBar;
