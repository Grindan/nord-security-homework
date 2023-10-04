import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import RootLayout from './layout';

jest.mock('../context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('../context/NotificationsContext', () => ({
  NotificationsProvider: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('RootLayout', () => {
  it('renders children within AuthProvider and NotificationsProvider', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Child Component</div>
      </RootLayout>,
    );

    const childComponent = getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
  });
});
