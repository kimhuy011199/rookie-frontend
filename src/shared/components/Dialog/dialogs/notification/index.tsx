import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { COMMENT_TYPE, NOTI_TYPE } from '../../../../constants/enums';
import style from './style.module.css';

interface NotificationDialogInterface {
  type: number;
  action: {
    userId: string;
    displayName: string;
    avatarImg?: string;
  };
  destination: {
    title: string;
    url: string;
  };
}

const NotificationDialog = (props: NotificationDialogInterface) => {
  const { action, destination, type = COMMENT_TYPE.QUESTION } = props;
  console.log({ props });

  const { t } = useTranslation();
  const linkTo = `/questions/${destination.url}`;
  const content =
    type === NOTI_TYPE.ANSWER_QUESTION
      ? t('dialog.answer_question')
      : t('dialog.like_answer');

  return (
    <Link className={style.container} to={linkTo}>
      <div>Avatar</div>
      <div className={style.content}>
        <span className={style.name}>{action.displayName} </span>
        <span>{content} </span>
        <span className={style.title}>{destination.title}</span>
      </div>
    </Link>
  );
};

export default NotificationDialog;
