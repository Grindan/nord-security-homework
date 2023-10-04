import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockSetToken = () => ({
  setToken: jest.fn(),
});

jest.mock('../../../context/AuthContext', () => ({
  useAuthContext: () => ({
    setToken: mockSetToken,
  }),
}));

jest.mock('../../../context/NotificationsContext', () => ({
  useNotificationsContext: () => ({
    add: jest.fn(),
  }),
}));

jest.mock('../../../api/auth', () => ({
  __esModule: true,
  default: {
    login: jest.fn().mockResolvedValue({ token: 'mock-token' }),
  },
}));

describe('LoginPage', () => {
  it('submits the form successfully', async () => {
    const { getByLabelText, getByText } = render(<LoginPage />);
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(usernameInput).toHaveValue('testuser');
      expect(passwordInput).toHaveValue('password123');
    });
  });
});
