import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQuestionById } from '../../../stores/questions/questionSlice';
import style from './style.module.css';
import Spinner from '../../../shared/components/Spinner';
import Error from '../../../shared/components/Error';
import { COMMENT_TYPE, ERROR_CODE } from '../../../shared/constants/enums';
import Comment from '../../../shared/components/Comment';

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
        <>
          <div className={style.container}>
            <div className={style.main}>
              <h2 className={style.heading}>{question.title}</h2>
              <div className={style.question}>
                <Comment type={COMMENT_TYPE.QUESTION} data={question} />
              </div>
              <div className={style.answers}></div>
            </div>
            <div className={style.suggestion}></div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleQuestion;
