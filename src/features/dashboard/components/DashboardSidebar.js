function DashboardSidebar({ brand, items, activeId, onNavigate }) {
  return <div className="dashboard-sidebar-content"><div className="dashboard-brand">{brand}</div><nav className="dashboard-nav" aria-label="Dashboard navigation">{items.map((item) => <a className={item.id === activeId ? 'is-active' : ''} href={item.href || '#'} key={item.id} onClick={(event) => { if (onNavigate) { event.preventDefault(); onNavigate(item); } }}>{item.icon && <span className="dashboard-nav-icon" aria-hidden="true">{item.icon}</span>}<span>{item.label}</span>{item.badge !== undefined && <span className="dashboard-nav-badge">{item.badge}</span>}</a>)}</nav></div>;
}

export default DashboardSidebar;
