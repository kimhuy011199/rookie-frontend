import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authStorageService from '../../core/authStorage.service';
import { authAction } from './authAction';
import authService from './authService';

export interface LoginUserInterface {
  email: string;
  password: string;
}

export interface RegisterUserInterface {
  displayName: string;
  email: string;
  password: string;
}

// Get user from localStorage
const token = authStorageService().getToken();
const user = authStorageService().getUserInfo();

const initialState = {
  user: user,
  isError: '',
  isSuccess: '',
  isLoading: false,
  message: '',
};

// Register user
export const register = createAsyncThunk(
  authAction.REGISTER,
  async (user: RegisterUserInterface, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  authAction.LOGIN,
  async (user: LoginUserInterface, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get current user
export const getUserMe = createAsyncThunk(
  authAction.GET_USER_ME,
  async (_, thunkAPI) => {
    try {
      return await authService.getUserMe();
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout
export const logout = createAsyncThunk(authAction.LOGOUT, async () => {
  await authService.logout();
});

// Update user
export const updateUser = createAsyncThunk(
  authAction.UPDATE_USER,
  async (updatedUserData: any, thunkAPI) => {
    try {
      return await authService.updateUser(updatedUserData);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Change password
export const changePassword = createAsyncThunk(
  authAction.CHANGE_PASSWORD,
  async (updatedUserData: any, thunkAPI) => {
    try {
      return await authService.changePassword(updatedUserData);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = authAction.REGISTER;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = authAction.REGISTER;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = authAction.LOGIN;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = authAction.LOGIN;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(getUserMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = authAction.GET_USER_ME;
        state.user = { token, ...action.payload };
      })
      .addCase(getUserMe.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = authAction.GET_USER_ME;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = authAction.UPDATE_USER;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = authAction.UPDATE_USER;
        state.message = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = authAction.CHANGE_PASSWORD;
        state.user = action.payload;
      })
      .addCase(changePassword.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = authAction.CHANGE_PASSWORD;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
