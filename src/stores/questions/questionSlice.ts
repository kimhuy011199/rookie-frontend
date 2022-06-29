import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Question } from '../../shared/constants/types/Question';
import { questionType } from './questionType';
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
  userQuestions: [],
  isError: '',
  isSuccess: '',
  isLoading: false,
  message: '',
};

// Create question
export const createQuestion = createAsyncThunk(
  `question/${questionType.CREATE_QUESTION}`,
  async (questionData: QuestionInputInterface, thunkAPI) => {
    try {
      return await questionService.createQuestion(questionData);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Paginate questions
export const paginateQuestions = createAsyncThunk(
  `question/${questionType.PAGINATE_QUESTIONS}`,
  async (queryString: string, thunkAPI) => {
    try {
      return await questionService.paginateQuestions(queryString);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get question by id
export const getQuestionById = createAsyncThunk(
  `question/${questionType.GET_QUESTION_BY_ID}`,
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

// Get question by user id
export const getQuestionByUserId = createAsyncThunk(
  `question/${questionType.GET_QUESTION_BY_USER_ID}`,
  async (userId: string, thunkAPI) => {
    try {
      return await questionService.getQuestionByUserId(userId);
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
  `question/${questionType.GET_RECOMMENDATION}`,
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

// Update question
export const updateQuestion = createAsyncThunk(
  `question/${questionType.UPDATE_QUESTION}`,
  async (data: any, thunkAPI) => {
    try {
      return await questionService.updateQuestion(data.id, data.updatedData);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete question
export const deleteQuestion = createAsyncThunk(
  `question/${questionType.DELETE_QUESTION}`,
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
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = '';
      state.isError = '';
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuestion.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = questionType.CREATE_QUESTION;
        state.question = action.payload;
      })
      .addCase(createQuestion.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = questionType.CREATE_QUESTION;
        state.message = action.payload;
      })
      .addCase(paginateQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paginateQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = questionType.PAGINATE_QUESTIONS;
        state.questions = action.payload;
      })
      .addCase(paginateQuestions.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = questionType.PAGINATE_QUESTIONS;
        state.message = action.payload;
      })
      .addCase(getRecommendQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecommendQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = questionType.GET_RECOMMENDATION;
        state.recommend = action.payload;
      })
      .addCase(getRecommendQuestions.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = questionType.GET_RECOMMENDATION;
        state.message = action.payload;
      })
      .addCase(getQuestionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = questionType.GET_QUESTION_BY_ID;
        state.question = action.payload;
      })
      .addCase(getQuestionById.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = questionType.GET_QUESTION_BY_ID;
        state.message = action.payload;
      })
      .addCase(getQuestionByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestionByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = questionType.GET_QUESTION_BY_USER_ID;
        state.userQuestions = action.payload;
      })
      .addCase(getQuestionByUserId.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = questionType.GET_QUESTION_BY_USER_ID;
        state.message = action.payload;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = questionType.UPDATE_QUESTION;
        state.question = action.payload;
      })
      .addCase(updateQuestion.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = questionType.UPDATE_QUESTION;
        state.message = action.payload;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuestion.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = questionType.DELETE_QUESTION;
        state.userQuestions = state.userQuestions.filter(
          (question: Question) => question._id !== action.payload.id
        );
      })
      .addCase(deleteQuestion.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = questionType.DELETE_QUESTION;
        state.message = action.payload;
      });
  },
});

export const { reset } = questionSlice.actions;
export default questionSlice.reducer;
