import { useState, useEffect } from 'react';
import HomePage from '../features/home/pages/HomePage';
import { DashboardPage } from '../features/dashboard';

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => window.location.hash || '');

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

  if (currentRoute === '#dashboard') {
    return <DashboardPage onNavigateHome={navigateToHome} />;
  }

  return <HomePage />;
}

export default App;
