import { render, screen, fireEvent } from '@testing-library/react';
import DashboardPage from './pages/DashboardPage';

test('renders owner dashboard page with metrics, tables, and staff items', () => {
  render(<DashboardPage user={{ full_name: 'Carmelita Ramos', role: 'owner' }} />);

  expect(screen.getByRole('heading', { name: /owner dashboard/i })).toBeInTheDocument();
  expect(screen.getByText(/occupancy rate/i)).toBeInTheDocument();
  expect(screen.getByText('87%')).toBeInTheDocument();
  expect(screen.getByText(/owner access/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /dormitory room inventory/i })).toBeInTheDocument();
  expect(screen.getAllByText('Shared room').length).toBeGreaterThanOrEqual(1);
  expect(screen.getByRole('heading', { name: /recent inquiries/i })).toBeInTheDocument();
});

test('renders caretaker dashboard with operational permissions', () => {
  render(<DashboardPage user={{ full_name: 'Jerry Bautista', role: 'caretaker' }} />);

  expect(screen.getByRole('heading', { name: /caretaker dashboard/i })).toBeInTheDocument();
  expect(screen.getByText(/caretaker access/i)).toBeInTheDocument();
  // Caretaker should not have Staff Accounts navigation in the sidebar
  expect(screen.queryByText('Staff Accounts')).not.toBeInTheDocument();
});

test('handles navigation callback when returning to home', () => {
  const onNavigateHome = jest.fn();
  render(<DashboardPage onNavigateHome={onNavigateHome} />);

  const viewPublicSiteBtn = screen.getByRole('button', { name: /public site/i });
  fireEvent.click(viewPublicSiteBtn);

  expect(onNavigateHome).toHaveBeenCalledTimes(1);
});

test('handles sign out callback when clicking sign out button', () => {
  const onSignOut = jest.fn();
  render(<DashboardPage onSignOut={onSignOut} />);

  const signOutBtn = screen.getByRole('button', { name: /sign out/i });
  fireEvent.click(signOutBtn);

  expect(onSignOut).toHaveBeenCalledTimes(1);
});
