import React from 'react';
import { render } from '@testing-library/react';
import ChevronDownIcon from './ChevronDownIcon';

describe('<ChevronDownIcon />', () => {
  it('renders without crashing', () => {
    const { container } = render(<ChevronDownIcon />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
