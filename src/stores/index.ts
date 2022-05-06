import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import questionReducer from './questions/questionSlice';
import answerReducer from './answers/answerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    answers: answerReducer,
  },
});
