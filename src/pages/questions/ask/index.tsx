import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createQuestion } from '../../../stores/questions/questionSlice';
import QuestionForm from '../../../shared/components/QuestionForm';
import style from './style.module.css';
import { MARKDOWN_LINK } from '../../../shared/constants/constants';

const AskQuestion = () => {
  const { t } = useTranslation();
  const tips: [] = t('questions.guide.tips', { returnObjects: true });

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
        <div className={style.guide}>
          <h3 className={style.title}>{t('questions.guide.title')}</h3>
          <div className={style.content}>
            <p>{t('questions.guide.desc')}</p>
            <ul className={style.list}>
              {tips.map((item) => (
                <li className={style.item} key={item}>
                  {item}
                </li>
              ))}
            </ul>
            <p>
              {t('questions.guide.markdown')}
              <a
                className={style.link}
                href={MARKDOWN_LINK}
                target="_blank"
                rel="noreferrer"
              >
                {t('questions.guide.link')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;
