import React from 'react';
import { Link } from 'react-router-dom';
import { formatMonthDateYear } from '../../../core/utils';
import { Question } from '../../constants/types/Question';
import style from './style.module.css';

interface QuestionItemInterface {
  question: Question;
}

const QuestionItem = (props: QuestionItemInterface) => {
  const { question } = props;
  console.log({ question });
  const footer = `by ${
    question.user.displayName
  }, created on ${formatMonthDateYear(question.createdAt)}`;
  const linkTo = `/questions/${question._id}`;

  return (
    <div className={style.main}>
      <Link className={style.link} to={linkTo}>
        <h3 className={style.title}>{question.title}</h3>
        <p className={style.content}>{question.content}</p>
        <span className={style.footer}>{footer}</span>
      </Link>
    </div>
  );
};

export default QuestionItem;
