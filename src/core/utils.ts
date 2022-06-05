import { NOTI_ACTIONS } from '../shared/constants/constants';
import { User } from '../shared/constants/types/User';

export const generatePageRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const sendSocketNotification = (
  socket: any,
  destination: any,
  user: User,
  type: number
) => {
  const { displayName, avatarImg } = user;
  const action = {
    displayName,
    avatarImg,
  };
  socket.emit(NOTI_ACTIONS.SEND_NOTI, { type, action, destination });
};

export const generateNotificationTitle = (title: string, length: number) => {
  const titleArr = title.split(' ');
  return titleArr.length > length
    ? titleArr.splice(0, length).join(' ') + ' ...'
    : title;
};
