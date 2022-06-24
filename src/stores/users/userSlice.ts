import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userType } from './userType';
import userService from './userService';

const initialState = {
  user: null,
  isError: '',
  isSuccess: '',
  isLoading: false,
  message: '',
};

// Get user by id
export const getUserById = createAsyncThunk(
  `user/${userType.GET_USER_BY_ID}`,
  async (id: string, thunkAPI) => {
    try {
      return await userService.getUserById(id);
    } catch (error: any) {
      const errorCode = error?.response?.status;
      const message = error?.response?.data?.message;
      const errorResponse = { errorCode, message };
      return thunkAPI.rejectWithValue(errorResponse);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
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
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = userType.GET_USER_BY_ID;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = userType.GET_USER_BY_ID;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
