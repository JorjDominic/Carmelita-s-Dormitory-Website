function EmptyState({ title, description, action, icon = '○' }) {
  return <div className="dashboard-empty-state"><span className="dashboard-empty-icon" aria-hidden="true">{icon}</span><h2>{title}</h2>{description && <p>{description}</p>}{action}</div>;
}

export default EmptyState;
