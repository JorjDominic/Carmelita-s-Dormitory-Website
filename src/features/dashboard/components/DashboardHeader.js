function DashboardHeader({ title, subtitle, actions, user }) {
  return <div className="dashboard-header-content"><div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div><div className="dashboard-header-actions">{actions}{user && <div className="dashboard-user">{user.avatar && <img src={user.avatar} alt="" /> }<span><b>{user.name}</b>{user.role && <small>{user.role}</small>}</span></div>}</div></div>;
}

export default DashboardHeader;
