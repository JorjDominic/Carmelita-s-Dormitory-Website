function StatusBadge({ status, label }) {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, '-');
  return <span className={`dashboard-status is-${normalizedStatus}`}><span aria-hidden="true" />{label || status}</span>;
}

export default StatusBadge;
