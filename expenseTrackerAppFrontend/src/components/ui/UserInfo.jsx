import React from 'react';

const UserInfo = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <svg
          className="h-12 w-12 text-indigo-600 rounded-full bg-indigo-100 p-2 border-2 border-indigo-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a4 4 0 11-4 4 4 4 0 014-4zm0 12a7 7 0 00-7 7v1h14v-1a7 7 0 00-7-7z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-right">
          <span className="text-gray-900 text-lg font-semibold">{user.name}</span>
          <span className="block text-gray-600 text-sm">{user.email}</span>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium"
      >
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
