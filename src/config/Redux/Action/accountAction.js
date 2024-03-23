import {Toast} from 'react-native-toast-notifications';
import AxiosJWTConfig from '../../../utils/axiosJWT';
import Axios from 'axios';
import {API_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCurrentUser = () => async dispatch => {
  try {
    const AxiosJWT = await AxiosJWTConfig();
    const response = await AxiosJWT.get(`/users/profile`);
    dispatch({type: 'SET_CURRENT_USER', payload: response?.data.data});
  } catch (error) {
    Toast.show(error.response?.data.message || 'Failed to Get Account', {
      type: 'danger',
    });
    throw error;
  }
};

export const updateUser = async (values, navigation, user) => {
  try {
    const AxiosJWT = await AxiosJWTConfig();
    if (!values.password || !values.confirmPassword)
      [delete values.password, delete values.confirmPassword];
    await AxiosJWT.patch(`/users/${user.id}`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    Toast.show('Update Account Success', {
      type: 'success',
    });
    navigation.navigate('Account');
  } catch (error) {
    Toast.show(error.response?.data.message || 'Failed to Update Account', {
      type: 'danger',
    });
    throw error;
  }
};
export const signIn = (values, formik, navigation) => async dispatch => {
  try {
    const response = await Axios.post(`${API_SERVER}/login`, values, {
      withCredentials: true,

      headers: {
        'Content-Type': 'application/json',
      },
    });
    const {userId, expire} = response.data.data;
    await AsyncStorage.setItem('userId', userId);
    await AsyncStorage.setItem('expire', expire.toString());
    formik.resetForm();
    Toast.show('Login Successfully', {
      type: 'success',
    });
    dispatch({type: 'SET_IS_LOGIN', payload: true});
    navigation.navigate('Protected');
  } catch (error) {
    Toast.show(error.response?.data.message || 'Failed to Login', {
      type: 'danger',
    });
    throw error;
  }
};

export const signUp = async (values, formik, navigation) => {
  try {
    const response = await Axios.post(`${API_SERVER}/register`, values, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    formik.resetForm();
    Toast.show('Register Successfully, Please Login', {
      type: 'success',
    });
    navigation.navigate('Login');
  } catch (error) {
    Toast.show(error.response?.data.message || 'Failed to Register Account', {
      type: 'danger',
    });
    throw error;
  }
};

export const signOut = () => async dispatch => {
  try {
    const AxiosJWT = await AxiosJWTConfig();
    await AxiosJWT.delete(`/logout`);
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('expire');

    Toast.show('Logout Successfully', {
      type: 'success',
    });
    dispatch({type: 'SET_SHOW_MODAL', payload: false});
    dispatch({type: 'SET_IS_LOGIN', payload: false});
  } catch (error) {
    Toast.show(error.response?.data.message || 'Failed Logout', {
      type: 'danger',
    });
    throw error;
  }
};

export const checkUser = () => async dispatch => {
  try {
    dispatch({type: 'SET_IS_LOADING', payload: true});
    const AxiosJWT = await AxiosJWTConfig();
    dispatch({type: 'SET_IS_LOGIN', payload: false});
    const response = await AxiosJWT.get(`/users/profile`);
    dispatch({type: 'SET_IS_LOGIN', payload: true});
    dispatch({type: 'SET_CURRENT_USER', payload: response.data.data});
    dispatch({type: 'SET_IS_LOADING', payload: false});
  } catch (error) {
    dispatch({type: 'SET_IS_LOGIN', payload: false});
    dispatch({type: 'SET_IS_LOADING', payload: false});
    throw error;
  }
};
