import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import style from './style.module.css';

import SingleUser from './single';
import UserSetting from './settings';
import ChangePassword from './password';

const UsersRoutes = () => {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate('/auth/login');
  }, [user, navigate]);

  return (
    <div className={style.users}>
      <Routes>
        <Route path="/settings" element={<UserSetting />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/:id" element={<SingleUser />} />
      </Routes>
    </div>
  );
};

export default UsersRoutes;
