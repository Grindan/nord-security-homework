import React from 'react';
import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import {
  NotificationsProvider,
  useNotificationsContext,
} from './NotificationsContext';

describe('NotificationsContext', () => {
  it('should add and remove notifications', async () => {
    const TestComponent = () => {
      const { add } = useNotificationsContext();

      const handleClick = () => {
        add('Test Notification');
      };

      return (
        <div>
          <button onClick={handleClick}>Add Notification</button>
        </div>
      );
    };

    render(
      <NotificationsProvider>
        <TestComponent />
      </NotificationsProvider>,
    );

    expect(screen.queryByText('Test Notification')).toBeNull();

    const addButton = screen.getByText('Add Notification');

    act(() => {
      addButton.click();
    });

    await waitFor(() => {
      expect(screen.getByText('Test Notification')).toBeInTheDocument();
    });
  });
  it('should throw an error if used outside NotificationsProvider', () => {
    try {
      renderHook(() => useNotificationsContext());
    } catch (error) {
      expect(error).toBe(
        'useNotificationsContext must be use as a child of the NotificationsProvider',
      );
    }
  });
});
