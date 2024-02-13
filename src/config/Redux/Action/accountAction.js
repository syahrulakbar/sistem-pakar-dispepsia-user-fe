import {Toast} from 'react-native-toast-notifications';
import AxiosJWTConfig from '../../../utils/axiosJWT';
import Axios from 'axios';
import {API_SERVER} from '@env';

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
    const formData = new FormData();
    if (values.password) formData.append('password', values.password);
    formData.append('profilePicture', values.profilePicture);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('confirmPassword', values.confirmPassword);

    await AxiosJWT.patch(`/users/${user.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
    await Axios.post(`${API_SERVER}/login`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
    console.log(response);
    formik.resetForm();
    Toast.show('Register Successfully, Please Login', {
      type: 'success',
    });
    navigation.navigate('Login');
  } catch (error) {
    Toast.show(error.response?.data.message || 'Failed to Register Account', {
      type: 'danger',
    });
    console.log(error);
    throw error;
  }
};

export const signOut = () => async dispatch => {
  try {
    const AxiosJWT = await AxiosJWTConfig();
    await AxiosJWT.delete(`/logout`);
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
