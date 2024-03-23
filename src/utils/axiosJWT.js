import {API_SERVER} from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosJWTConfig = async () => {
  const exp = async () => {
    try {
      const expire = await AsyncStorage.getItem('expire');
      return parseInt(expire);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const axiosJWT = axios.create({
    baseURL: API_SERVER,
    withCredentials: true,
    timeout: 3000,
  });

  axiosJWT.interceptors.request.use(
    async config => {
      const expire = await exp();
      const currentDate = new Date();
      if (expire < currentDate.getTime()) {
        try {
          await axios.get(`${API_SERVER}/users/token`);
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return axiosJWT;
};

export default AxiosJWTConfig;
