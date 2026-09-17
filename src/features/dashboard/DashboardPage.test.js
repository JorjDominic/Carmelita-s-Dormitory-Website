import { render, screen, fireEvent } from '@testing-library/react';
import DashboardPage from './pages/DashboardPage';

test('renders dashboard page with metrics and tables', () => {
  render(<DashboardPage />);

  expect(screen.getByRole('heading', { name: /dashboard overview/i })).toBeInTheDocument();
  expect(screen.getByText(/occupancy rate/i)).toBeInTheDocument();
  expect(screen.getByText('87%')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /dormitory room inventory/i })).toBeInTheDocument();
  expect(screen.getAllByText('Shared room').length).toBeGreaterThanOrEqual(1);
  expect(screen.getByRole('heading', { name: /recent inquiries/i })).toBeInTheDocument();
});

test('handles navigation callback when returning to home', () => {
  const onNavigateHome = jest.fn();
  render(<DashboardPage onNavigateHome={onNavigateHome} />);

  const viewPublicSiteBtn = screen.getByRole('button', { name: /view public site/i });
  fireEvent.click(viewPublicSiteBtn);

  expect(onNavigateHome).toHaveBeenCalledTimes(1);
});

