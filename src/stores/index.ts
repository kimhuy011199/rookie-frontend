import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import questionReducer from './questions/questionSlice';
import answerReducer from './answers/answerSlice';
import uploadReducer from './uploads/uploadSlice';
import notificationReducer from './notifications/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    answers: answerReducer,
    upload: uploadReducer,
    notifications: notificationReducer,
  },
});
