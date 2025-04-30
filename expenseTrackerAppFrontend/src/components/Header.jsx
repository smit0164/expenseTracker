import React, { useEffect,useState} from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, logout } from '../features/authSlice'; // Adjust the import path as necessary

const Header = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { expenses, loading: expenseLoading, error: expenseError } = useSelector((state) => state.expense); // Assuming you have an expense slice
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
   const [summary, setSummary] = useState({
      totalExpense: 0,
      highestExpense: null,
      highestThisMonth: null,
    });
  
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
   useEffect(() => {
      if (expenses.length > 0) {
        calculateDashboardStats(expenses);
      }
    }, [expenses]);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <header className="bg-gray-50 border-b border-gray-200 shadow-md rounded-2xl mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-2xl font-bold text-indigo-600">
              <Link
                to="/"
                className="hover:text-indigo-500 transition-colors duration-200"
                aria-label="Go to Expense Tracker App homepage"
              >
                Expense Tracker App
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* User Account Information (Moved Below Header) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-10">
  {loading ? (
    <div
      className="flex items-center space-x-2 text-indigo-500 text-sm font-medium"
      role="status"
      aria-live="polite"
    >
      <svg
        className="animate-spin h-5 w-5 text-indigo-500"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
      <span>Loading...</span>
    </div>
  ) : user ? (
    <div className="flex items-center justify-between space-x-4">
      {/* User Avatar and Info */}
      <div className="flex items-center space-x-4">
        {/* User Avatar */}
        <svg
          className="h-12 w-12 text-indigo-600 rounded-full bg-indigo-100 p-2 border-2 border-indigo-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 2a4 4 0 11-4 4 4 4 0 014-4zm0 12a7 7 0 00-7 7v1h14v-1a7 7 0 00-7-7z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-right">
          <span className="text-gray-900 text-lg font-semibold">
            {user?.name || 'Smit'}
          </span>
          <span className="block text-gray-600 text-sm">{user?.email || 'smit@gmail.com'}</span>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium transition duration-200"
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="flex items-center space-x-6">
      {/* Login & Signup Links */}
      <Link
        to="/login"
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium transition duration-200"
        aria-label="Login"
      >
        Login
      </Link>
      <Link
        to="/signup"
        className="bg-white border border-indigo-500 hover:bg-gray-100 text-indigo-600 px-6 py-2 rounded-full text-sm font-medium transition duration-200"
        aria-label="Sign Up"
      >
        Sign Up
      </Link>
    </div>
  )}
</div>



      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-6 mb-10">
  <div className="p-6 bg-white rounded-xl shadow">
    <p className="text-sm text-gray-600 font-medium">Total Expenses</p>
    <p className="mt-2 text-3xl font-bold text-indigo-600">₹{summary.totalExpense.toFixed(2)}</p>
  </div>

  <div className="p-6 bg-white rounded-xl shadow">
    <p className="text-sm text-gray-600 font-medium">Highest Expense</p>
    {summary.highestExpense ? (
      <>
        <p className="mt-2 text-lg text-gray-800">{summary.highestExpense.name}</p>
        <p className="text-xl font-bold text-red-600">₹{parseFloat(summary.highestExpense.amount).toFixed(2)}</p>
      </>
    ) : (
      <p className="text-gray-400 mt-2">N/A</p>
    )}
  </div>

  <div className="p-6 bg-white rounded-xl shadow">
    <p className="text-sm text-gray-600 font-medium">Highest This Month</p>
    {summary.highestThisMonth ? (
      <>
        <p className="mt-2 text-lg text-gray-800">{summary.highestThisMonth.name}</p>
        <p className="text-xl font-bold text-yellow-500">₹{parseFloat(summary.highestThisMonth.amount).toFixed(2)}</p>
      </>
    ) : (
      <p className="text-gray-400 mt-2">N/A</p>
    )}
  </div>
</section>

    </>
  );
};

export default Header;
