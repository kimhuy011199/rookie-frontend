import React from 'react';
import { Link } from 'react-router-dom';
import { Question } from '../../constants/types/Question';
import style from './style.module.css';

interface QuestionItemInterface {
  question: Question;
}

const QuestionItem = (props: QuestionItemInterface) => {
  const { question } = props;
  console.log(question);
  const linkTo = `/questions/${question._id}`;

  return (
    <div className={style.container}>
      <Link className={style.link} to={linkTo}>
        <h3 className={style.title}>{question.title}</h3>
        <p className={style.content}>{question.content}</p>
      </Link>
    </div>
  );
};

export default QuestionItem;
