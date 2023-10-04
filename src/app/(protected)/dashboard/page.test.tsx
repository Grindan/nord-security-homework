import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import DashboardPage from './page';
import serversApi from '../../../api/servers';

jest.mock('../../../api/servers');

const mockAuthContext = {
  logout: jest.fn(),
};

const mockNotificationsContext = {
  add: jest.fn(),
};

jest.mock('../../../context/AuthContext', () => ({
  useAuthContext: () => mockAuthContext,
}));

jest.mock('../../../context/NotificationsContext', () => ({
  useNotificationsContext: () => mockNotificationsContext,
}));

const mockServerData = [
  {
    id: '1',
    name: 'Server 1',
    distance: '1000',
  },
  {
    id: '2',
    name: 'Server 2',
    distance: '1500',
  },
];

describe('DashboardPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (serversApi.fetchServers as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockServerData),
    );
  });

  it('fetches and renders server data', async () => {
    render(<DashboardPage />);
    await waitFor(() => {
      expect(screen.getByText('Server 1')).toBeInTheDocument();
      expect(screen.getByText('Server 2')).toBeInTheDocument();
      expect(screen.getByText('1000')).toBeInTheDocument();
      expect(screen.getByText('1500')).toBeInTheDocument();
    });
  });

  it('handles server fetch error', async () => {
    (serversApi.fetchServers as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error('Server fetch error')),
    );
    render(<DashboardPage />);
    await waitFor(() => {
      expect(mockNotificationsContext.add).toHaveBeenCalledWith(
        'Something went wrong with servers loading:\nServer fetch error',
      );
    });
  });

  it('handles token expiration error', async () => {
    (serversApi.fetchServers as jest.Mock).mockImplementation(() =>
      Promise.reject({ response: { status: 401 } }),
    );
    render(<DashboardPage />);
    await waitFor(() => {
      expect(mockNotificationsContext.add).toHaveBeenCalledWith(
        'Token was expired.',
      );
      expect(mockAuthContext.logout).toHaveBeenCalled();
    });
  });
});
