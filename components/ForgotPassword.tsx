
import React, { useState } from 'react';
import { View } from '../types';
import { authService } from '../services/authService';

interface ForgotPasswordProps {
  onNavigate: (view: View) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fixed: handleEmailSubmit is now async to handle the Promise returned by getUsers
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Fixed: Added await for getUsers call
    const users = await authService.getUsers();
    const userExists = users.some(u => u.email === email);

    if (userExists) {
      setStep(2);
    } else {
      setError('This email is not registered with GlobalPath.');
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      // Fixed: Passing both email and newPassword to resetPassword (now supported by updated service signature)
      await authService.resetPassword(email, newPassword);
      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
        
        {step === 1 && (
          <div className="animate-fadeIn">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg">
                <i className="fas fa-key text-3xl"></i>
              </div>
            </div>
            <h2 className="text-center text-3xl font-black text-gray-900 mb-2">Reset Password</h2>
            <p className="text-center text-sm text-gray-500 font-medium mb-8">
              Enter your registered email to find your account.
            </p>
            
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold flex items-center animate-shake">
                  <i className="fas fa-exclamation-circle mr-3"></i> {error}
                </div>
              )}
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Student Email</label>
                <input
                  type="email" required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  placeholder="name@email.com"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#002B49] text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-all"
              >
                Find Account
              </button>
              <button
                type="button"
                onClick={() => onNavigate(View.AUTH)}
                className="w-full text-[10px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-widest"
              >
                Back to Login
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fadeIn">
            <div className="flex justify-center mb-6">
              <div className="bg-green-500 text-white p-4 rounded-2xl shadow-lg">
                <i className="fas fa-shield-alt text-3xl"></i>
              </div>
            </div>
            <h2 className="text-center text-3xl font-black text-gray-900 mb-2">New Password</h2>
            <p className="text-center text-sm text-gray-500 font-medium mb-8">
              Account verified for <span className="text-blue-600">{email}</span>.
            </p>
            
            <form onSubmit={handlePasswordReset} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold flex items-center animate-shake">
                  <i className="fas fa-exclamation-circle mr-3"></i> {error}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">New Password</label>
                  <input
                    type="password" required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Confirm New Password</label>
                  <input
                    type="password" required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Update Password'}
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="text-center animate-fadeInScale">
            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <i className="fas fa-check text-4xl"></i>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase">Success!</h2>
            <p className="text-gray-500 font-medium mb-10">
              Your password has been updated. You can now access your GlobalPath portal using your new credentials.
            </p>
            <button
              onClick={() => onNavigate(View.AUTH)}
              className="w-full bg-[#002B49] text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-all"
            >
              Login Now
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;
