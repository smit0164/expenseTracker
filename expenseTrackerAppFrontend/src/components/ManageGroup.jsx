import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGroup} from '../features/groupSlice';
import { Link } from 'react-router'
import Header from './SideBar';
const ManageGroup = () => {
    const dispatch = useDispatch();
    const { groups, loading: groupLoading, error: groupError } = useSelector((state) => state.group);

    const [showModal, setShowModal] = useState(false);
    const [groupIdToDelete, setGroupIdToDelete] = useState(null);

    const handleDelete = (groupId) => {
        setGroupIdToDelete(groupId);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await dispatch(deleteGroup(groupIdToDelete)).unwrap();
        } catch (err) {
            console.error("Delete error:", err);
        }
        setShowModal(false);
    };

    const cancelDelete = () => {
        setGroupIdToDelete(null);
        setShowModal(false);
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-1/4 bg-white shadow-md p-6 hidden md:block">
                <Header />
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Link
                        to="/dashboard"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium transition"
                    >
                        ← Back to Dashboard
                    </Link>

                    <Link
                        to="/create-group"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition"
                    >
                        + Create Group
                    </Link>
                </div>

                {groupLoading ? (
                    <div className="flex justify-center py-10 text-indigo-500" role="status">
                        <svg className="animate-spin h-10 w-10" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    </div>
                ) : groupError ? (
                    <div className="text-center text-red-700 bg-red-100 p-4 rounded-md">
                        {groupError || 'Something went wrong while loading groups.'}
                    </div>
                ) : groups.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        No groups found. Click "Create Group" to get started.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groups.map((group) => (
                            <div key={group.id} className="bg-white rounded-lg shadow p-5 border border-gray-200 relative">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{group.name}</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Created At: {new Date(group.created_at).toLocaleString('en-IN', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </p>
                                <button
                                    onClick={() => handleDelete(group.id)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-sm text-xs font-semibold p-1 transition duration-200 hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Are you sure you want to delete this group?
                        </h2>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
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

export default ManageGroup;