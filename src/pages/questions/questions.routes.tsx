import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Questions from '.';

const DashboardRoutes = () => {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // !user && navigate('/auth/login');
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Questions />} />
    </Routes>
  );
};

export default DashboardRoutes;
