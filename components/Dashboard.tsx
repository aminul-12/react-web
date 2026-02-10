
import React, { useState } from 'react';
import { User, View } from '../types';
import { authService } from '../services/authService';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: View) => void;
  onUpdateUser: (updatedUser: User) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onNavigate, onUpdateUser }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'academic' | 'documents'>('basic');
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone || '',
    preferredCountry: user.preferredCountry || '',
    gpa: user.gpa || '',
    ielts: {
      overall: user.ieltsScore?.overall || '',
      listening: user.ieltsScore?.listening || '',
      reading: user.ieltsScore?.reading || '',
      writing: user.ieltsScore?.writing || '',
      speaking: user.ieltsScore?.speaking || '',
    },
    passport: {
      number: user.passport?.number || '',
      expiryDate: user.passport?.expiryDate || '',
      fileName: user.passport?.fileName || '',
    }
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
  };

  const calculateProfileStrength = () => {
    let score = 20;
    if (user.phone) score += 10;
    if (user.preferredCountry) score += 10;
    if (user.gpa) score += 15;
    if (user.ieltsScore?.overall) score += 20;
    if (user.passport?.number) score += 25;
    return Math.min(score, 100);
  };

  // Fixed: Added await keyword to correctly handle the async call to updateProfile
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    const updatePayload: Partial<User> = {
      name: formData.name,
      phone: formData.phone,
      preferredCountry: formData.preferredCountry,
      gpa: formData.gpa,
      ieltsScore: formData.ielts,
      passport: formData.passport
    };

    const updatedUser = await authService.updateProfile(updatePayload);
    if (updatedUser) {
      onUpdateUser(updatedUser);
      setIsEditModalOpen(false);
    }
    setIsUpdating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-[2rem] flex items-center justify-center text-3xl font-black shadow-2xl border-4 border-white">
              {getInitials(user.name)}
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">Salaam, {user.name.split(' ')[0]}</h1>
              <p className="text-gray-500 font-medium">Student Portal ID: GP-{user.id.toUpperCase()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsEditModalOpen(true)} className="bg-white text-blue-600 border border-blue-200 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-blue-50 transition-all">
              <i className="fas fa-id-card-alt mr-2"></i> Manage Profile
            </button>
            <button onClick={onLogout} className="bg-red-50 text-red-600 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-all">
              Sign Out
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest">Profile Status</h2>
                <span className="text-sm font-black text-blue-600">{calculateProfileStrength()}%</span>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${calculateProfileStrength()}%` }}></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">IELTS Score</h3>
                {user.ieltsScore?.overall ? (
                  <div className="text-3xl font-black text-gray-900">{user.ieltsScore.overall} <span className="text-xs font-medium text-blue-600">Band</span></div>
                ) : (
                  <p className="text-gray-400 text-xs italic">No score provided</p>
                )}
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Passport</h3>
                {user.passport?.number ? (
                  <div className="text-lg font-black text-gray-900 truncate">{user.passport.number}</div>
                ) : (
                  <p className="text-gray-400 text-xs italic">Not linked</p>
                )}
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Current GPA</h3>
                {user.gpa ? (
                  <div className="text-3xl font-black text-gray-900">{user.gpa} <span className="text-xs font-medium text-blue-600">GPA</span></div>
                ) : (
                  <p className="text-gray-400 text-xs italic">Not provided</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden">
            <div className="bg-[#002B49] p-8 text-white flex justify-between">
              <h2 className="text-2xl font-black uppercase">Update Profile</h2>
              <button onClick={() => setIsEditModalOpen(false)}><i className="fas fa-times"></i></button>
            </div>
            <div className="flex bg-gray-50 border-b">
              <button onClick={() => setActiveTab('basic')} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest ${activeTab === 'basic' ? 'bg-white text-blue-600' : 'text-gray-400'}`}>Basic</button>
              <button onClick={() => setActiveTab('academic')} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest ${activeTab === 'academic' ? 'bg-white text-blue-600' : 'text-gray-400'}`}>IELTS</button>
              <button onClick={() => setActiveTab('documents')} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest ${activeTab === 'documents' ? 'bg-white text-blue-600' : 'text-gray-400'}`}>Passport</button>
            </div>
            <form onSubmit={handleUpdateProfile} className="p-10 space-y-6">
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-gray-50 border rounded-xl outline-none" placeholder="Full Name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Phone</label>
                      <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-4 bg-gray-50 border rounded-xl outline-none" placeholder="Phone" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Academic GPA</label>
                      <input type="text" value={formData.gpa} onChange={e => setFormData({...formData, gpa: e.target.value})} className="w-full p-4 bg-gray-50 border rounded-xl outline-none" placeholder="e.g. 5.00" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Preferred Country</label>
                    <select value={formData.preferredCountry} onChange={e => setFormData({...formData, preferredCountry: e.target.value})} className="w-full p-4 bg-gray-50 border rounded-xl outline-none">
                      <option value="">Target Country</option>
                      <option value="Canada">Canada</option>
                      <option value="UK">UK</option>
                      <option value="USA">USA</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              )}
              {activeTab === 'academic' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Overall Band Score</label>
                    <input type="text" value={formData.ielts.overall} onChange={e => setFormData({...formData, ielts: {...formData.ielts, overall: e.target.value}})} className="w-full p-4 bg-gray-50 border rounded-xl outline-none" placeholder="Overall Band" />
                  </div>
                  <input type="text" value={formData.ielts.listening} onChange={e => setFormData({...formData, ielts: {...formData.ielts, listening: e.target.value}})} className="p-4 bg-gray-50 border rounded-xl" placeholder="Listening" />
                  <input type="text" value={formData.ielts.reading} onChange={e => setFormData({...formData, ielts: {...formData.ielts, reading: e.target.value}})} className="p-4 bg-gray-50 border rounded-xl" placeholder="Reading" />
                </div>
              )}
              {activeTab === 'documents' && (
                <div className="space-y-4">
                  <input type="text" value={formData.passport.number} onChange={e => setFormData({...formData, passport: {...formData.passport, number: e.target.value}})} className="w-full p-4 bg-gray-50 border rounded-xl" placeholder="Passport Number" />
                  <input type="date" value={formData.passport.expiryDate} onChange={e => setFormData({...formData, passport: {...formData.passport, expiryDate: e.target.value}})} className="w-full p-4 bg-gray-50 border rounded-xl" />
                </div>
              )}
              <div className="pt-4">
                <button type="submit" disabled={isUpdating} className="w-full bg-blue-600 text-white py-5 rounded-xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all active:scale-[0.98]">
                  {isUpdating ? <i className="fas fa-spinner fa-spin"></i> : 'Update Portal Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
