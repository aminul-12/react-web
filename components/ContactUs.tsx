
import React, { useState } from 'react';
import { SYLHET_OFFICE } from '../constants';
import { leadService } from '../services/leadService';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await leadService.submitLead({
        studentName: formData.name,
        email: formData.email,
        phone: formData.phone,
        targetCountry: formData.subject,
        message: formData.message
      });
      
      setIsSent(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 8000);
    } catch (err: any) {
      setError(err.message || 'Failed to send your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#002B49] text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center animate-fadeIn">
          <span className="bg-blue-600 text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.25em] mb-8 inline-block shadow-2xl animate-bounce">
            RTM AKTU Campus Hub
          </span>
          <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
            Connect With Our <br/> <span className="text-blue-400">Sylhet Team</span>
          </h1>
          <p className="text-blue-100/80 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            Direct access to international education experts right at Sylhet TV Gate. Visit us for a personalized profile assessment.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <h2 className="text-3xl font-black text-[#002B49] mb-10 uppercase tracking-tight flex items-center">
              <span className="w-10 h-1 bg-blue-600 mr-4 rounded-full"></span>
              Official Desk
            </h2>
            <div className="grid gap-8">
              <div className="flex items-start space-x-6 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:border-blue-300 transition-all">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0">
                  <i className="fas fa-map-marker-alt text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-black text-[#002B49] text-xl mb-2">Campus Office</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {SYLHET_OFFICE.address} <br/>
                    <span className="text-xs font-black text-blue-500 uppercase tracking-widest mt-2 inline-block">{SYLHET_OFFICE.landmark}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 lg:p-16 rounded-[4rem] shadow-2xl border border-gray-100 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-[#002B49] mb-4 uppercase tracking-tight">Direct Query</h2>
              
              {isSent ? (
                <div className="bg-green-50 text-green-800 p-12 rounded-[3rem] border border-green-100 text-center animate-fadeInScale">
                  <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                    <i className="fas fa-check text-4xl"></i>
                  </div>
                  <h3 className="text-3xl font-black mb-4 uppercase">Success!</h3>
                  <p className="text-lg font-medium">Your request has been received. Our Sylhet team will call you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl font-bold text-sm">{error}</div>}
                  <div className="grid md:grid-cols-2 gap-8">
                    <input 
                      type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-600 outline-none transition-all font-semibold shadow-inner"
                      placeholder="Full Name"
                    />
                    <input 
                      type="tel" required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-600 outline-none transition-all font-semibold shadow-inner"
                      placeholder="Phone Number"
                    />
                  </div>
                  <input 
                    type="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-600 outline-none transition-all font-semibold shadow-inner"
                    placeholder="Email Address"
                  />
                  <select 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-600 outline-none transition-all font-bold shadow-inner"
                  >
                    <option value="">Select Target Country</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="USA">USA</option>
                    <option value="Australia">Australia</option>
                  </select>
                  <textarea 
                    required rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-blue-600 outline-none transition-all font-semibold shadow-inner resize-none"
                    placeholder="Tell us about your background..."
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#002B49] text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl hover:bg-blue-600 transition-all flex items-center justify-center disabled:opacity-50"
                  >
                    {isSubmitting ? <i className="fas fa-circle-notch fa-spin"></i> : 'Submit Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
