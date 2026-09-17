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

const maintenanceColumns = [
  { key: 'room', label: 'Room' },
  { key: 'category', label: 'Category' },
  { key: 'urgency', label: 'Urgency' },
  { key: 'description', label: 'Issue Description' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
];

const curfewColumns = [
  { key: 'tenant', label: 'Tenant' },
  { key: 'type', label: 'Request Type' },
  { key: 'expected', label: 'Expected Return' },
  { key: 'reason', label: 'Reason' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
];

const staffColumns = [
  { key: 'name', label: 'Staff Member' },
  { key: 'role', label: 'Role' },
  { key: 'email', label: 'Email' },
  { key: 'permissions', label: 'Permissions' },
];

const mockInquiries = [
  { id: 'inq-1', name: 'Maria Santos', roomType: 'Shared room', date: 'Next month', status: 'Pending' },
  { id: 'inq-2', name: 'Alex Reyes', roomType: 'Private room', date: 'Immediate', status: 'Active' },
];

const mockMaintenance = [
  { id: 'm-1', room: 'Room 201', category: 'Plumbing', urgency: 'High', description: 'Bathroom faucet dripping continuously', status: 'Pending' },
  { id: 'm-2', room: 'Room 104', category: 'Electrical', urgency: 'Low', description: 'Desk study lamp replacement', status: 'Resolved' },
];

const mockCurfew = [
  { id: 'c-1', tenant: 'Bea Cruz (Room 102)', type: 'Late Return', expected: '11:00 PM', reason: 'University library project study group', status: 'Approved' },
  { id: 'c-2', tenant: 'Angelo Diaz (Room 205)', type: 'Overnight Leave', expected: 'Tomorrow 8:00 AM', reason: 'Weekend family visit', status: 'Pending' },
];

const mockStaffList = [
  { id: 's-1', name: 'Carmelita Ramos', role: 'Owner', email: 'owner@carmelitas.com', permissions: 'Full Administrative CRUD & Financials' },
  { id: 's-2', name: 'Jerry Bautista', role: 'Caretaker', email: 'caretaker@carmelitas.com', permissions: 'Operations, Triage, Inspections' },
];

function DashboardPage({ user, onNavigateHome, onSignOut }) {
  const currentUser = user || {
    full_name: 'Carmelita Ramos',
    role: 'owner',
    phone: '+63 917 555 0101',
  };

  const isOwner = currentUser.role === 'owner';
  const [activeTab, setActiveTab] = useState('overview');

  const sidebarNavItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'rooms', label: 'Rooms & Beds', icon: '🛏', badge: 3 },
    { id: 'inquiries', label: 'Inquiries', icon: '✉', badge: 2 },
    { id: 'maintenance', label: 'Maintenance', icon: '🔧', badge: 1 },
    { id: 'curfew', label: 'Curfew & Leaves', icon: '🚪' },
    ...(isOwner
      ? [
          { id: 'staff', label: 'Staff Accounts', icon: '👥' },
          { id: 'finance', label: 'Financial Ledger', icon: '💳' },
        ]
      : []),
    { id: 'home', label: 'Public Website', icon: '↗', href: '#home' },
  ];

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

  const handleSignOutClick = () => {
    if (onSignOut) {
      onSignOut();
    } else {
      window.location.hash = '#login';
    }
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
      title={`${isOwner ? '👑 Owner' : '🛠 Caretaker'} Dashboard`}
      subtitle={`CarmeLink Portal · Logged in as ${currentUser.full_name} (${isOwner ? 'Owner' : 'Caretaker'})`}
      actions={
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="button button-dark"
            style={{ padding: '8px 14px', fontSize: '12px' }}
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
              else window.location.hash = '#home';
            }}
          >
            Public Site ↗
          </button>
          <button
            className="button button-light"
            style={{ padding: '8px 14px', fontSize: '12px', border: '1px solid #c8bfb5' }}
            onClick={handleSignOutClick}
          >
            Sign Out
          </button>
        </div>
      }
      user={{
        name: currentUser.full_name,
        role: isOwner ? 'Dormitory Owner' : 'Head Caretaker',
      }}
    />
  );

  return (
    <DashboardLayout sidebar={sidebar} header={header}>
      {/* Role permission status banner */}
      <div
        style={{
          padding: '12px 18px',
          borderRadius: '6px',
          background: isOwner ? '#fbf8f3' : '#f2f7f4',
          border: `1px solid ${isOwner ? '#e8ded2' : '#cde2d3'}`,
          fontSize: '12px',
          color: isOwner ? '#5e4635' : '#335e44',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>
          <strong>Role Status:</strong> {isOwner ? 'Owner Access (Full Control & Financial Ledger)' : 'Caretaker Access (Operational Management)'}
        </span>
        <span style={{ fontSize: '11px', opacity: 0.85 }}>
          Authorized under <code>WEBSITE_INTEGRATION_GUIDE.md</code>
        </span>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <StatCard label="Occupancy Rate" value="87%" change="+5% vs last month" trend="positive" icon="🏠" />
        <StatCard label="Available Rooms" value="4 rooms" change="2 private, 2 shared" trend="neutral" icon="🛏" />
        <StatCard label="Active Inquiries" value="5 pending" change="Requires follow-up" trend="positive" icon="✉" />
        {isOwner ? (
          <StatCard label="Monthly Inflow" value="₱185,000" change="+8% vs target" trend="positive" icon="₱" />
        ) : (
          <StatCard label="Pending Repairs" value="1 pending" change="Triage required" trend="neutral" icon="🔧" />
        )}
      </div>

      {/* Overview & Rooms Tab */}
      {(activeTab === 'overview' || activeTab === 'rooms') && (
        <DashboardCard
          title="Dormitory Room Inventory"
          description="Current listing of rooms, occupancy status, and monthly pricing"
        >
          <DataTable columns={roomColumns} data={rooms} />
        </DashboardCard>
      )}

      {/* Inquiries Tab */}
      {(activeTab === 'overview' || activeTab === 'inquiries') && (
        <DashboardCard
          title="Recent Inquiries"
          description="Prospective residents requesting room reservations and viewings"
        >
          <DataTable columns={inquiryColumns} data={mockInquiries} />
        </DashboardCard>
      )}

      {/* Maintenance Tab */}
      {activeTab === 'maintenance' && (
        <DashboardCard
          title="Maintenance Triage & Requests"
          description="Tenant issue reports, category triage, and repair resolution status"
        >
          <DataTable columns={maintenanceColumns} data={mockMaintenance} />
        </DashboardCard>
      )}

      {/* Curfew & Leaves Tab */}
      {activeTab === 'curfew' && (
        <DashboardCard
          title="Curfew & Overnight Leave Requests"
          description="Late returns and leave approvals awaiting staff gate validation"
        >
          <DataTable columns={curfewColumns} data={mockCurfew} />
        </DashboardCard>
      )}

      {/* Staff Management Tab (Owner Only) */}
      {activeTab === 'staff' && isOwner && (
        <DashboardCard
          title="Staff Accounts & Role Management"
          description="Owner administrative control for provisioning and managing staff credentials"
        >
          <DataTable columns={staffColumns} data={mockStaffList} />
        </DashboardCard>
      )}

      {/* Financial Ledger (Owner Only) */}
      {activeTab === 'finance' && isOwner && (
        <DashboardCard
          title="Financial Ledger & Rental Receipts"
          description="Owner-exclusive financial balance, billing verifications, and income reports"
        >
          <p style={{ color: 'var(--taupe)', fontSize: '13px', margin: '10px 0' }}>
            All verified payments across GCash, Maya, and cash transactions are synchronized in real-time with the database ledger.
          </p>
          <DataTable columns={roomColumns} data={rooms} />
        </DashboardCard>
      )}
    </DashboardLayout>
  );
}

export default DashboardPage;
