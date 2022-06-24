import api from '../../core/api.service';
import { ENDPOINT } from '../../shared/constants/constants';

const endpoint = ENDPOINT.USERS;

// Get user by id
const getUserById = async (userId: string) => {
  const response = await api().get(`${endpoint}/${userId}`);
  return response.data;
};

const userService = {
  getUserById,
};

export default userService;
