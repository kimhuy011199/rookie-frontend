import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Question } from '../../shared/constants/types/Question';
import questionService from './questionService';

export interface QuestionInputInterface {
  title: string;
  content: string;
}

const initialState = {
  questions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new question
export const createQuestion = createAsyncThunk(
  'questions/create',
  async (questionData: QuestionInputInterface, thunkAPI) => {
    try {
      return await questionService.createQuestion(questionData);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all questions
export const getQuestions = createAsyncThunk(
  'questions/getAll',
  async (_, thunkAPI) => {
    try {
      return await questionService.getQuestions();
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user question
export const deleteQuestion = createAsyncThunk(
  'questions/delete',
  async (id: string, thunkAPI) => {
    try {
      return await questionService.deleteQuestion(id);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuestion.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.questions.push(action.payload);
      })
      .addCase(createQuestion.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.questions = action.payload;
      })
      .addCase(getQuestions.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuestion.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.questions = state.questions.filter(
          (question: Question) => question._id !== action.payload.id
        );
      })
      .addCase(deleteQuestion.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = questionSlice.actions;
export default questionSlice.reducer;
