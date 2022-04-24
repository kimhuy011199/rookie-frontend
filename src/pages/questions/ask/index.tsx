import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createQuestion } from '../../../stores/questions/questionSlice';
import QuestionForm from '../../../shared/components/QuestionForm';
import style from './style.module.css';

const AskQuestion = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { question, isSuccess } = useSelector((state: any) => state.questions);

  const submitForm = (data: any) => {
    dispatch(createQuestion(data));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/questions/${question._id}`);
    }
  }, [isSuccess, navigate, question]);

  return (
    <>
      <h2 className={style.heading}>{t('questions.ask_question_title')}</h2>
      <div className={style.container}>
        <div className={style.form}>
          <QuestionForm submitFunc={submitForm} />
        </div>
        <div className={style.suggestion}></div>
      </div>
    </>
  );
};

export default AskQuestion;
