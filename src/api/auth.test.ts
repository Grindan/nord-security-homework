import axios from './axios';
import MockAdapter from 'axios-mock-adapter';
import AuthApi from './auth';

const mock = new MockAdapter(axios);

describe('AuthApi', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should set the authorization header when calling login', async () => {
    const mockData = { token: 'test-token' };
    mock.onPost('/tokens').reply(200, mockData);

    const loginData = { username: 'test-user', password: 'test-password' };
    const result = await AuthApi.login(loginData);

    expect(axios.defaults.headers.common['Authorization']).toBe(
      'Bearer test-token',
    );
    expect(result).toEqual(mockData);
  });

  it('should remove the authorization header when calling logout', () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer test-token';

    AuthApi.logout();

    expect(axios.defaults.headers.common['Authorization']).toBeUndefined();
  });
});
