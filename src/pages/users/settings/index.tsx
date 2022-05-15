import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserSetting = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  console.log(user);

  return <div>UserSetting</div>;
};

export default UserSetting;
