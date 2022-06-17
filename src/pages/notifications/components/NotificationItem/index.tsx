import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getWordsFromContent } from '../../../../core/utils';
import Avatar from '../../../../shared/components/Avatar';
import { NOTI_TYPE } from '../../../../shared/constants/enums';
import style from './style.module.css';

interface NotificationItemInterface {
  item?: any;
}

const NotificationItem = (props: NotificationItemInterface) => {
  const { item } = props;
  const { t } = useTranslation();
  const content =
    item.type === NOTI_TYPE.ANSWER_QUESTION
      ? t('dialog.answer_question')
      : t('dialog.like_answer');
  const questionTitle = getWordsFromContent(item.question.title, 12);

  if (!item) {
    return <></>;
  }

  return (
    <>
      <Link className={style.container} to={`/questions/${item.questionId}`}>
        <div className={style.avatar}>
          <Avatar user={item.action} />
        </div>
        <div className={style.content}>
          <span className={style.name}>{item.action.displayName} </span>
          <span>{content} </span>
          <span className={style.title}>{questionTitle}</span>
        </div>
      </Link>
    </>
  );
};

export default NotificationItem;
