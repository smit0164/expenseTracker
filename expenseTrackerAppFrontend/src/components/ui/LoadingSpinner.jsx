import React from 'react'

const LoadingSpinner = () => {
  return (
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
  )
}

export default LoadingSpinner