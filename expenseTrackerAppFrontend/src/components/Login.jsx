import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { useNavigate } from 'react-router';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading,error:loginerror} = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState({ email: '', password: '', invalidcredentials: '' });

  const [showPassword, setShowPassword] = useState(false);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Clear error state
  const clearError = () => {
    setError({ email: '', password: '', invalidcredentials: '' });
  };

  // Clear input fields after successful login
  const clearInput = () => {
    setFormData({ email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    let hasError = false;

    // Client-side validation
    if (formData.email === '') {
      hasError = true;
      setError((prev) => ({ ...prev, email: 'Email is required' }));
    }
    if (formData.password === '') {
      hasError = true;
      setError((prev) => ({ ...prev, password: 'Password is required' }));
    }

    if (hasError) return;

    try {
      // Dispatch login user action
      await dispatch(loginUser(formData)).unwrap();
      clearInput(); // Clear input fields after successful login
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {

     console.log(err);
      // Set error messages from backend response
      if (err.errors) {
        if (err.errors.email) {
          setError((prev) => ({
            ...prev,
            email: err.errors.email,
          }));
        }
        if (err.errors.password) {
          setError((prev) => ({
            ...prev,
            password: err.errors.password,
          }));
        }
        if (err.errors.invalidcredentials) {
          setError((prev) => ({
            ...prev,
            invalidcredentials: err.errors.invalidcredentials,
          }));
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-gray-50 p-8 rounded-2xl shadow-md w-full max-w-md mx-4 border border-gray-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>



        {error.invalidcredentials && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error.invalidcredentials}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 ${
                error.email ? 'border-red-400' : 'border-gray-300'
              }`}
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
                  setError((prev) => ({ ...prev, password: '' }));
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 ${
                  error.password ? 'border-red-400' : 'border-gray-300'
                }`}
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
            } text-white focus:outline-none focus:ring-2 focus:ring-indigo-400`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-indigo-500 hover:text-indigo-400 underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;





