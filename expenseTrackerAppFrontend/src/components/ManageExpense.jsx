import React from 'react'
import Header from './Header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../features/expenseSlice';
import { Link,useNavigate } from 'react-router'
import { fetchGroups } from '../features/groupSlice';
import  {deleteExpense} from '../features/expenseSlice';
const ManageExpense = () => {
    const dispatch = useDispatch();
    const { expenses, loading: expensesLoading, error: expenseError } = useSelector((state) => state.expense);
    const { groups} = useSelector((state) => state.group);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpenseId, setSelectedExpenseId] = useState(null);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/edit-expense/${id}`);
    };
    useEffect(() => {
        dispatch(fetchExpenses());
        dispatch(fetchGroups())
    }, [])
    const handleDelete = (id) => {
        setSelectedExpenseId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        console.log("Deleting expense", selectedExpenseId);
        try {
            await dispatch(deleteExpense(selectedExpenseId)).unwrap(); 
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
        setIsModalOpen(false); 
    };
    

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-1/4 bg-white shadow-md p-6 hidden md:block">
                <Header />
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto">
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <Link
                            to="/dashboard"
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition"
                        >
                            ← Back to Dashboard
                        </Link>
                        <Link
                            to="/create-expense"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition"
                        >
                            + Create Expense
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">Manage Expense</h1>
                </div>

                {/* Loading Spinner */}
                {expensesLoading ? (
                    <div className="flex justify-center py-16 text-indigo-500">
                        <svg className="animate-spin h-10 w-10" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    </div>
                ) : expenseError ? (
                    <div className="text-center text-red-700 bg-red-100 p-4 rounded-md">
                        {expenseError || 'Failed to load expenses'}
                    </div>
                ) : expenses && expenses.length > 0 ? (
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full text-left text-sm text-gray-700">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Date</th>
                                    <th className="px-6 py-3 font-medium">Name</th>
                                    <th className="px-6 py-3 font-medium">Amount</th>
                                    <th className="px-6 py-3 font-medium">Group</th>
                                    <th className="px-6 py-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {expenses.slice().reverse().map((expense) => (
                                    <tr key={expense.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">{expense.date}</td>
                                        <td className="px-6 py-4">{expense.name}</td>
                                        <td className="px-6 py-4 font-semibold">₹{parseFloat(expense.amount).toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            {expense.category ||
                                                groups.find((g) => g.id === expense.group_id)?.name ||
                                                `Group #${expense.group_id}`}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-4">
                                                {/* Edit */}
                                                <button onClick={() => handleEdit(expense.id)} className="text-indigo-600 hover:text-indigo-800">

                                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M17.75 3.25a2.25 2.25 0 1 0-3.181 3.181l-7.52 7.52a.75.75 0 0 0-.171.38l-1.548 4.64a.75.75 0 0 0 .907.907l4.64-1.548a.75.75 0 0 0 .38-.171l7.52-7.52a2.25 2.25 0 0 0 0-3.181z" />
                                                    </svg>
                                                </button>
                                                {/* Delete */}
                                                <button onClick={() => handleDelete(expense.id)} className="text-red-600 hover:text-red-800">
                                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414L11.414 10l2.293 2.293a1 1 0 0 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 0-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 text-lg py-10">No expenses recorded.</div>
                )}
            </main>
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to delete this expense?</h2>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)} // Cancel Delete
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete} // Confirm Delete
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ManageExpense;