import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadAction } from './uploadAction';
import uploadService from './uploadService';

export interface AvatarImgInterface {
  data: string | ArrayBuffer;
}

const initialState = {
  data: null,
  isError: '',
  isSuccess: '',
  isLoading: false,
  message: '',
};

// Upload image to cloudinary
export const uploadImg = createAsyncThunk(
  uploadAction.UPLOAD_IMG,
  async (imgData: AvatarImgInterface, thunkAPI) => {
    try {
      const data = await uploadService.uploadImg(imgData);
      return data;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = uploadAction.UPLOAD_IMG;
        state.data = action.payload;
      })
      .addCase(uploadImg.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = uploadAction.UPLOAD_IMG;
        state.message = action.payload;
      });
  },
});

export const { reset } = uploadSlice.actions;
export default uploadSlice.reducer;
