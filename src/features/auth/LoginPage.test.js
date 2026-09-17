import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './pages/LoginPage';
import { supabase } from '../../lib/supabaseClient';

jest.mock('../../lib/supabaseClient', () => {
  return {
    supabase: {
      auth: {
        signInWithPassword: jest.fn(),
        signOut: jest.fn(),
      },
      from: jest.fn(),
    },
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders staff login page with brand header and notice', () => {
  render(<LoginPage />);

  expect(screen.getByText('Carmelita’s')).toBeInTheDocument();
  expect(screen.getByText('CarmeLink Staff Portal')).toBeInTheDocument();
  expect(screen.getByLabelText(/staff email address/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/enter your staff password/i)).toBeInTheDocument();
  expect(screen.getByText(/are you a tenant or guardian\?/i)).toBeInTheDocument();
  expect(screen.getByText(/connected to live supabase authentication/i)).toBeInTheDocument();
});

test('submits valid owner credentials against live Supabase and calls onLoginSuccess', async () => {
  const onLoginSuccess = jest.fn();

  supabase.auth.signInWithPassword.mockResolvedValueOnce({
    data: { user: { id: 'usr-owner-123' } },
    error: null,
  });

  supabase.from.mockReturnValueOnce({
    select: jest.fn().mockReturnValue({
      eq: jest.fn().mockReturnValue({
        single: jest.fn().mockResolvedValue({
          data: {
            id: 'usr-owner-123',
            full_name: 'Carmelita Ramos',
            role: 'owner',
            phone: '+63 917 555 0101',
          },
          error: null,
        }),
      }),
    }),
  });

  render(<LoginPage onLoginSuccess={onLoginSuccess} />);

  fireEvent.change(screen.getByLabelText(/staff email address/i), {
    target: { value: 'owner@carmelitas.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter your staff password/i), {
    target: { value: 'SecretOwnerPass123!' },
  });

  fireEvent.click(screen.getByRole('button', { name: /sign in to dashboard/i }));

  await waitFor(() => {
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'owner@carmelitas.com',
      password: 'SecretOwnerPass123!',
    });
    expect(onLoginSuccess).toHaveBeenCalledTimes(1);
    expect(onLoginSuccess).toHaveBeenCalledWith(
      expect.objectContaining({
        role: 'owner',
        full_name: 'Carmelita Ramos',
      })
    );
  });
});

test('submits valid caretaker credentials against live Supabase and calls onLoginSuccess', async () => {
  const onLoginSuccess = jest.fn();

  supabase.auth.signInWithPassword.mockResolvedValueOnce({
    data: { user: { id: 'usr-caretaker-456' } },
    error: null,
  });

  supabase.from.mockReturnValueOnce({
    select: jest.fn().mockReturnValue({
      eq: jest.fn().mockReturnValue({
        single: jest.fn().mockResolvedValue({
          data: {
            id: 'usr-caretaker-456',
            full_name: 'Jerry Bautista',
            role: 'caretaker',
            phone: '+63 917 555 0202',
          },
          error: null,
        }),
      }),
    }),
  });

  render(<LoginPage onLoginSuccess={onLoginSuccess} />);

  fireEvent.change(screen.getByLabelText(/staff email address/i), {
    target: { value: 'caretaker@carmelitas.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter your staff password/i), {
    target: { value: 'CaretakerPass123!' },
  });

  fireEvent.click(screen.getByRole('button', { name: /sign in to dashboard/i }));

  await waitFor(() => {
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'caretaker@carmelitas.com',
      password: 'CaretakerPass123!',
    });
    expect(onLoginSuccess).toHaveBeenCalledWith(
      expect.objectContaining({
        role: 'caretaker',
        full_name: 'Jerry Bautista',
      })
    );
  });
});

test('rejects tenant role from Supabase and revokes session with access denied error', async () => {
  supabase.auth.signInWithPassword.mockResolvedValueOnce({
    data: { user: { id: 'usr-tenant-789' } },
    error: null,
  });

  supabase.from.mockReturnValueOnce({
    select: jest.fn().mockReturnValue({
      eq: jest.fn().mockReturnValue({
        single: jest.fn().mockResolvedValue({
          data: {
            id: 'usr-tenant-789',
            full_name: 'Student Tenant',
            role: 'tenant',
          },
          error: null,
        }),
      }),
    }),
  });

  render(<LoginPage />);

  fireEvent.change(screen.getByLabelText(/staff email address/i), {
    target: { value: 'student@tenant.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter your staff password/i), {
    target: { value: 'StudentPass123!' },
  });

  fireEvent.click(screen.getByRole('button', { name: /sign in to dashboard/i }));

  await waitFor(() => {
    expect(supabase.auth.signOut).toHaveBeenCalledTimes(1);
    expect(
      screen.getByText(/access denied\. this dashboard is strictly for owner and caretaker accounts\./i)
    ).toBeInTheDocument();
  });
});

test('displays error message when Supabase returns invalid credentials error', async () => {
  supabase.auth.signInWithPassword.mockResolvedValueOnce({
    data: null,
    error: { message: 'Invalid login credentials' },
  });

  render(<LoginPage />);

  fireEvent.change(screen.getByLabelText(/staff email address/i), {
    target: { value: 'wrong@email.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter your staff password/i), {
    target: { value: 'wrongpass' },
  });

  fireEvent.click(screen.getByRole('button', { name: /sign in to dashboard/i }));

  await waitFor(() => {
    expect(screen.getByText('Invalid login credentials')).toBeInTheDocument();
  });
});

test('navigates back to public website when clicking return link', () => {
  const onNavigateHome = jest.fn();
  render(<LoginPage onNavigateHome={onNavigateHome} />);

  const returnLink = screen.getByRole('link', { name: /return to public website/i });
  fireEvent.click(returnLink);

  expect(onNavigateHome).toHaveBeenCalledTimes(1);
});
