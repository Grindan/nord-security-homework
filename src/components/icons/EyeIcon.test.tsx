import React from 'react';
import { render } from '@testing-library/react';
import EyeIcon from './EyeIcon';

describe('<EyeIcon />', () => {
  it('renders without crashing', () => {
    const { container } = render(<EyeIcon />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
