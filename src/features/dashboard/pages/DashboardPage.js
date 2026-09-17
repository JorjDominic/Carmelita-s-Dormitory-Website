import { useState } from 'react';
import '../Dashboard.css';
import DashboardLayout from '../components/DashboardLayout';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import DashboardCard from '../components/DashboardCard';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import DataTable from '../components/DataTable';
import { rooms } from '../../products/data';

const sidebarNavItems = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'rooms', label: 'Rooms', icon: '🛏', badge: 3 },
  { id: 'inquiries', label: 'Inquiries', icon: '✉', badge: 2 },
  { id: 'home', label: 'Public Website', icon: '↗', href: '#home' },
];

const roomColumns = [
  { key: 'name', label: 'Room' },
  { key: 'detail', label: 'Configuration' },
  { key: 'price', label: 'Monthly Rate' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <StatusBadge status={row.status || 'Available'} />,
  },
];

const inquiryColumns = [
  { key: 'name', label: 'Guest Name' },
  { key: 'roomType', label: 'Preferred Room' },
  { key: 'date', label: 'Target Date' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
];

const mockInquiries = [
  { id: 'inq-1', name: 'Maria Santos', roomType: 'Shared room', date: 'Next month', status: 'Pending' },
  { id: 'inq-2', name: 'Alex Reyes', roomType: 'Private room', date: 'Immediate', status: 'Active' },
];

function DashboardPage({ onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleSidebarNavigate = (item) => {
    if (item.id === 'home' || item.href === '#home') {
      if (onNavigateHome) {
        onNavigateHome();
      } else {
        window.location.hash = '#home';
      }
      return;
    }
    setActiveTab(item.id);
  };

  const sidebar = (
    <DashboardSidebar
      brand="Carmelita’s"
      items={sidebarNavItems}
      activeId={activeTab}
      onNavigate={handleSidebarNavigate}
    />
  );

  const header = (
    <DashboardHeader
      title="Dashboard Overview"
      subtitle="Operational monitoring and room management"
      actions={
        <button
          className="button button-dark"
          style={{ padding: '8px 16px', fontSize: '12px' }}
          onClick={() => {
            if (onNavigateHome) onNavigateHome();
            else window.location.hash = '#home';
          }}
        >
          View Public Site ↗
        </button>
      }
      user={{
        name: 'Carmelita Admin',
        role: 'Property Manager',
      }}
    />
  );

  return (
    <DashboardLayout sidebar={sidebar} header={header}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <StatCard label="Occupancy Rate" value="87%" change="+5% vs last month" trend="positive" icon="🏠" />
        <StatCard label="Available Rooms" value="4 rooms" change="2 private, 2 shared" trend="neutral" icon="🛏" />
        <StatCard label="New Inquiries" value="5 pending" change="Requires follow-up" trend="positive" icon="✉" />
        <StatCard label="Monthly Inflow" value="₱185,000" change="+8% vs target" trend="positive" icon="₱" />
      </div>

      <DashboardCard
        title="Dormitory Room Inventory"
        description="Current listing of rooms, occupancy status, and monthly pricing"
      >
        <DataTable columns={roomColumns} data={rooms} />
      </DashboardCard>

      <DashboardCard
        title="Recent Inquiries"
        description="Prospective residents requesting room reservations and viewings"
      >
        <DataTable columns={inquiryColumns} data={mockInquiries} />
      </DashboardCard>
    </DashboardLayout>
  );
}

export default DashboardPage;

