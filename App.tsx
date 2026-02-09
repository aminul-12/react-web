
import React, { useState, useEffect } from 'react';
import { View, User } from './types';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Destinations from './components/Destinations';
import Services from './components/Services';
import AIAdvisor from './components/AIAdvisor';
import AdminDashboard from './components/AdminDashboard';
import Documentation from './components/Documentation';
import Footer from './components/Footer';
import EligibilityChecker from './components/EligibilityChecker';
import CostCalculator from './components/CostCalculator';
import Scholarships from './components/Scholarships';
import Auth from './components/Auth';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import OurTeam from './components/OurTeam';
import ContactUs from './components/ContactUs';
import VisaGuidance from './components/VisaGuidance';
import { authService } from './services/authService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [viewContext, setViewContext] = useState<any>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = authService.getCurrentUser();
    if (savedUser) setUser(savedUser);
    
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleNavigate = (view: View, context?: any) => {
    setViewContext(context);
    setCurrentView(view);
  };

  const handleAuthSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    handleNavigate(View.DASHBOARD);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    handleNavigate(View.HOME);
  };

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Home onNavigate={handleNavigate} />;
      case View.DESTINATIONS:
        return <Destinations />;
      case View.SERVICES:
        return <Services />;
      case View.AI_ADVISOR:
        return <AIAdvisor initialContext={viewContext} />;
      case View.ADMIN:
        return <AdminDashboard />;
      case View.DOCS:
        return <Documentation />;
      case View.ELIGIBILITY:
        return <EligibilityChecker />;
      case View.CALCULATOR:
        return <CostCalculator />;
      case View.SCHOLARSHIPS:
        return <Scholarships />;
      case View.TEAM:
        return <OurTeam />;
      case View.CONTACT:
        return <ContactUs />;
      case View.VISA:
        return <VisaGuidance onNavigate={handleNavigate} />;
      case View.AUTH:
        return <Auth onAuthSuccess={handleAuthSuccess} onNavigate={handleNavigate} />;
      case View.RESET_PASSWORD:
        return <ForgotPassword onNavigate={handleNavigate} />;
      case View.DASHBOARD:
        return user ? (
          <Dashboard 
            user={user} 
            onLogout={handleLogout} 
            onNavigate={handleNavigate} 
            onUpdateUser={handleUpdateUser}
          />
        ) : (
          <Auth onAuthSuccess={handleAuthSuccess} onNavigate={handleNavigate} />
        );
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar currentView={currentView} onNavigate={handleNavigate} user={user} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer onNavigate={handleNavigate} />
      
      {/* Sylhet WhatsApp Desk - Student Built Project */}
      <a 
        href="https://wa.me/8801306466265" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-50 group"
        title="Chat with Sylhet Desk"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
        <span className="absolute right-16 bg-white text-gray-800 px-3 py-1 rounded text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all border shadow-sm">
          RTM AKTU Desk Online
        </span>
      </a>
    </div>
  );
};

export default App;
