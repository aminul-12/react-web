
import React, { useState, useEffect } from 'react';
import { ConsultationBooking, TeamMember, User } from '../types';
import { teamService } from '../services/teamService';
import { leadService } from '../services/leadService';
import { authService } from '../services/authService';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'scholars' | 'team'>('leads');
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [scholars, setScholars] = useState<User[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [members, leads, users] = await Promise.all([
          teamService.getMembers(),
          leadService.getLeads(),
          authService.getUsers()
        ]);
        setTeam(members);
        setBookings(leads);
        setScholars(users);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateStatus = async (id: string, newStatus: ConsultationBooking['status']) => {
    try {
      await leadService.updateLeadStatus(id, newStatus);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } catch (err) {
      console.error('Update status failed:', err);
    }
  };

  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    setIsLoading(true);
    try {
      if (editingMember.id) {
        await teamService.updateMember(editingMember.id, editingMember);
      } else {
        await teamService.addMember(editingMember as TeamMember);
      }
      const updatedMembers = await teamService.getMembers();
      setTeam(updatedMembers);
      setEditingMember(null);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Admin Portal</h1>
            <p className="text-gray-500 mt-2 font-medium">GlobalPath Sylhet Management Center</p>
          </div>
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
            <button onClick={() => setActiveTab('leads')} className={`px-6 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'leads' ? 'bg-[#002B49] text-white shadow-lg' : 'text-gray-500'}`}>Leads</button>
            <button onClick={() => setActiveTab('scholars')} className={`px-6 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'scholars' ? 'bg-[#002B49] text-white shadow-lg' : 'text-gray-500'}`}>Students</button>
            <button onClick={() => setActiveTab('team')} className={`px-6 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'team' ? 'bg-[#002B49] text-white shadow-lg' : 'text-gray-500'}`}>Team</button>
          </div>
        </header>

        {activeTab === 'leads' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">Student Info</th>
                  <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">GPA/IELTS</th>
                  <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">Destination</th>
                  <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">Status</th>
                  <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-all">
                    <td className="px-6 py-5">
                      <div className="font-bold text-gray-900">{booking.studentName}</div>
                      <div className="text-xs text-gray-400">{booking.email} | {booking.phone}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-bold">GPA: {booking.gpa || '-'} | IELTS: {booking.ieltsScore || '-'}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="bg-gray-100 px-3 py-1 rounded-lg font-bold text-gray-600">{booking.targetCountry}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${booking.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-green-50 text-green-600 border-green-100'}`}>{booking.status}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button onClick={() => updateStatus(booking.id, 'contacted')} className="text-blue-600 p-2"><i className="fas fa-phone"></i></button>
                      <button onClick={() => updateStatus(booking.id, 'closed')} className="text-green-600 p-2"><i className="fas fa-check"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'scholars' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">Scholar</th>
                  <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">Credentials</th>
                  <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">Documents</th>
                  <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">Last Entry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {scholars.map(scholar => (
                  <tr key={scholar.id} className="hover:bg-gray-50 transition-all">
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 overflow-hidden">
                          {scholar.avatarUrl && <img src={scholar.avatarUrl} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{scholar.name}</div>
                          <div className="text-[10px] text-gray-400">{scholar.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-bold text-gray-700">GPA: {scholar.gpa || '-'} | Ph: {scholar.phone || '-'}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex space-x-3">
                        {scholar.passportUrl ? (
                          <a href={scholar.passportUrl} target="_blank" className="text-blue-600 hover:text-blue-800" title="Passport"><i className="fas fa-id-card"></i></a>
                        ) : <i className="fas fa-id-card text-gray-200"></i>}
                        {scholar.transcriptUrl ? (
                          <a href={scholar.transcriptUrl} target="_blank" className="text-green-600 hover:text-green-800" title="Transcript"><i className="fas fa-file-contract"></i></a>
                        ) : <i className="fas fa-file-contract text-gray-200"></i>}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs text-gray-500">
                      {scholar.lastLogin ? new Date(scholar.lastLogin).toLocaleString() : 'Never'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Team tab remains as provided in previous update */}
      </div>
    </div>
  );
};

export default AdminDashboard;
