import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getWordsFromContent } from '../../../../../core/utils';
import { COMMENT_TYPE, NOTI_TYPE } from '../../../../constants/enums';
import Avatar from '../../../Avatar';
import style from './style.module.css';

interface NotificationDialogInterface {
  userId: string;
  action: {
    actionId: string;
    displayName: string;
    avatarImg?: string;
  };
  question: {
    questionId: string;
    title: string;
  };
  type: number;
}

const NotificationDialog = (props: NotificationDialogInterface) => {
  const { action, question, type = COMMENT_TYPE.QUESTION } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const handleNavigate = () => {
    if (pathname.includes(question.questionId)) {
      navigate(0);
    } else {
      navigate(`/questions/${question.questionId}`);
    }
  };

  const content =
    type === NOTI_TYPE.ANSWER_QUESTION
      ? t('dialog.answer_question')
      : t('dialog.like_answer');
  const questionTitle = getWordsFromContent(question.title, 10);

  return (
    <button className={style.container} onClick={handleNavigate}>
      <div className={style.avatar}>
        <Avatar user={action} />
      </div>
      <div className={style.content}>
        <span className={style.name}>{action.displayName} </span>
        <span>{content} </span>
        <span className={style.title}>{questionTitle}</span>
      </div>
    </button>
  );
};

export default NotificationDialog;
