import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const GuestLayout = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("first")
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <>
      {!token && <Outlet />}
    </>
  );
}

export default GuestLayout;
