import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQuestionById } from '../../../stores/questions/questionSlice';
import style from './style.module.css';
import MarkdownRender from '../../../shared/components/Markdown';
import Spinner from '../../../shared/components/Spinner';
import Error from '../../../shared/components/Error';
import { ERROR_CODE } from '../../../shared/constants/enums';

const SingleQuestion = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { question, isLoading, isError, message } = useSelector(
    (state: any) => state.questions
  );

  useEffect(() => {
    if (id) {
      dispatch(getQuestionById(id));
    }
  }, [id, dispatch]);

  return (
    <>
      <Spinner isLoading={isLoading} />
      <Error
        show={isError && message?.errorCode === 404}
        code={ERROR_CODE.NOT_FOUND}
      />
      {question && (
        <div className={style.content}>
          <h2 className={style.title}>{question.title}</h2>
          <MarkdownRender content={question.content} />
        </div>
      )}
    </>
  );
};

export default SingleQuestion;
