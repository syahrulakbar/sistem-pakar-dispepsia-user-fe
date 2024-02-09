import CookieManager from '@react-native-cookies/cookies';
import axios from 'axios';

const AxiosJWTConfig = async () => {
  const api = 'http://10.0.2.2:5000/api';
  const exp = async () => {
    try {
      const cookies = await CookieManager.get('http://10.0.2.2:8081/');
      return cookies.expire.value;
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const axiosJWT = axios.create({
    baseURL: api,
    withCredentials: true,
  });

  axiosJWT.interceptors.request.use(
    async config => {
      const expire = await exp();
      const currentDate = new Date();
      if (expire < currentDate.getTime()) {
        try {
          await axios.get(`${api}/users/token`);
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
