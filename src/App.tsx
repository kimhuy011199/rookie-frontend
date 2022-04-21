import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthRoutes from './pages/auth/auth.routes';
import QuestionsRoutes from './pages/questions/questions.routes';
import Home from './pages/home';
import Footer from './shared/layout/Footer';
import Header from './shared/layout/Header';

export default function App() {
  return (
    <div className="page">
      <Header />
      <main className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions/*" element={<QuestionsRoutes />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
