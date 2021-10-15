/* eslint-disable no-param-reassign */
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { REACT_APP_API_BASE_URL } from '@env';

const api = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');

    config.headers.Authorization = `Bearer ${token || ''}`;

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
