
import React, { useState } from 'react';
import { SYLHET_OFFICE } from '../constants';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    
    // Simulate API call to Sylhet Office
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      // Reset success message after some time
      setTimeout(() => setIsSent(false), 8000);
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
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
        <div className="absolute top-0 right-0 opacity-[0.05] pointer-events-none select-none">
          <i className="fas fa-headset text-[500px] -mr-40 -mt-40"></i>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Contact Info Sidebar */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black text-[#002B49] mb-10 uppercase tracking-tight flex items-center">
                <span className="w-10 h-1 bg-blue-600 mr-4 rounded-full"></span>
                Official Desk
              </h2>
              <div className="grid gap-8">
                <div className="flex items-start space-x-6 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-blue-300 hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
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

                <div className="flex items-start space-x-6 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-green-300 hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="w-16 h-16 bg-green-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <i className="fab fa-whatsapp text-3xl"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-[#002B49] text-xl mb-2">WhatsApp Support</h4>
                    <p className="text-gray-600 font-bold text-lg">{SYLHET_OFFICE.phone}</p>
                    <p className="text-xs font-black text-green-600 uppercase tracking-widest mt-1">24/7 Digital Desk</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-purple-300 hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <i className="fas fa-envelope-open-text text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-[#002B49] text-xl mb-2">Email Desk</h4>
                    <p className="text-gray-600 font-bold text-lg">{SYLHET_OFFICE.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Overlay Area */}
            <div className="rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl h-80 relative bg-gray-200 group">
                <img 
                  src="https://images.unsplash.com/photo-1524666643752-b381eb00effb?auto=format&fit=crop&w=1200&q=80" 
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" 
                  alt="GlobalPath Office" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SYLHET_OFFICE.address)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/95 backdrop-blur-md px-10 py-5 rounded-2xl shadow-2xl border border-white/20 text-center transform hover:scale-110 transition-all"
                    >
                        <i className="fas fa-map-marked-alt text-blue-600 text-4xl mb-3 block"></i>
                        <div className="font-black text-[#002B49] text-sm uppercase tracking-[0.2em]">Open Navigation</div>
                    </a>
                </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white p-12 lg:p-16 rounded-[4rem] shadow-2xl border border-gray-100 relative overflow-hidden animate-slideInRight">
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-[#002B49] mb-4 uppercase tracking-tight">Direct Query</h2>
              <p className="text-gray-500 mb-12 font-medium">Built by RTM AKTU Students for the Sylhet community. Send us your questions.</p>
              
              {isSent ? (
                <div className="bg-green-50 text-green-800 p-12 rounded-[3rem] border border-green-100 text-center animate-fadeInScale">
                  <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                    <i className="fas fa-check text-4xl"></i>
                  </div>
                  <h3 className="text-3xl font-black mb-4 uppercase">Success!</h3>
                  <p className="text-lg font-medium leading-relaxed">
                    Assalamu Alaikum! Your asking has been received. <br/>
                    Our team in Sylhet will contact you shortly.
                  </p>
                  <button 
                    onClick={() => setIsSent(false)}
                    className="mt-10 text-green-600 font-black uppercase tracking-widest text-xs hover:underline"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="group">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 group-focus-within:text-blue-600 transition-colors">Full Name</label>
                      <input 
                        type="text" required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-600 outline-none transition-all font-semibold text-gray-800 shadow-inner"
                        placeholder="e.g. Aminul Islam"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 group-focus-within:text-blue-600 transition-colors">Phone</label>
                      <input 
                        type="tel" required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-600 outline-none transition-all font-semibold text-gray-800 shadow-inner"
                        placeholder="+880 1306..."
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 group-focus-within:text-blue-600 transition-colors">Email Address</label>
                    <input 
                      type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-600 outline-none transition-all font-semibold text-gray-800 shadow-inner"
                      placeholder="name@gmail.com"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 group-focus-within:text-blue-600 transition-colors">Study Pathway</label>
                    <select 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-gray-800 shadow-inner cursor-pointer"
                    >
                      <option value="">Select Target Country</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="USA">USA</option>
                      <option value="Australia">Australia</option>
                      <option value="Scholarship">Scholarship Only</option>
                    </select>
                  </div>

                  <div className="group">
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 group-focus-within:text-blue-600 transition-colors">Message</label>
                    <textarea 
                      required rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-blue-600 outline-none transition-all font-semibold text-gray-800 shadow-inner resize-none"
                      placeholder="Tell us about your background..."
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#002B49] text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl hover:bg-blue-600 transition-all flex items-center justify-center disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <i className="fas fa-circle-notch fa-spin"></i>
                    ) : (
                      <span className="flex items-center">
                        Submit Request<i className="fas fa-paper-plane ml-3 text-xs"></i>
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Link Footer */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-[#25D366] text-white rounded-2xl shadow-lg flex items-center justify-center">
                 <i className="fab fa-whatsapp text-3xl"></i>
              </div>
              <div>
                 <h4 className="font-black text-[#002B49] uppercase tracking-widest text-sm">Direct WhatsApp</h4>
                 <p className="text-gray-500 text-sm font-medium">Quick responses from our RTM AKTU Desk.</p>
              </div>
           </div>
           <a 
            href="https://wa.me/8801306466265" 
            className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-all"
           >
             Message 8801306466265
           </a>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
