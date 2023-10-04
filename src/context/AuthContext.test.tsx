import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuthContext } from './AuthContext';
import {
  loadAuthToken,
  saveAuthToken,
  removeAuthToken,
} from '../utils/localStorage';
import authApi from '@/api/auth';
import { useEffect } from 'react';

jest.mock('../utils/localStorage');
jest.mock('../api/auth');

function MockConsumer() {
  const { token } = useAuthContext();
  return <div>{token || 'No Token'}</div>;
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('<AuthProvider />', () => {
  it('loads the auth token from local storage on mount', async () => {
    const mockToken = 'test-token';
    (loadAuthToken as jest.Mock).mockReturnValueOnce(mockToken);

    render(
      <AuthProvider>
        <MockConsumer />
      </AuthProvider>,
    );

    expect(loadAuthToken).toBeCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText(mockToken)).toBeInTheDocument();
    });
  });

  it('starts with no token if not in local storage', async () => {
    (loadAuthToken as jest.Mock).mockReturnValueOnce(null);

    render(
      <AuthProvider>
        <MockConsumer />
      </AuthProvider>,
    );

    expect(loadAuthToken).toBeCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText('No Token')).toBeInTheDocument();
    });
  });

  it('updates the token using setToken', async () => {
    const mockToken = 'test-token';
    (loadAuthToken as jest.Mock).mockReturnValueOnce(null);

    const TestComponent: React.FC = () => {
      const { setToken } = useAuthContext();
      useEffect(() => {
        setToken(mockToken);
      }, [setToken]);

      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(saveAuthToken).toBeCalledTimes(1);
      expect(saveAuthToken).toBeCalledWith(mockToken);
      expect(authApi.setHeader).toBeCalledWith(mockToken);
    });
  });

  it('handles logout correctly', async () => {
    (loadAuthToken as jest.Mock).mockReturnValueOnce('existing-token');

    const TestComponent: React.FC = () => {
      const { logout } = useAuthContext();
      useEffect(() => {
        logout();
      }, [logout]);

      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(removeAuthToken).toBeCalledTimes(1);
      expect(authApi.logout).toBeCalledTimes(1);
    });
  });
});
