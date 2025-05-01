import React from 'react'

const SummaryCard = ({ title, name, amount, color = 'text-indigo-600', fallback = '0' }) => {
    return (
      <div className="p-6 bg-white rounded-xl shadow">
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        {amount !== null ? (
          <>
            {name && <p className="mt-2 text-lg text-gray-800">{name}</p>}
            <p className={`text-xl font-bold ${color}`}>₹{parseFloat(amount).toFixed(2)}</p>
          </>
        ) : (
          <p className="text-gray-400 mt-2">{fallback}</p>
        )}
      </div>
    );
  };

export default SummaryCard