import Axios from 'axios';
import {Toast} from 'react-native-toast-notifications';
import {API_SERVER} from '@env';

export const getBlogs = async () => {
  try {
    const response = await Axios.get(`${API_SERVER}/blog`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    Toast.show(error.response?.data.message || 'Failed to Get Blogs', {
      type: 'danger',
    });
    throw error;
  }
};
