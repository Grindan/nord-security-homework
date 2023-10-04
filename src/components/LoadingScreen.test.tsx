import React from 'react';
import { render } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';

describe('<LoadingScreen />', () => {
  it('renders without crashing', () => {
    const { container } = render(<LoadingScreen />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the loading spinner', () => {
    const { container } = render(<LoadingScreen />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
});
