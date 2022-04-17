import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import questionReducer from './questions/questionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
  },
});
