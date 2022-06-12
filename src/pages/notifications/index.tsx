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
import { useTranslation } from 'react-i18next';

function Questions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
      <div className={style.container}>
        <h2 className={style.heading}>{t('notifications.heading')}</h2>
        {notifications &&
          (notifications.length > 0 ? (
            <>
              <div className={style.notifications}>
                <ul className={style.notificationsList}>
                  {notifications?.map((notification: Notification) => (
                    <li className={style.item} key={notification._id}>
                      <NotificationItem notification={notification} />
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p className={style.noNotifications}>
              {t('notifications.no_notifications')}
            </p>
          ))}
      </div>
    </>
  );
}

export default Questions;
