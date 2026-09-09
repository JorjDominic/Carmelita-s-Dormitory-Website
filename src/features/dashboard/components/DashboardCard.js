function DashboardCard({ title, description, action, children, className = '' }) {
  return <section className={`dashboard-card ${className}`}><div className="dashboard-card-heading"><div>{title && <h2>{title}</h2>}{description && <p>{description}</p>}</div>{action}</div>{children}</section>;
}

export default DashboardCard;
