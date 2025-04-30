import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Assuming you have react-router-dom installed
  const { loading } = useSelector((state) => state.auth); // Using loading state from Redux

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    checkPassword: '',
    server: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ name: '', email: '', password: '', password_confirmation: '', checkPassword: '', server: '' });
    let hasError = false;

    // Client-side validation checks
    if (formData.name === '') {
      hasError = true;
      setError((prev) => ({ ...prev, name: 'Name is required' }));
    }
    if (formData.email === '') {
      hasError = true;
      setError((prev) => ({ ...prev, email: 'Email is required' }));
    }
    if (formData.password === '') {
      hasError = true;
      setError((prev) => ({ ...prev, password: 'Password is required' }));
    }
    if (formData.password_confirmation === '') {
      hasError = true;
      setError((prev) => ({ ...prev, password_confirmation: 'Password confirmation is required' }));
    }
    if (formData.password !== formData.password_confirmation) {
      hasError = true;
      setError((prev) => ({ ...prev, checkPassword: 'Passwords do not match' }));
    }
    if (formData.password.length < 8) {
      hasError = true;
      setError((prev) => ({ ...prev, password: 'Password must be at least 8 characters long' }));
    }

    if (hasError) {
      return;
    }

    try {
      // Dispatch the registration action
      await dispatch(registerUser(formData)).unwrap();

      // Reset form and error states on successful registration
      setFormData({ name: '', email: '', password: '', password_confirmation: '' });
      setError({ name: '', email: '', password: '', password_confirmation: '', checkPassword: '', server: '' });
      navigate('/dashboard'); // Navigate to dashboard on success

    } catch (err) {
      

      // Check for name error
      if (err.errors.name) {
        setError((prev) => ({
          ...prev,
          name: err.errors.name,
        }));
      }

      // Check for email error
      if (err.errors.email) {
        setError((prev) => ({
          ...prev,
          email: err.errors.email,
        }));
      }

      // Check for password error
      if (err.errors.password) {
        setError((prev) => ({
          ...prev,
          password: err.errors.password,
        }));
      }

      // Check for password confirmation error
      if (err.errors.password_confirmation) {
        setError((prev) => ({
          ...prev,
          password_confirmation: err.errors.password_confirmation,
        }));
      }

      // Handle passwords not matching error
      if (err.errors.checkPassword) {
        setError((prev) => ({
          ...prev,
          checkPassword: err.errors.checkPassword,
        }));
      }

      // Handle other errors
      setError((prev) => ({
        ...prev,
        server: 'Registration failed. Please try again.',
      }));
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      <div className="bg-gray-50 p-8 rounded-2xl shadow-md w-full max-w-md mx-4 border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Get started with your free account</p>
        </div>

        {error.server && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error.server}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => {
                handleChange(e);
                setError((prev) => ({ ...prev, name: '' }));
              }}
              className={`w-full px-4 py-3 border ${error.name ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400`}
              placeholder="John Doe"
              disabled={loading}
            />
            {error.name && <p className="mt-1 text-sm text-red-500">{error.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => {
                handleChange(e);
                setError((prev) => ({ ...prev, email: '' }));
              }}
              className={`w-full px-4 py-3 border ${error.email ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400`}
              placeholder="your@email.com"
              disabled={loading}
            />
            {error.email && <p className="mt-1 text-sm text-red-500">{error.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) => {
                  handleChange(e);
                  setError((prev) => ({ ...prev, password: '', checkPassword: '' }));
                }}
                className={`w-full px-4 py-3 border ${error.password || error.checkPassword ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400`}
                placeholder="••••••••"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
            {error.password && <p className="mt-1 text-sm text-red-500">{error.password}</p>}
            {error.checkPassword && <p className="mt-1 text-sm text-red-500">{error.checkPassword}</p>}
            <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={(e) => {
                handleChange(e);
                setError((prev) => ({ ...prev, password_confirmation: '' }));
              }}
              className={`w-full px-4 py-3 border ${error.password_confirmation ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400`}
              placeholder="••••••••"
              disabled={loading}
            />
            {error.password_confirmation && <p className="mt-1 text-sm text-red-500">{error.password_confirmation}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
            } text-white focus:outline-none focus:ring-2 focus:ring-indigo-400`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : 'Sign Up'}
          </button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-500 hover:text-indigo-400 underline">
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;