import React from 'react';
import { useDispatch } from 'react-redux';
import { likeOrUnlikeAnswer } from '../../../stores/answers/answerSlice';
import style from './style.module.css';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';

interface LikeInterface {
  id: string;
  isLiked: boolean;
  likesCount: number;
}

const Like = (props: LikeInterface) => {
  const { id, isLiked, likesCount } = props;
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeOrUnlikeAnswer(id));
  };

  return (
    <>
      <button className={style.btn} onClick={handleLike}>
        {isLiked ? (
          <HiHeart className={style.icon} />
        ) : (
          <HiOutlineHeart className={style.icon} />
        )}
        <span className={style.text}>{likesCount}</span>
      </button>
    </>
  );
};

export default Like;
