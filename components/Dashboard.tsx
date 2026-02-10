
import React, { useState, useEffect } from 'react';
import { User, View } from '../types';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: View) => void;
  onUpdateUser: (updatedUser: User) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onNavigate, onUpdateUser }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'academic'>('basic');
  const [isUpdating, setIsUpdating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: boolean }>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [updateError, setUpdateError] = useState('');

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

  // Clear toasts automatically
  useEffect(() => {
    if (successMessage || updateError) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setUpdateError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, updateError]);

  useEffect(() => {
    setFormData({
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
  }, [user]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'passport' | 'transcript') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress(prev => ({ ...prev, [type]: true }));
    setSuccessMessage('');
    setUpdateError('');

    try {
      const publicUrl = await storageService.uploadDocument(user.id, file, type);
      const updatedUser = { ...user, [`${type}Url`]: publicUrl };
      onUpdateUser(updatedUser as User);
      setSuccessMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`);
    } catch (err: any) {
      setUpdateError(err.message || `Upload failed for ${type}`);
    } finally {
      setUploadProgress(prev => ({ ...prev, [type]: false }));
      // Reset input value to allow re-uploading the same file
      e.target.value = '';
    }
  };

  const calculateProfileStrength = () => {
    let score = 20;
    if (user.phone) score += 10;
    if (user.preferredCountry) score += 10;
    if (user.gpa) score += 15;
    if (user.ieltsScore?.overall) score += 15;
    if (user.passportUrl) score += 15;
    if (user.transcriptUrl) score += 15;
    return Math.min(score, 100);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError('');
    setSuccessMessage('');
    try {
      const updatedUser = await authService.updateProfile({
        name: formData.name,
        phone: formData.phone,
        preferredCountry: formData.preferredCountry,
        gpa: formData.gpa,
        ieltsScore: formData.ielts,
        passport: formData.passport
      });
      if (updatedUser) {
        onUpdateUser(updatedUser);
        setSuccessMessage('Profile data synchronized successfully!');
        setIsEditModalOpen(false);
      }
    } catch (err: any) {
      setUpdateError(err.message || 'Failed to update record.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Professional Notification Toasts */}
        <div className="fixed top-24 right-6 z-[200] space-y-3 pointer-events-none">
          {successMessage && (
            <div className="bg-[#002B49] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-slideInRight pointer-events-auto border border-blue-400/30">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <i className="fas fa-check text-xs"></i>
              </div>
              <span className="font-black uppercase tracking-widest text-[10px]">{successMessage}</span>
            </div>
          )}
          {updateError && (
            <div className="bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-shake pointer-events-auto">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fas fa-exclamation text-xs"></i>
              </div>
              <span className="font-black uppercase tracking-widest text-[10px]">{updateError}</span>
            </div>
          )}
        </div>

        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white flex items-center justify-center transition-transform hover:scale-105">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-black text-white">{user.name.charAt(0)}</span>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#002B49] text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-all border-4 border-white group">
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'avatar')} />
                {uploadProgress.avatar ? <i className="fas fa-spinner fa-spin text-sm"></i> : <i className="fas fa-camera text-sm"></i>}
              </label>
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">Salaam, {user.name.split(' ')[0]}</h1>
              <p className="text-gray-500 font-medium tracking-tight">Scholar ID: GP-{user.id.toUpperCase().slice(0, 8)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsEditModalOpen(true)} className="bg-white text-blue-600 border border-blue-200 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-blue-50 transition-all">
              <i className="fas fa-edit mr-2"></i> Edit Profile
            </button>
            <button onClick={onLogout} className="bg-red-50 text-red-600 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-all">
              Sign Out
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Progress Card */}
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1.5 bg-blue-600 transition-all duration-1000" style={{ width: `${calculateProfileStrength()}%` }}></div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest flex items-center">
                  <i className="fas fa-chart-line mr-3 text-blue-600"></i> Admission Readiness
                </h2>
                <span className="text-sm font-black text-blue-600">{calculateProfileStrength()}%</span>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000 ease-out shadow-lg" style={{ width: `${calculateProfileStrength()}%` }}></div>
              </div>
              <p className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                Complete your profile to unlock direct applications to 18 Canadian Hub Universities.
              </p>
            </div>

            {/* Document Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl transition-all">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110 ${user.passportUrl ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                  {uploadProgress.passport ? (
                    <i className="fas fa-spinner fa-spin text-3xl"></i>
                  ) : (
                    <i className={`fas ${user.passportUrl ? 'fa-check-circle' : 'fa-id-card'} text-3xl`}></i>
                  )}
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-2">Passport Bio Page</h3>
                {user.passportUrl ? (
                  <a href={user.passportUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:underline mb-4 flex items-center">
                    View Document <i className="fas fa-external-link-alt ml-2 text-[10px]"></i>
                  </a>
                ) : (
                  <p className="text-xs text-gray-400 mb-4">Official scanned copy required</p>
                )}
                <label className="cursor-pointer bg-[#002B49] text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-md">
                  <input type="file" className="hidden" accept=".pdf,image/*" onChange={(e) => handleFileUpload(e, 'passport')} />
                  {uploadProgress.passport ? 'Uploading...' : (user.passportUrl ? 'Replace Document' : 'Upload Passport')}
                </label>
              </div>

              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl transition-all">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110 ${user.transcriptUrl ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                  {uploadProgress.transcript ? (
                    <i className="fas fa-spinner fa-spin text-3xl"></i>
                  ) : (
                    <i className={`fas ${user.transcriptUrl ? 'fa-check-circle' : 'fa-file-contract'} text-3xl`}></i>
                  )}
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-2">Academic Transcript</h3>
                {user.transcriptUrl ? (
                  <a href={user.transcriptUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-green-600 hover:underline mb-4 flex items-center">
                    View Document <i className="fas fa-external-link-alt ml-2 text-[10px]"></i>
                  </a>
                ) : (
                  <p className="text-xs text-gray-400 mb-4">HSC or Degree marksheet</p>
                )}
                <label className="cursor-pointer bg-[#002B49] text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-green-600 transition-all shadow-md">
                  <input type="file" className="hidden" accept=".pdf,image/*" onChange={(e) => handleFileUpload(e, 'transcript')} />
                  {uploadProgress.transcript ? 'Uploading...' : (user.transcriptUrl ? 'Replace Document' : 'Upload Transcript')}
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#002B49] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <i className="fas fa-shield-halved absolute -bottom-10 -right-10 text-[180px] opacity-[0.03]"></i>
              <h3 className="text-xl font-black uppercase mb-8 tracking-tight flex items-center">
                <i className="fas fa-sync-alt mr-3 text-blue-400"></i> Cloud Portal
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Status</div>
                  <div className="text-sm font-medium flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span> Synchronized
                  </div>
                </div>
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Registration</div>
                  <div className="text-sm font-medium">{new Date(user.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
               <h4 className="font-black text-gray-900 mb-4">Sylhet Support Desk</h4>
               <p className="text-xs text-gray-500 mb-6 font-medium leading-relaxed">Need help with document sizing? Our JR Tower desk is active on WhatsApp.</p>
               <a href="https://wa.me/8801306466265" target="_blank" rel="noreferrer" className="block bg-[#25D366] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg hover:scale-105 transition-all">
                  Chat via WhatsApp
               </a>
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-fadeInScale">
            <div className="bg-[#002B49] p-8 text-white flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase tracking-tight">Portal Update</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="w-12 h-12 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="flex bg-gray-50 border-b">
              <button onClick={() => setActiveTab('basic')} className={`flex-1 py-5 text-[10px] font-black uppercase transition-all ${activeTab === 'basic' ? 'bg-white text-blue-600 border-b-4 border-blue-600 shadow-inner' : 'text-gray-400 hover:bg-gray-100'}`}>Basic Info</button>
              <button onClick={() => setActiveTab('academic')} className={`flex-1 py-5 text-[10px] font-black uppercase transition-all ${activeTab === 'academic' ? 'bg-white text-blue-600 border-b-4 border-blue-600 shadow-inner' : 'text-gray-400 hover:bg-gray-100'}`}>Academic Record</button>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="p-10 space-y-8">
              {activeTab === 'basic' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Full Name</label>
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-5 bg-gray-50 border rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Phone Number</label>
                      <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-5 bg-gray-50 border rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Target Destination</label>
                    <select 
                      value={formData.preferredCountry} 
                      onChange={e => setFormData({...formData, preferredCountry: e.target.value})} 
                      className="w-full p-5 bg-gray-50 border rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold"
                    >
                      <option value="">Select Region</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="USA">USA</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              )}
              {activeTab === 'academic' && (
                <div className="space-y-6 animate-fadeIn">
                   <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Latest GPA (out of 5.0)</label>
                    <input type="text" value={formData.gpa} onChange={e => setFormData({...formData, gpa: e.target.value})} className="w-full p-5 bg-gray-50 border rounded-2xl outline-none font-bold" placeholder="e.g. 4.85" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Overall IELTS</label>
                      <input type="text" value={formData.ielts.overall} onChange={e => setFormData({...formData, ielts: {...formData.ielts, overall: e.target.value}})} className="w-full p-5 bg-gray-50 border rounded-2xl font-bold" placeholder="e.g. 7.0" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Passport Number</label>
                      <input type="text" value={formData.passport.number} onChange={e => setFormData({...formData, passport: {...formData.passport, number: e.target.value}})} className="w-full p-5 bg-gray-50 border rounded-2xl font-bold" placeholder="A12345678" />
                    </div>
                  </div>
                </div>
              )}
              <div className="pt-4">
                <button type="submit" disabled={isUpdating} className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center text-xs">
                  {isUpdating ? (
                    <><i className="fas fa-spinner fa-spin mr-3"></i> Syncing Portal...</>
                  ) : 'Confirm Changes'}
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
