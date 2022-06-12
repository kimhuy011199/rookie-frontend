import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecommendQuestions } from '../../../stores/questions/questionSlice';
import { Question } from '../../constants/types/Question';
import style from './style.module.css';

interface RecommendQuestionInterface {
  questionId: string;
}

const RecommendQuestion = (props: RecommendQuestionInterface) => {
  const { questionId } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const generateLink = (id: string) => `/questions/${id}`;

  const { recommend } = useSelector((state: any) => state.questions);

  useEffect(() => {
    if (questionId) {
      dispatch(getRecommendQuestions(questionId));
    }
  }, [questionId, dispatch]);

  return (
    <div className={style.container}>
      <h3 className={style.heading}>{t('questions.recommendation')}</h3>
      {recommend.length > 0 ? (
        <ul className={style.list}>
          {recommend.map((item: Question) => (
            <li key={item._id} className={style.item}>
              <div className={style.question}>
                <Link className={style.link} to={generateLink(item._id)}>
                  <h3 className={style.title}>{item.title}</h3>
                  <p className={style.content}>{item.content}</p>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h4 className={style.noRecommend}>
          {t('questions.no_recommendation')}
        </h4>
      )}
    </div>
  );
};

export default RecommendQuestion;
