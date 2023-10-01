import { LoginFormValues } from '@/types/form';
import {
  loadAuthToken,
  saveAuthToken,
  removeAuthToken,
} from '@/utils/localStorage';

import instance from './axios';

export default {
  checkUser: () => {
    const token = loadAuthToken();
  },
  login: (data: LoginFormValues) => {
    return instance.post('/tokens', data).then((res) => {
      instance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.token}`;
      saveAuthToken(res.data.token);
      return res.data;
    });
  },
  logout: () => {
    delete instance.defaults.headers.common['Authorization'];
    removeAuthToken();
  },
};
