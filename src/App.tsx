import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import AIAnalysis from './components/AIAnalysis';
import LifestyleAdvisor from './components/LifestyleAdvisor';
import ChatBot from './components/ChatBot';
import { authService } from './utils/auth';
import type { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [showLanding, setShowLanding] = useState(true);
  const [showHome, setShowHome] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setShowLanding(false);
    setShowHome(false);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
    setShowHome(false);
  };

  const handleLearnMore = () => {
    setShowLanding(false);
    setShowHome(true);
  };

  const handleViewDemo = () => {
    setShowLanding(false);
    setShowHome(false);
  };

  const renderCurrentView = () => {
    if (!user) return null;

    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'analysis':
        return <AIAnalysis user={user} />;
      case 'lifestyle':
        return <LifestyleAdvisor user={user} />;
      case 'chat':
        return <ChatBot user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  // Show landing page first
  if (showLanding && !user) {
    return (
      <LandingPage 
        onGetStarted={handleGetStarted}
        onLearnMore={handleLearnMore}
      />
    );
  }

  // Show home page with detailed information
  if (showHome && !user) {
    return (
      <HomePage 
        onGetStarted={handleGetStarted}
        onViewDemo={handleViewDemo}
      />
    );
  }

  // Show login form
  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        user={user} 
      />
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;