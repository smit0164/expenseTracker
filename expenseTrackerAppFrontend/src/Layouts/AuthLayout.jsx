import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

const AuthLayout = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }else if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [token, navigate,location.pathname]);

  return (
    <>
      {token && <Outlet />}
    </>
  );
};

export default AuthLayout;
