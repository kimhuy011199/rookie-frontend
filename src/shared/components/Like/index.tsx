import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeOrUnlikeAnswer } from '../../../stores/answers/answerSlice';
import style from './style.module.css';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { NOTI_TYPE } from '../../constants/enums';
import { SocketContext } from '../../context/socket';
import { NOTI_ACTIONS } from '../../constants/constants';

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

  const sendNotification = () => {
    const { userId, content } = answerData;
    const { displayName, avatarImg } = user;
    const type = NOTI_TYPE.LIKE_ANSWER;
    const action = {
      displayName,
      avatarImg,
    };
    const destination = {
      userId,
      title: content,
      url: question._id,
    };
    console.log({ type, action, destination });
    socket.emit(NOTI_ACTIONS.SEND_NOTI, { type, action, destination });
  };

  const handleLike = () => {
    dispatch(likeOrUnlikeAnswer(id));
    sendNotification();
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
