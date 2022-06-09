import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../shared/components/Spinner';
import { Notification } from '../../shared/constants/types/Notification';
import {
  getNotifications,
  reset,
} from '../../stores/notifications/notificationSlice';
import style from './style.module.css';
import NotificationItem from '../../shared/components/NotificationItem';

function Questions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { notifications, isLoading } = useSelector(
    (state: any) => state.notifications
  );
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(getNotifications(user._id));

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, user]);

  if (!user) return null;

  return (
    <>
      <Spinner isLoading={isLoading} />
      {notifications &&
        (notifications.length > 0 ? (
          <>
            <h2 className={style.heading}>Notifications page</h2>
            <p className={style.desc}></p>
            <div className={style.notifications}>
              <ul className={style.notificationsList}>
                {notifications?.map((notification: Notification) => (
                  <li key={notification._id}>
                    <NotificationItem notification={notification} />
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>No notifications</p>
        ))}
    </>
  );
}

export default Questions;
