import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getQuestionById,
  reset as resetQuestion,
} from '../../../stores/questions/questionSlice';
import style from './style.module.css';
import Spinner from '../../../shared/components/Spinner';
import Error from '../../../shared/components/Error';
import { COMMENT_TYPE, ERROR_CODE } from '../../../shared/constants/enums';
import Comment from '../../../shared/components/Comment';
import CommentInput from '../../../shared/components/CommentInput';
import {
  getAnswersByQuestionId,
  reset,
} from '../../../stores/answers/answerSlice';
import { Answer } from '../../../shared/constants/types/Answer';
import RecommendQuestion from '../../../shared/components/RecommendQuestion';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { questionType } from '../../../stores/questions/questionType';
import { answerType } from '../../../stores/answers/answerType';
import FilterButtons from '../../../shared/components/FilterButtons';

const SingleQuestion = () => {
  const { id = '' } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { question, isLoading, isError, message } = useSelector(
    (state: any) => state.questions
  );
  const {
    answers,
    isAnswersLoading,
    isSuccess: isAnswerSuccess,
    isError: isAnswerError,
  } = useSelector((state: any) => state.answers);

  useEffect(() => {
    if (id) {
      dispatch(getQuestionById(id));
      dispatch(getAnswersByQuestionId(id));
    }

    return () => {
      reset();
      resetQuestion();
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (isError === questionType.GET_QUESTION_BY_ID) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  useEffect(() => {
    if (isAnswerSuccess === answerType.DELETE_ANSWER) {
      toast(t('toast.delete_answer_success'));
    }
    if (isAnswerError === answerType.DELETE_ANSWER) {
      toast(t('toast.unsuccess'));
    }

    return () => {
      dispatch(reset());
    };
  }, [isAnswerError, isAnswerSuccess, t, dispatch]);

  return (
    <>
      <Spinner isLoading={isLoading || isAnswersLoading} />
      <Error
        show={isError && message?.errorCode === 404}
        code={ERROR_CODE.NOT_FOUND}
      />
      {question?._id && question?._id === id && (
        <>
          <div className={style.container}>
            <div className={style.main}>
              <h2 className={style.heading}>{question.title}</h2>
              <div className={style.question}>
                <Comment type={COMMENT_TYPE.QUESTION} data={question} />
              </div>
              <FilterButtons />
              {answers.length > 0 && (
                <ul className={style.answers}>
                  {answers.map((answer: Answer) => (
                    <li key={answer._id}>
                      <Comment type={COMMENT_TYPE.COMMENT} data={answer} />
                    </li>
                  ))}
                </ul>
              )}
              <div className={style.comment}>
                <CommentInput type={COMMENT_TYPE.COMMENT} questionId={id} />
              </div>
            </div>
            <div className={style.recommandation}>
              <RecommendQuestion questionId={id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleQuestion;
