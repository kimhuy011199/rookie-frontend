import React from 'react';
import { User } from '../../constants/types/User';
import style from './style.module.css';
import { ReactComponent as DefaultAvatar } from '../../../assets/images/avatar.svg';

interface AvatarInterface {
  user: User;
}

const Avatar = (props: AvatarInterface) => {
  const { user } = props;

  return (
    <div className={style.img}>
      {user?.avatarImg ? (
        <img
          src={user?.avatarImg}
          alt={user?.displayName}
          className={style.avatarImg}
        />
      ) : (
        <DefaultAvatar className={style.avatar} />
      )}
    </div>
  );
};

export default Avatar;
