import { LoginFormValues } from '@/types/form';

import instance from './axios';

class AuthApi {
  setHeader(token: string) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  login(data: LoginFormValues) {
    return instance.post('/tokens', data).then((res) => {
      this.setHeader(res.data.token);
      return res.data;
    });
  }

  logout() {
    delete instance.defaults.headers.common['Authorization'];
  }
}

export default new AuthApi();
