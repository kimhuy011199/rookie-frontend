import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Notification } from '../../shared/constants/types/Notification';
import { notificationType } from './notificationType';
import notificationService from './notificationService';

const initialState = {
  notifications: [] as Notification[],
  isError: '',
  isSuccess: '',
  isLoading: false,
  message: '',
};

// Create new notification
export const createNotification = createAsyncThunk(
  `notification/${notificationType.CREATE_NOTIFICATION}`,
  async (notificationData: any, thunkAPI) => {
    try {
      return await notificationService.createNotification(notificationData);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all notifications
export const getNotifications = createAsyncThunk(
  `notification/${notificationType.GET_NOTIFICATIONS}`,
  async (userId: string, thunkAPI) => {
    try {
      return await notificationService.getNotifications(userId);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = '';
      state.isError = '';
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNotification.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = notificationType.CREATE_NOTIFICATION;
      })
      .addCase(createNotification.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = notificationType.CREATE_NOTIFICATION;
        state.message = action.payload;
      })
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = notificationType.GET_NOTIFICATIONS;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = notificationType.GET_NOTIFICATIONS;
        state.message = action.payload;
      });
  },
});

export const { reset } = notificationSlice.actions;
export default notificationSlice.reducer;
