import { render, screen } from '@testing-library/react';
import DashboardCard from './components/DashboardCard';
import DashboardLayout from './components/DashboardLayout';
import DataTable from './components/DataTable';
import StatusBadge from './components/StatusBadge';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
];

const rows = [{ id: 'room-1', name: 'Room 1', status: 'Available' }];

test('composes reusable dashboard components', () => {
  render(<DashboardLayout sidebar="Navigation" header="Dashboard"><DashboardCard title="Rooms"><DataTable columns={columns} data={rows} /></DashboardCard></DashboardLayout>);

  expect(screen.getByText('Navigation')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Rooms' })).toBeInTheDocument();
  expect(screen.getByText('Available')).toBeInTheDocument();
});

test('renders an empty table state', () => {
  render(<DataTable columns={columns} data={[]} emptyMessage="No rooms yet." />);

  expect(screen.getByText('No rooms yet.')).toBeInTheDocument();
});
