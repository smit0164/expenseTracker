import React, { useEffect, useState } from 'react';
import Header from './Header';
import { fetchGroups } from '../features/groupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createExpense, fetchExpenses } from '../features/expenseSlice'; 
import {Link} from  'react-router'
const Expense = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error:expenseError } = useSelector((state) => state.expense);
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: '',
        date: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        amount: '',
        category: '',
        date: '',
        server: ''
    });
    const { groups } = useSelector((state) => state.group);

    useEffect(() => {
        dispatch(fetchGroups());
        dispatch(fetchExpenses());
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setErrors({ name: '', amount: '', category: '', date: '' });
        let hasError = false;
        if (formData.name === '') {
            hasError = true;
            setErrors((prev) => ({ ...prev, name: 'Name is required' }));
        }

        if (formData.amount === '') {
            hasError = true;
            setErrors((prev) => ({ ...prev, amount: 'Amount is required' }));
        }

        if (formData.category === '') {
            hasError = true;
            setErrors((prev) => ({ ...prev, category: 'Category is required' }));
        }

        if (formData.date === '') {
            hasError = true;
            setErrors((prev) => ({ ...prev, date: 'Date is required' }));
        }
        if (hasError) return;
        try {
            await dispatch(createExpense(formData)).unwrap();
            setFormData({ name: '', amount: '', category: '', date: '' });
            navigate('/manage-expense');
        } catch (err) {
            if(err.errors) {
                if (err.errors.name) {
                    setErrors((prev) => ({ ...prev, name: err.errors.name }));
                }
                if (err.errors.amount) {
                    setErrors((prev) => ({ ...prev, amount: err.errors.amount }));
                }
                if (err.errors.group_id) {
                    setErrors((prev) => ({ ...prev, category: err.errors.group_id }));
                }
                if (err.errors.date) {
                    setErrors((prev) => ({ ...prev, date: err.errors.date }));
                }
            }
    
        }

    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-25% bg-white shadow-lg p-6 hidden md:block">
                <Header />
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 max-w-7xl mx-auto">


                {/* Form Section */}
                <section className="bg-white p-6 rounded-xl shadow-lg">
                <div className="mb-4">
                    <Link
                        to="/manage-expense"
                        className="inline-block text-indigo-600 hover:text-indigo-800 font-medium transition"
                    >
                        ← Back to Manage Expenses
                    </Link>
                </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Expense</h2>

                    {expenseError && (
                        <div className="text-center text-red-700 bg-red-100 p-4 rounded-md mt-4">
                            {expenseError || "Something went wrong. Please try again."}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter expense name"
                                value={formData.name}
                                onChange={(e)=>{
                                    handleChange(e);
                                    setErrors((prev)=>({...prev,name:""}))
                                }}
                                className={`w-full p-3 border border-gray-300 rounded-lg ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                            />
                            {errors.name && (
                                <div className="text-red-600 text-sm mt-2">{errors.name}</div>
                            )}
                        </div>

                        {/* Amount */}
                        <div className="mb-6">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                                Amount
                            </label>
                            <input
                                id="amount"
                                type="number"
                                name="amount"
                                min="0"
                                step="0.01"
                                placeholder="Enter amount"
                                value={formData.amount}
                                onChange={(e)=>{
                                    handleChange(e);
                                    setErrors((prev)=>({...prev,amount:""}))
                                }}
                                className={`w-full p-3 border border-gray-300 rounded-lg ${errors.amount ? 'border-red-400' : 'border-gray-300'}`}
                            />
                            {errors.amount && (
                                <div className="text-red-600 text-sm mt-2">{errors.amount}</div>
                            )}
                        </div>

                        {/* Category */}
                        <div className="mb-6">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={(e)=>{
                                    handleChange(e);
                                    setErrors((prev)=>({...prev,category:""}))
                                }}
                                className={`w-full p-3 border border-gray-300 rounded-lg ${errors.category ? 'border-red-400' : 'border-gray-300'}`}
                            >
                                <option value="" disabled>
                                    Select category
                                </option>
                                {groups.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <div className="text-red-600 text-sm mt-2">{errors.category}</div>
                            )}
                        </div>

                        {/* Date */}
                        <div className="mb-6">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                Date
                            </label>
                            <input
                                id="date"
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={(e)=>{
                                    handleChange(e);
                                    setErrors((prev)=>({...prev,date:""}))
                                }}
                                className={`w-full p-3 border border-gray-300 rounded-lg ${errors.date ? 'border-red-400' : 'border-gray-300'}`}
                            />
                            {errors.date && (
                                <div className="text-red-600 text-sm mt-2">{errors.date}</div>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-indigo-500 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-md transition disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Adding Expense...' : 'Add Expense'}
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Expense;
