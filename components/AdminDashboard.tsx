
import React, { useState, useEffect } from 'react';
import { ConsultationBooking, TeamMember } from '../types';
import { teamService } from '../services/teamService';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'team'>('leads');
  const [bookings, setBookings] = useState<ConsultationBooking[]>([
    { id: '1', studentName: 'Imran Ahmed', email: 'imran@example.com', phone: '01712345678', targetCountry: 'UK', status: 'pending', date: '2024-03-25' },
    { id: '2', studentName: 'Fariha Jannat', email: 'fariha@example.com', phone: '01887654321', targetCountry: 'Canada', status: 'contacted', date: '2024-03-24' },
  ]);
  
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);

  useEffect(() => {
    setTeam(teamService.getMembers());
  }, []);

  const updateStatus = (id: string, newStatus: ConsultationBooking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    
    if (editingMember.id) {
      teamService.updateMember(editingMember.id, editingMember);
    } else {
      teamService.addMember(editingMember as TeamMember);
    }
    setTeam(teamService.getMembers());
    setEditingMember(null);
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      teamService.deleteMember(id);
      setTeam(teamService.getMembers());
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Admin Portal</h1>
            <p className="text-gray-500 mt-2 font-medium">Control center for GlobalPath operations.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-200">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'leads' ? 'bg-[#002B49] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Consultation Leads
            </button>
            <button 
              onClick={() => setActiveTab('team')}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'team' ? 'bg-[#002B49] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Team Management
            </button>
          </div>
        </header>

        {activeTab === 'leads' ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">Student Details</th>
                    <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">Destination</th>
                    <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">Status</th>
                    <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map(booking => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-all">
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">{booking.studentName.charAt(0)}</div>
                          <div>
                            <div className="font-bold text-gray-900">{booking.studentName}</div>
                            <div className="text-xs text-gray-400">{booking.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="bg-gray-100 px-3 py-1 rounded-lg font-bold text-gray-600">{booking.targetCountry}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${booking.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button onClick={() => updateStatus(booking.id, 'closed')} className="text-blue-600 hover:text-blue-800 p-2"><i className="fas fa-check"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest">Global Team Database</h2>
              <button 
                onClick={() => setEditingMember({ name: '', designation: '', bio: '', imageUrl: '', status: 'active', order: team.length + 1, socialLinks: {} })}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-[#002B49] transition-all flex items-center"
              >
                <i className="fas fa-plus mr-2"></i> Add Team Member
              </button>
            </div>

            {editingMember && (
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 animate-fadeIn">
                <form onSubmit={handleSaveTeam} className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Full Name</label>
                      <input 
                        type="text" required
                        value={editingMember.name}
                        onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                        className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Designation</label>
                      <input 
                        type="text" required
                        value={editingMember.designation}
                        onChange={(e) => setEditingMember({ ...editingMember, designation: e.target.value })}
                        className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Bio / Description</label>
                      <textarea 
                        required rows={3}
                        value={editingMember.bio}
                        onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                        className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Profile Image URL</label>
                      <input 
                        type="text" required
                        value={editingMember.imageUrl}
                        onChange={(e) => setEditingMember({ ...editingMember, imageUrl: e.target.value })}
                        className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</label>
                        <select 
                          value={editingMember.status}
                          onChange={(e) => setEditingMember({ ...editingMember, status: e.target.value as 'active' })}
                          className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-medium"
                        >
                          <option value="active">Active (Visible)</option>
                          <option value="inactive">Inactive (Hidden)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Display Order</label>
                        <input 
                          type="number" 
                          value={editingMember.order}
                          onChange={(e) => setEditingMember({ ...editingMember, order: parseInt(e.target.value) })}
                          className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-medium"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button type="button" onClick={() => setEditingMember(null)} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-800">Cancel</button>
                      <button type="submit" className="bg-[#002B49] text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs">Save Member</button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map(member => (
                <div key={member.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start space-x-4">
                  <img src={member.imageUrl} className="w-16 h-16 rounded-2xl object-cover" />
                  <div className="flex-grow">
                    <h4 className="font-black text-gray-900">{member.name}</h4>
                    <p className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-tight">{member.designation}</p>
                    <div className={`text-[9px] font-black uppercase mb-3 ${member.status === 'active' ? 'text-green-500' : 'text-gray-400'}`}>
                      {member.status}
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => setEditingMember(member)} className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">Edit</button>
                      <button onClick={() => handleDeleteMember(member.id)} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
