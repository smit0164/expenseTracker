import React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses,updateExpense } from '../features/expenseSlice';
import { useEffect, useState } from 'react';
import Header from './SideBar';
import { fetchGroups } from '../features/groupSlice'
const EditExpense = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { groups } = useSelector((state) => state.group);
    const expenses = useSelector((state) => state.expense.expenses);
    const loading = useSelector((state) => state.expense.loading);
    const error = useSelector((state) => state.expense.error);

    const selectedExpense = expenses.find((item) => item.id === parseInt(id));
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: '',
        date: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchGroups());
        dispatch(fetchExpenses());
    }, []);

    useEffect(() => {
        if (selectedExpense) {
            setFormData({
                name: selectedExpense.name,
                amount: selectedExpense.amount,
                category: selectedExpense.group_id,
                date: selectedExpense.date
            });
        }
    }, [selectedExpense]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        const newErrors = {};

        if (!formData.name) {
            hasError = true;
            newErrors.name = 'Name is required';
        }
        if (!formData.amount) {
            hasError = true;
            newErrors.amount = 'Amount is required';
        }
        if (!formData.category) {
            hasError = true;
            newErrors.category = 'Category is required';
        }
        if (!formData.date) {
            hasError = true;
            newErrors.date = 'Date is required';
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        try {
            await dispatch(updateExpense({ id, ...formData })).unwrap();
            navigate('/manage-expense');
        } catch (err) {
            console.error('Update failed:', err);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-25% bg-white shadow-lg p-6 hidden md:block">
                <Header />
            </aside>

            <main className="flex-1 p-8 max-w-7xl mx-auto">
                <section className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="mb-4">
                        <Link
                            to="/manage-expense"
                            className="inline-block text-indigo-600 hover:text-indigo-800 font-medium transition"
                        >
                            ← Back to Manage Expenses
                        </Link>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Expense</h2>

                    {error && (
                        <div className="text-center text-red-700 bg-red-100 p-4 rounded-md mt-4">
                            {error || "Something went wrong. Please try again."}
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
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                            />
                            {errors.name && <div className="text-red-600 text-sm mt-2">{errors.name}</div>}
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
                                value={formData.amount}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg ${errors.amount ? 'border-red-400' : 'border-gray-300'}`}
                            />
                            {errors.amount && <div className="text-red-600 text-sm mt-2">{errors.amount}</div>}
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
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg ${errors.category ? 'border-red-400' : 'border-gray-300'}`}
                            >
                                <option value="" disabled>Select category</option>
                                {groups.map((group) => (
                                    <option key={group.id} value={group.id}>{group.name}</option>
                                ))}
                            </select>
                            {errors.category && <div className="text-red-600 text-sm mt-2">{errors.category}</div>}
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
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg ${errors.date ? 'border-red-400' : 'border-gray-300'}`}
                            />
                            {errors.date && <div className="text-red-600 text-sm mt-2">{errors.date}</div>}
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-indigo-500 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-md transition disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update Expense'}
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default EditExpense;
