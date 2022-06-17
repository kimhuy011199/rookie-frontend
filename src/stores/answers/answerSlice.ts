import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Answer } from '../../shared/constants/types/Answer';
import { answerAction } from './answerAction';
import answerService from './answerService';

export interface AnswerInputInterface {
  content: string;
  questionId: string;
}

const initialState = {
  answers: [] as Answer[],
  answer: null,
  isError: '',
  isSuccess: '',
  isLoading: false,
  message: '',
};

// Create new answer
export const createAnswer = createAsyncThunk(
  answerAction.CREATE_ANSWER,
  async (answerData: AnswerInputInterface, thunkAPI) => {
    try {
      const data = await answerService.createAnswer(answerData);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw new Error('No internet connection');
      }
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all answers by question id
export const getAnswers = createAsyncThunk(
  answerAction.GET_ALL_ANSWERS,
  async (questionId: string, thunkAPI) => {
    try {
      return await answerService.getAnswers(questionId);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user answer
export const updateAnswer = createAsyncThunk(
  answerAction.UPDATE_ANSWER,
  async (data: any, thunkAPI) => {
    try {
      return await answerService.updateAnswer(data.id, data.updatedData);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user answer
export const deleteAnswer = createAsyncThunk(
  answerAction.DELETE_ANSWER,
  async (id: string, thunkAPI) => {
    try {
      return await answerService.deleteAnswer(id);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Like or unlike answer
export const likeOrUnlikeAnswer = createAsyncThunk(
  answerAction.LIKE_UNLIKE_ANSWER,
  async (answerid: string, thunkAPI) => {
    try {
      return await answerService.likeOrUnlikeAnswer(answerid);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnswer.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = answerAction.CREATE_ANSWER;
        state.answers = [...state.answers, action.payload];
      })
      .addCase(createAnswer.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = answerAction.CREATE_ANSWER;
        state.message = action.payload;
      })
      .addCase(getAnswers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnswers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = answerAction.GET_ALL_ANSWERS;
        state.answers = action.payload;
      })
      .addCase(getAnswers.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = answerAction.GET_ALL_ANSWERS;
        state.message = action.payload;
      })
      .addCase(updateAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAnswer.fulfilled, (state, action) => {
        const answerIndex = state.answers.findIndex(
          (answer: Answer) => answer._id === action.payload._id
        );
        if (answerIndex !== -1) {
          const updatedAnswer = {
            ...action.payload,
            user: state.answers[answerIndex].user,
          };
          const updatedAnswers = state.answers.map((answer: Answer) =>
            answer._id === action.payload._id ? updatedAnswer : answer
          );
          state.answers = updatedAnswers;
        }
        state.isLoading = false;
        state.isSuccess = answerAction.UPDATE_ANSWER;
      })
      .addCase(updateAnswer.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = answerAction.UPDATE_ANSWER;
        state.message = action.payload;
      })
      .addCase(deleteAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAnswer.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = answerAction.DELETE_ANSWER;
        state.answers = state.answers.filter(
          (answer: Answer) => answer._id !== action.payload.id
        );
      })
      .addCase(deleteAnswer.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = answerAction.DELETE_ANSWER;
        state.message = action.payload;
      })
      .addCase(likeOrUnlikeAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeOrUnlikeAnswer.fulfilled, (state, action) => {
        const answerIndex = state.answers.findIndex(
          (answer: Answer) => answer._id === action.payload._id
        );
        if (answerIndex !== -1) {
          const updatedAnswer = {
            ...action.payload,
            user: state.answers[answerIndex].user,
          };
          const updatedAnswers = state.answers.map((answer: Answer) =>
            answer._id === action.payload._id ? updatedAnswer : answer
          );
          state.answers = updatedAnswers;
        }
        state.isLoading = false;
        state.isSuccess = answerAction.LIKE_UNLIKE_ANSWER;
      })
      .addCase(likeOrUnlikeAnswer.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = answerAction.LIKE_UNLIKE_ANSWER;
        state.message = action.payload;
      });
  },
});

export const { reset } = answerSlice.actions;
export default answerSlice.reducer;
