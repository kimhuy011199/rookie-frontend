import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQuestionById } from '../../../stores/questions/questionSlice';
import style from './style.module.css';
import MarkdownRender from '../../../shared/components/Markdown';
import Spinner from '../../../shared/components/Spinner';

const SingleQuestion = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { question, isLoading, isError } = useSelector(
    (state: any) => state.questions
  );

  useEffect(() => {
    if (id) {
      dispatch(getQuestionById(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {question && (
        <div className={style.content}>
          <MarkdownRender content={question.content} htmlCode />
        </div>
      )}
    </>
  );
};

export default SingleQuestion;
