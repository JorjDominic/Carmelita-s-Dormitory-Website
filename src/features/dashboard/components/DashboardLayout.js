import '../Dashboard.css';

function DashboardLayout({ sidebar, header, children }) {
  return <div className="dashboard-shell"><aside className="dashboard-sidebar">{sidebar}</aside><div className="dashboard-main"><header className="dashboard-header">{header}</header><main className="dashboard-content">{children}</main></div></div>;
}

export default DashboardLayout;
