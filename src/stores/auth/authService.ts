import axios from 'axios';
import authStorageService from '../../core/authStorage.service';
import { ENDPOINT } from '../../shared/constants/constants';
import { LoginUserInterface, RegisterUserInterface } from './authSlice';

const endpoint = ENDPOINT.USERS;

// Register user
const register = async (userData: RegisterUserInterface) => {
  const response = await axios.post(endpoint, userData);
  if (response.data) {
    const { token } = response.data;
    authStorageService().setToken(token);
  }
  return response.data;
};

// Login user
const login = async (userData: LoginUserInterface) => {
  const response = await axios.post(`${endpoint}/login`, userData);
  if (response.data) {
    const { token } = response.data;
    authStorageService().setToken(token);
  }
  return response.data;
};

// Logout user
const logout = () => {
  authStorageService().removeToken();
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
