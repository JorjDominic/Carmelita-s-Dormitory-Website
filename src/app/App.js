import { useState, useEffect } from 'react';
import HomePage from '../features/home/pages/HomePage';
import { DashboardPage } from '../features/dashboard';
import { LoginPage, getCurrentStaffUser, staffSignOut } from '../features/auth';

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => window.location.hash || '');
  const [currentUser, setCurrentUser] = useState(() => getCurrentStaffUser());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToHome = () => {
    window.location.hash = '#home';
    setCurrentRoute('#home');
  };

  const navigateToLogin = () => {
    window.location.hash = '#login';
    setCurrentRoute('#login');
  };

  const handleLoginSuccess = (profile) => {
    setCurrentUser(profile);
    window.location.hash = '#dashboard';
    setCurrentRoute('#dashboard');
  };

  const handleSignOut = async () => {
    await staffSignOut();
    setCurrentUser(null);
    navigateToLogin();
  };

  if (currentRoute === '#login') {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onNavigateHome={navigateToHome}
      />
    );
  }

  if (currentRoute === '#dashboard') {
    return (
      <DashboardPage
        user={
          currentUser || {
            full_name: 'Carmelita Ramos',
            role: 'owner',
            phone: '+63 917 555 0101',
          }
        }
        onNavigateHome={navigateToHome}
        onSignOut={handleSignOut}
      />
    );
  }

  return <HomePage />;
}

export default App;
