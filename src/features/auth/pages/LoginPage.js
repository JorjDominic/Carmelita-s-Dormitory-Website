import '../Auth.css';
import LoginForm from '../components/LoginForm';

function LoginPage({ onLoginSuccess, onNavigateHome }) {
  const handleSuccess = (profile) => {
    if (onLoginSuccess) {
      onLoginSuccess(profile);
    } else {
      window.location.hash = '#dashboard';
    }
  };

  const handleReturnHome = (e) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.hash = '#home';
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <div className="auth-brand-seal" aria-hidden="true">
            C
          </div>
          <h1 className="auth-title">Carmelita’s</h1>
          <span className="auth-subtitle">Dormitory Management</span>
          <div className="auth-badge">CarmeLink Staff Portal</div>
        </header>

        <LoginForm onSuccess={handleSuccess} />

        <div className="tenant-notice-box">
          <strong>Are you a Tenant or Guardian?</strong>
          Please use the <em>CarmeLink</em> mobile application to manage rent payments, curfew permits, and announcements. This web portal is restricted to authorized dormitory staff.
        </div>

        <div className="auth-footer-nav">
          <a href="#home" className="back-home-link" onClick={handleReturnHome}>
            ← Return to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

