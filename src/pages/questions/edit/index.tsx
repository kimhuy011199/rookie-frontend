import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getQuestionById,
  updateQuestion,
} from '../../../stores/questions/questionSlice';
import style from './style.module.css';
import Spinner from '../../../shared/components/Spinner';
import NotFound from '../../../shared/components/NotFound';
import QuestionForm from '../../../shared/components/QuestionForm';
import { useTranslation } from 'react-i18next';

const EditQuestion = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { question, isLoading, isError, message } = useSelector(
    (state: any) => state.questions
  );
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getQuestionById(id));
    }
  }, [id, dispatch]);

  const submitForm = (data: any) => {
    dispatch(updateQuestion({ id: question._id, updatedData: data }));
  };

  if (question?.user && question.user !== user.id) {
    return null;
  }

  return (
    <>
      <Spinner isLoading={isLoading} />
      <NotFound isNotFound={isError && message?.errorCode === 404} />
      {question && (
        <>
          <h2 className={style.heading}>{t('questions.ask_question_title')}</h2>
          <div className={style.container}>
            <div className={style.form}>
              <QuestionForm
                submitFunc={submitForm}
                title={question.title}
                tags={question.tags}
                content={question.content}
              />
            </div>
            <div className={style.suggestion}></div>
          </div>
        </>
      )}
    </>
  );
};

export default EditQuestion;
