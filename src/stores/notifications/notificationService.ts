import api from '../../core/api.service';
import { ENDPOINT } from '../../shared/constants/constants';

const endpoint = ENDPOINT.NOTIFICATION;

// Create new notification
const createNotification = async (data: any) => {
  const response = await api().post(endpoint, data);
  return response.data;
};

// Get all notifications
const getNotifications = async (userId: string) => {
  const response = await api().get(`${endpoint}/${userId}`);
  return response.data;
};

const notificationService = {
  createNotification,
  getNotifications,
};

export default notificationService;
