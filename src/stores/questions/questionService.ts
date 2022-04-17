import api from '../../core/api.service';
import { ENDPOINT } from '../../shared/constants/constants';
import { QuestionInputInterface } from './questionSlice';

const endpoint = ENDPOINT.QUESIONS;

// Create new question
const createQuestion = async (questionData: QuestionInputInterface) => {
  const response = await api().post(endpoint, questionData);
  return response.data;
};

// Get all questions
const getQuestions = async () => {
  const response = await api().get(endpoint);
  return response.data;
};

// Delete user question
const deleteQuestion = async (questionId: string) => {
  const response = await api().delete(`${endpoint}/${questionId}`);
  return response.data;
};

const questionService = {
  createQuestion,
  getQuestions,
  deleteQuestion,
};

export default questionService;
