import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getWordsFromContent } from '../../../core/utils';
import { Notification } from '../../../shared/constants/types/Notification';
import { NOTI_TYPE } from '../../constants/enums';
import Avatar from '../Avatar';
import style from './style.module.css';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = (props: NotificationItemProps) => {
  const { notification } = props;
  const { t } = useTranslation();

  const content =
    notification.type === NOTI_TYPE.ANSWER_QUESTION
      ? t('dialog.answer_question')
      : t('dialog.like_answer');
  const questionTitle = getWordsFromContent(notification.question.title, 12);

  return (
    <Link
      className={style.container}
      to={`/questions/${notification.questionId}`}
    >
      <div className={style.avatar}>
        <Avatar user={notification.action} />
      </div>
      <div className={style.content}>
        <span className={style.name}>{notification.action.displayName} </span>
        <span>{content} </span>
        <span className={style.title}>{questionTitle}</span>
      </div>
    </Link>
  );
};

export default NotificationItem;
