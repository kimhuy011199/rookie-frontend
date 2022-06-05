import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Notification } from '../../shared/constants/types/Notification';
import notificationService from './notificationService';

const initialState = {
  notifications: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new notification
export const createNotification = createAsyncThunk(
  'notifications/create',
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
  'notifications/getAll',
  async (userId: string, thunkAPI) => {
    try {
      return await notificationService.getNotifications(userId);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const notificationSlie = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNotification.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications.push(action.payload);
      })
      .addCase(createNotification.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = notificationSlie.actions;
export default notificationSlie.reducer;
