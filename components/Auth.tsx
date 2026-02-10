
import React, { useState } from 'react';
import { authService } from '../services/authService';
import { User, View } from '../types';

interface AuthProps {
  onAuthSuccess: (user: User) => void;
  onNavigate: (view: View) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess, onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const user = await authService.login(formData.email, formData.password);
        onAuthSuccess(user);
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        console.log('Initiating signup for:', formData.email);
        const user = await authService.signup(formData.name, formData.email, formData.password);
        console.log('Signup successful, navigating to dashboard');
        onAuthSuccess(user);
      }
    } catch (err: any) {
      console.error('Authentication Error:', err);
      setError(err.message || 'An unexpected error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
        <div>
          <div className="flex justify-center mb-6">
            <div className="bg-[#002B49] text-white p-4 rounded-2xl shadow-lg">
              <i className="fas fa-user-shield text-3xl"></i>
            </div>
          </div>
          <h2 className="text-center text-3xl font-black text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-medium">
            {isLogin ? 'Access your GlobalPath portal' : 'Join thousands of students in Sylhet'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold flex items-center animate-shake">
              <i className="fas fa-exclamation-circle mr-3"></i> {error}
            </div>
          )}
          
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                  placeholder="e.g. Imran Ahmed"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                placeholder="name@email.com"
              />
            </div>
            <div className="relative">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                placeholder="••••••••"
              />
            </div>
            {!isLogin && (
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label className="ml-2 block text-xs text-gray-500 font-bold uppercase tracking-wider">Remember me</label>
            </div>
            <div className="text-xs">
              <button 
                type="button"
                onClick={() => onNavigate(View.RESET_PASSWORD)}
                className="font-bold text-blue-600 hover:text-blue-500 uppercase tracking-wider"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-[#002B49] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all uppercase tracking-widest disabled:opacity-50"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-black text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center space-x-6">
           <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all">
             <i className="fab fa-google"></i>
           </button>
           <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-blue-800 hover:bg-blue-50 transition-all">
             <i className="fab fa-facebook-f"></i>
           </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
