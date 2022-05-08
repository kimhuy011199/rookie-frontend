import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import MarkdownRender from '../Markdown';
import { ReactComponent as Avatar } from '../../../assets/images/avatar.svg';
import { useSelector } from 'react-redux';
import ActionMenu from '../ActionMenu';
import { COMMENT_TYPE } from '../../constants/enums';

interface CommentInterface {
  type: number;
  data: any;
}

const Comment = (props: CommentInterface) => {
  const { type, data } = props;
  const { t } = useTranslation();
  const { user } = useSelector((state: any) => state.auth);

  const renderTime = () => {
    const formatedDate = new Date(data?.createdAt).toLocaleTimeString('en-EN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return ` ${t('questions.asked')} at ${formatedDate}`;
  };

  useEffect(() => {}, []);

  return (
    <div className={style.comment}>
      <div className={style.img}>
        {data?.img ? (
          <img src={data?.img} alt={data?.displayName} />
        ) : (
          <Avatar className={style.avatar} />
        )}
      </div>
      <div className={style.main}>
        <div className={style.header}>
          <div className={style.info}>
            <span className={style.user}>{'displayName'}</span>
            <span className={style.date}>{renderTime()}</span>
          </div>
          {data?.user === user.id && type !== COMMENT_TYPE.QUESTION && (
            <div className={style.action}>
              <ActionMenu data={data} />
            </div>
          )}
        </div>
        <div className={style.content}>
          <MarkdownRender content={data?.content} />
        </div>
        <div className={style.footer}>
          <div className={style.like}></div>
          <div className={style.tags}></div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
