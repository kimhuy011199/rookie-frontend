import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import style from './style.module.css';

import Questions from '.';
import AskQuestion from './ask';
import SingleQuestion from './single';

const QuestionsRoutes = () => {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate('/auth/login');
  }, [user, navigate]);

  return (
    <div className={style.questions}>
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/:id" element={<SingleQuestion />} />
      </Routes>
    </div>
  );
};

export default QuestionsRoutes;
