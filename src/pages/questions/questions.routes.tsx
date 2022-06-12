import React from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './style.module.css';

import Questions from '.';
import AskQuestion from './ask';
import SingleQuestion from './single';
import EditQuestion from './edit';

const QuestionsRoutes = () => {
  return (
    <div className={style.questions}>
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/:id" element={<SingleQuestion />} />
        <Route path="/:id/edit" element={<EditQuestion />} />
      </Routes>
    </div>
  );
};

export default QuestionsRoutes;
