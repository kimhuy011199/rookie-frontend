import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthRoutes from './pages/auth/auth.routes';
import QuestionsRoutes from './pages/questions/questions.routes';
import Home from './pages/home';
import Footer from './shared/layout/Footer';
import Header from './shared/layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getUserMe } from './stores/auth/authSlice';
import authStorageService from './core/authStorage.service';

export default function App() {
  const token = authStorageService().getToken();
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !user?._id) {
      dispatch(getUserMe());
    }
  }, [user, dispatch, token]);

  return (
    <>
      <div className="page">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questions/*" element={<QuestionsRoutes />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
