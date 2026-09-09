function StatCard({ label, value, change, trend = 'neutral', icon }) {
  return <article className="dashboard-stat-card">{icon && <span className="dashboard-stat-icon" aria-hidden="true">{icon}</span>}<p>{label}</p><strong>{value}</strong>{change && <span className={`dashboard-stat-change is-${trend}`}>{change}</span>}</article>;
}

export default StatCard;
