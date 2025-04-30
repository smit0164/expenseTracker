import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../features/groupSlice';
import { useNavigate } from 'react-router';
import Header from './Header';
import {Link} from 'react-router'
function Group() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: groupError } = useSelector((state) => state.group);
  const [formData, setFormData] = useState({ groupName: '' });
  const [error, setError] = useState({ groupName: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ groupName: '' });

    if (!formData.groupName.trim()) {
      setError({ groupName: 'Group name is required' });
      return;
    }

    try {
      await dispatch(createGroup({ groupName: formData.groupName })).unwrap();
      setFormData({ groupName: '' });
      navigate('/manage-group');
    } catch (err) {
      if (err.errors?.groupName) {
        setError({ groupName: err.errors.groupName[0] });
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
        <div className="flex justify-between mb-10">
          <div className="text-center mb-10">
            <p className="text-gray-600 text-lg">Create a new group for managing expenses.</p>
          </div>
        </div>

        {/* Form Section */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-4">
                    <Link
                        to="/manage-group"
                        className="inline-block text-indigo-600 hover:text-indigo-800 font-medium transition"
                    >
                        ← Back to Manage Group
                    </Link>
                </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Group</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="groupName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Group Name
              </label>
              <input
                type="text"
                id="groupName"
                name="groupName"
                value={formData.groupName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter group name"
              />
              {error.groupName && (
                <div className="text-red-600 text-sm mt-2">{error.groupName}</div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-md transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Group'}
              </button>
            </div>
            {groupError && (
              <div className="text-center text-red-700 bg-red-100 p-4 rounded-md mt-4">
                {groupError}
              </div>
            )}
          </form>
        </section>
      </main>
    </div>
  );
};

export default Group;