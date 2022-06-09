import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getUserMe } from './stores/auth/authSlice';
import authStorageService from './core/authStorage.service';

import Header from './shared/layout/Header';
import Footer from './shared/layout/Footer';
import Home from './pages/home';
import Notification from './pages/notifications';
import UsersRoutes from './pages/users/users.routes';
import AuthRoutes from './pages/auth/auth.routes';
import QuestionsRoutes from './pages/questions/questions.routes';
import { SocketContext } from './shared/context/socket';
import { NOTI_ACTIONS } from './shared/constants/constants';
import NotificationDialog from './shared/components/Dialog/dialogs/notification';

export default function App() {
  const token = authStorageService().getToken();
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on(NOTI_ACTIONS.RECEIVE_NOTI, (data: any) => {
      const { type, action, destination } = data;
      toast(
        <NotificationDialog
          type={type}
          action={action}
          destination={destination}
        />,
        {
          autoClose: 10000,
          className: 'notification-toast',
          closeButton: true,
        }
      );
    });
  }, [socket]);

  useEffect(() => {
    if (token && !user?._id) {
      dispatch(getUserMe());
    }
  }, [user, dispatch, token]);

  useEffect(() => {
    if (user?._id) {
      socket.emit(NOTI_ACTIONS.JOIN_ROOM, user?._id.toString());
    }
  }, [user, token, socket]);

  return (
    <>
      <div className="page">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questions/*" element={<QuestionsRoutes />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/users/*" element={<UsersRoutes />} />
            <Route path="/notifications" element={<Notification />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
