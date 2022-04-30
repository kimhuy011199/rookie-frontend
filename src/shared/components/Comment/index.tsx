import React from 'react';
import style from './style.module.css';

interface CommentInterface {
  type: number;
  data: any;
}

const Comment = (props: CommentInterface) => {
  const { type, data } = props;
  return (
    <div className={style.comment}>
      <img src={data?.img} alt={data?.displayName} className={style.avatar} />
      <div className={style.main}>
        <div className={style.header}>
          <div className={style.user}>
            <span className={style.name}></span>
            <span className={style.date}></span>
            <button></button>
          </div>
        </div>
        <div className={style.content}></div>
        <div className={style.footer}>
          <div className={style.like}></div>
          <div className={style.tags}></div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
