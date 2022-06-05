import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeOrUnlikeAnswer } from '../../../stores/answers/answerSlice';
import style from './style.module.css';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { NOTI_TYPE } from '../../constants/enums';
import { SocketContext } from '../../context/socket';
import { sendSocketNotification } from '../../../core/utils';

interface LikeInterface {
  id: string;
  isLiked: boolean;
  likesCount: number;
  answerData: any;
}

const Like = (props: LikeInterface) => {
  const { id, isLiked, likesCount, answerData } = props;
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { question } = useSelector((state: any) => state.questions);
  const socket = useContext(SocketContext);

  const handleLike = () => {
    dispatch(likeOrUnlikeAnswer(id));
    if (!isLiked) {
      const { userId, content } = answerData;
      const destination = {
        userId,
        title: content,
        url: question._id,
      };
      sendSocketNotification(socket, destination, user, NOTI_TYPE.LIKE_ANSWER);
    }
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
