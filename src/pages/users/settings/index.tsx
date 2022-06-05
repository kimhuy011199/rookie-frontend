import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadAvatar from '../../../shared/components/UploadAvatar';

const UserSetting = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  console.log(user);

  return (
    <div>
      <UploadAvatar />
    </div>
  );
};

export default UserSetting;
