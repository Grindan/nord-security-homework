import React from 'react';
import { render } from '@testing-library/react';
import LogoutIcon from './LogoutIcon';

describe('<LogoutIcon />', () => {
  it('renders without crashing', () => {
    const { container } = render(<LogoutIcon />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
