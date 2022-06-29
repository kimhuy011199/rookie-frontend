import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../shared/components/Spinner';
import {
  getNotificationsByUserId,
  reset,
} from '../../stores/notifications/notificationSlice';
import style from './style.module.css';
import NotificationItem from './components/NotificationItem';
import { useTranslation } from 'react-i18next';
import { ERROR_CODE } from '../../shared/constants/enums';
import Error from '../../shared/components/Error';
import List from '../../shared/components/List';

function Questions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { notifications, isLoading } = useSelector(
    (state: any) => state.notifications
  );
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getNotificationsByUserId(user._id));
    }

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, user]);

  if (!user) {
    return <Error code={ERROR_CODE.UNAUTHENTICATED} />;
  }

  return (
    <>
      <Spinner isLoading={isLoading} />
      <div className={style.container}>
        <List
          data={notifications}
          heading={t('notifications.heading')}
          emptyListContent={t('notifications.no_notifications')}
        >
          <NotificationItem />
        </List>
      </div>
    </>
  );
}

export default Questions;
