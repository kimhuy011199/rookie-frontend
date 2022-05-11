import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import MarkdownRender from '../Markdown';
import { ReactComponent as Avatar } from '../../../assets/images/avatar.svg';
import { useSelector } from 'react-redux';
import ActionMenu from '../ActionMenu';
import { COMMENT_TYPE } from '../../constants/enums';
import CommentInput from '../CommentInput';
import Like from '../Like';

interface CommentInterface {
  type: number;
  data: any;
}

const Comment = (props: CommentInterface) => {
  const { type, data } = props;
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const { t } = useTranslation();
  const { user } = useSelector((state: any) => state.auth);

  const handleEditComment = () => {
    setOpenEdit(true);
  };

  const handleCloseEditComment = () => {
    setOpenEdit(false);
  };

  const renderTime = () => {
    const formatedDate = new Date(data?.createdAt).toLocaleTimeString('en-EN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    let action = '';
    switch (type) {
      case COMMENT_TYPE.QUESTION:
        action = 'questions.asked';
        break;
      case COMMENT_TYPE.COMMENT:
        action = 'questions.answered';
        break;
    }
    return ` ${t(action)} at ${formatedDate}`;
  };

  return (
    <div className={style.comment}>
      <div hidden={openEdit} className={style.img}>
        {data?.user?.avatarImg ? (
          <img
            src={data?.user?.avatarImg}
            alt={data?.user?.displayName}
            className={style.avatarImg}
          />
        ) : (
          <Avatar className={style.avatar} />
        )}
      </div>
      <div hidden={openEdit} className={style.main}>
        <div className={style.header}>
          <div className={style.info}>
            <span className={style.user}>{data?.user?.displayName}</span>
            <span className={style.date}>{renderTime()}</span>
          </div>
          {data?.userId === user.id && type !== COMMENT_TYPE.QUESTION && (
            <div className={style.action}>
              <ActionMenu data={data} onEdit={handleEditComment} />
            </div>
          )}
        </div>
        <div className={style.content}>
          <MarkdownRender content={data?.content} />
        </div>
        <div className={style.footer}>
          <div className={style.likes}>
            {type !== COMMENT_TYPE.QUESTION && (
              <Like
                id={data._id}
                isLiked={data?.userLikes && data?.userLikes[user.id]}
                likesCount={data?.likesCount}
              />
            )}
          </div>
          <div className={style.tags}></div>
        </div>
      </div>
      {openEdit && (
        <div className={style.edit}>
          <CommentInput
            data={data}
            type={COMMENT_TYPE.COMMENT}
            defaultValue={data.content}
            questionId={data.questionId}
            onClose={handleCloseEditComment}
          />
        </div>
      )}
    </div>
  );
};

export default Comment;
