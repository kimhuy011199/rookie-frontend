import api from '../../core/api.service';
import { ENDPOINT } from '../../shared/constants/constants';

const endpoint = ENDPOINT.NOTIFICATION;

// Create new notification
const createNotification = async (data: any) => {
  const response = await api().post(endpoint, data);
  return response.data;
};

// Get all notifications
const getNotificationsByUserId = async (userId: string) => {
  const response = await api().get(`${endpoint}/users/${userId}`);
  return response.data;
};

const notificationService = {
  createNotification,
  getNotificationsByUserId,
};

export default notificationService;
