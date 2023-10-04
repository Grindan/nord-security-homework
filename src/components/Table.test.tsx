import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Table from './Table';
import { Column } from '@/types/table';
import { Server } from '@/types/servers';

const mockData: Array<Server> = [
  { id: '1', name: 'Server A', distance: '10' },
  { id: '2', name: 'Server B', distance: '20' },
  { id: '3', name: 'Server C', distance: '15' },
];

const mockColumns: Array<Column<'name' | 'distance'>> = [
  { name: 'name', label: 'Name' },
  { name: 'distance', label: 'Distance' },
];

describe('<Table />', () => {
  it('renders without crashing', () => {
    render(<Table data={mockData} columns={mockColumns} />);
  });

  it('sorts data by column header click', () => {
    const { getAllByRole, getByText } = render(
      <Table data={mockData} columns={mockColumns} />,
    );

    fireEvent.click(getByText('Name'));
    let rows = getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Server A');

    fireEvent.click(getByText('Distance'));
    rows = getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Server A');
  });

  it('changes chevron direction based on sort order', () => {
    const { getByText, container } = render(
      <Table data={mockData} columns={mockColumns} />,
    );

    const chevron = container.querySelector('svg');

    expect(chevron).not.toHaveClass('rotate-180');

    fireEvent.click(getByText('Name'));
    expect(chevron).toHaveClass('rotate-180');

    fireEvent.click(getByText('Name'));
    expect(chevron).not.toHaveClass('rotate-180');
  });

  it('clears sorting', () => {
    const { getByText, container, getAllByRole } = render(
      <Table data={mockData} columns={mockColumns} />,
    );

    fireEvent.click(getByText('Distance'));
    const crossIcon = container.querySelector('path');

    fireEvent.click(crossIcon!);

    const rows = getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Server A');
  });
});
