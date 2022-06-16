import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Tag } from '../../shared/constants/types/Tag';
import tagService from './tagService';

const initialState = {
  tags: [] as Tag[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all tags
export const getTags = createAsyncThunk('tags/getAll', async (_, thunkAPI) => {
  try {
    return await tagService.getTags();
  } catch (error: any) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tags = action.payload;
      })
      .addCase(getTags.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = tagSlice.actions;
export default tagSlice.reducer;
