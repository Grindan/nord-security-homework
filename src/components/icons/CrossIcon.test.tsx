import React from 'react';
import { render } from '@testing-library/react';
import CrossIcon from './CrossIcon';

describe('<CrossIcon />', () => {
  it('renders without crashing', () => {
    const { container } = render(<CrossIcon />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
