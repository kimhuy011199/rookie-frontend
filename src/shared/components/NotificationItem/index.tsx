import React from 'react';
import { Notification } from '../../../shared/constants/types/Notification';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = (props: NotificationItemProps) => {
  const { notification } = props;
  return <div>NotificationItem</div>;
};

export default NotificationItem;
