import React from 'react';
import { render } from '@testing-library/react';
import AuthPageLayout from './layout';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../context/AuthContext', () => ({
  useAuthContext: () => ({
    token: '',
    isLoading: false,
  }),
}));

describe('AuthPageLayout', () => {
  it('renders children when token exists and isLoading is false', () => {
    const { getByText } = render(
      <AuthPageLayout>Child Component</AuthPageLayout>,
    );
    expect(getByText('Child Component')).toBeInTheDocument();
  });
});
