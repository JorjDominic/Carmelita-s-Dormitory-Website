import { render, screen, act } from '@testing-library/react';
import App from './app/App';

afterEach(() => {
  window.location.hash = '';
  localStorage.clear();
});

test('renders the dormitory home page by default', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /life feels a little better here/i })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'About us' })[0]).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /staff portal/i })[0]).toBeInTheDocument();
});

test('switches to login view when hash is #login', () => {
  window.location.hash = '#login';
  render(<App />);

  expect(screen.getByText('CarmeLink Staff Portal')).toBeInTheDocument();
  expect(screen.getByLabelText(/staff email address/i)).toBeInTheDocument();
});

test('switches to dashboard view when hash is #dashboard', () => {
  window.location.hash = '#dashboard';
  render(<App />);

  expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
  expect(screen.getByText('Dormitory Room Inventory')).toBeInTheDocument();
});

test('navigates back to home page when hash changes to #home', () => {
  window.location.hash = '#dashboard';
  render(<App />);

  expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();

  act(() => {
    window.location.hash = '#home';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });

  expect(screen.getByRole('heading', { name: /life feels a little better here/i })).toBeInTheDocument();
});
