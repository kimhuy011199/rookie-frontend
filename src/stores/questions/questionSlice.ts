import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Question } from '../../shared/constants/types/Question';
import questionService from './questionService';

export interface QuestionInputInterface {
  title: string;
  content: string;
  tags?: string[];
}

const initialState = {
  questions: {},
  question: null,
  recommend: [],
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
  async (queryString: string, thunkAPI) => {
    try {
      return await questionService.getQuestions(queryString);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get question by id
export const getQuestionById = createAsyncThunk(
  'questions/getById',
  async (id: string, thunkAPI) => {
    try {
      return await questionService.getQuestionById(id);
    } catch (error: any) {
      const errorCode = error?.response?.status;
      const message = error?.response?.data?.message;
      const errorResponse = { errorCode, message };
      return thunkAPI.rejectWithValue(errorResponse);
    }
  }
);

// Get recommend questions by question id
export const getRecommendQuestions = createAsyncThunk(
  'questions/getRecommend',
  async (id: string, thunkAPI) => {
    try {
      return await questionService.getRecommendQuestions(id);
    } catch (error: any) {
      const errorCode = error?.response?.status;
      const message = error?.response?.data?.message;
      const errorResponse = { errorCode, message };
      return thunkAPI.rejectWithValue(errorResponse);
    }
  }
);

// Update user question
export const updateQuestion = createAsyncThunk(
  'questions/update',
  async (data: any, thunkAPI) => {
    try {
      return await questionService.updateQuestion(data.id, data.updatedData);
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
        state.question = action.payload;
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
      .addCase(getRecommendQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecommendQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recommend = action.payload;
      })
      .addCase(getRecommendQuestions.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuestionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.question = action.payload;
      })
      .addCase(getQuestionById.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.question = action.payload;
      })
      .addCase(updateQuestion.rejected, (state, action: any) => {
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
        state.questions = state.questions.questionsList.filter(
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
