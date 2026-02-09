
import React, { useState, useEffect } from 'react';
import { View, User } from '../types';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { label: 'Home', view: View.HOME },
    { label: 'Scholarships', view: View.SCHOLARSHIPS },
    { label: 'Visa Help', view: View.VISA },
    { label: 'Destinations', view: View.DESTINATIONS },
    { label: 'AI Advisor', view: View.AI_ADVISOR },
    { label: 'Contact', view: View.CONTACT },
  ];

  // Helper for professional initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const MenuButton = () => (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="relative z-[60] flex items-center justify-center w-12 h-12 rounded-2xl bg-white hover:bg-gray-50 border border-gray-100 shadow-sm transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      aria-expanded={isMenuOpen}
      aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
    >
      <div className="relative w-6 h-5 flex flex-col justify-between items-center overflow-hidden">
        <span 
          className={`h-0.5 rounded-full bg-[#002B49] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isMenuOpen 
              ? 'w-full rotate-45 translate-y-[9px]' 
              : 'w-7/12 self-start group-hover:w-full'
          }`}
        ></span>
        <span 
          className={`h-0.5 w-full rounded-full bg-[#002B49] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isMenuOpen ? 'opacity-0 -translate-x-full' : 'opacity-100 translate-x-0'
          }`}
        ></span>
        <span 
          className={`h-0.5 rounded-full bg-[#002B49] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isMenuOpen 
              ? 'w-full -rotate-45 -translate-y-[9px]' 
              : 'w-7/12 self-end group-hover:w-full'
          }`}
        ></span>
      </div>
      <div className="absolute inset-0 rounded-2xl bg-blue-500/0 group-hover:bg-blue-500/5 group-active:scale-95 transition-all duration-300 pointer-events-none"></div>
    </button>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => { onNavigate(View.HOME); setIsMenuOpen(false); }}
          >
            <div className="bg-[#002B49] text-white p-2.5 rounded-xl mr-3 shadow-lg shadow-blue-900/10 group-hover:scale-110 transition-transform">
              <i className="fas fa-globe-americas text-xl"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-[#002B49] leading-none tracking-tight">GlobalPath</span>
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-0.5">Sylhet Branch</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`text-[12px] font-bold transition-all uppercase tracking-wider relative group py-2 ${
                  currentView === item.view ? 'text-blue-600' : 'text-gray-500 hover:text-blue-900'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-300 ${currentView === item.view ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}></span>
              </button>
            ))}
            
            {user ? (
              <button
                onClick={() => onNavigate(View.DASHBOARD)}
                className="flex items-center space-x-4 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl flex items-center justify-center text-xs font-black shadow-lg group-hover:scale-105 transition-transform">
                  {getInitials(user.name)}
                </div>
                <div className="text-left hidden lg:block">
                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Scholar</span>
                    <span className="text-sm font-black text-[#002B49] leading-none">{user.name.split(' ')[0]}</span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => onNavigate(View.AUTH)}
                className="bg-[#002B49] text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-800 shadow-md hover:shadow-blue-200 transition-all active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <MenuButton />
          </div>
        </div>
      </div>

      <div 
        className={`fixed inset-0 top-20 bg-white z-40 md:hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="space-y-2">
            {navItems.map((item, idx) => (
              <button
                key={item.view}
                onClick={() => { onNavigate(item.view); setIsMenuOpen(false); }}
                style={{ transitionDelay: `${idx * 50}ms` }}
                className={`w-full text-left px-8 py-5 text-lg font-black rounded-3xl transition-all flex items-center justify-between transform ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                } ${
                  currentView === item.view 
                    ? 'bg-blue-50 text-blue-600 shadow-inner' 
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="uppercase tracking-tight">{item.label}</span>
                <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform ${currentView === item.view ? 'rotate-0' : '-rotate-45 opacity-0'}`}>
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </div>
              </button>
            ))}
          </div>

          <div className={`mt-auto pt-10 border-t border-gray-100 transition-all duration-700 delay-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {!user ? (
              <button
                onClick={() => { onNavigate(View.AUTH); setIsMenuOpen(false); }}
                className="w-full bg-[#002B49] text-white py-5 rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-200 active:scale-95 transition-transform"
              >
                Portal Login
              </button>
            ) : (
              <div className="flex items-center justify-between bg-gray-50 p-6 rounded-[2rem]">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-xl">
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-900">{user.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Student Portal Active</div>
                  </div>
                </div>
                <button 
                  onClick={() => { onNavigate(View.DASHBOARD); setIsMenuOpen(false); }}
                  className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-blue-600 active:scale-90 transition-transform"
                >
                  <i className="fas fa-cog"></i>
                </button>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
                RTM AKTU Campus Project 2024
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="fixed inset-0 bg-blue-900/10 backdrop-blur-sm z-30 md:hidden" aria-hidden="true" />
      )}
    </nav>
  );
};

export default Navbar;
