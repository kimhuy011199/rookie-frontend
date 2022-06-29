import api from '../../core/api.service';
import { ENDPOINT } from '../../shared/constants/constants';

const endpoint = ENDPOINT.TAGS;

// Get tags
const getTags = async () => {
  const response = await api().get(`${endpoint}/all`);
  return response.data;
};

const tagService = {
  getTags,
};

export default tagService;
