
import React from 'react';

const Services: React.FC = () => {
  const serviceList = [
    { title: 'SOP & Motivation Letter', desc: 'Craft high-impact statements that convince admission committees.', icon: 'fa-file-alt', color: 'blue' },
    { title: 'Visa Processing', desc: 'Step-by-step guidance for Tier 4, Study Permit, and F-1 visas.', icon: 'fa-passport', color: 'green' },
    { title: 'IELTS/PTE Coaching', desc: 'Interactive resources and mock tests to ace your English proficiency tests.', icon: 'fa-book-open', color: 'purple' },
    { title: 'Scholarship Guidance', desc: 'Identify and apply for fully-funded and partial scholarship programs.', icon: 'fa-hand-holding-usd', color: 'yellow' },
    { title: 'Pre-Departure Briefing', desc: 'Essential knowledge for adjusting to life and culture in your new country.', icon: 'fa-plane-departure', color: 'orange' },
    { title: 'Bank Solvency Advice', desc: 'Expert guidance on financial document preparation and bank statements.', icon: 'fa-university', color: 'indigo' },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">A Complete Suite of <br/><span className="text-blue-600">Student Services</span></h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">From the first session to your first day at campus, we support you through every hurdle of your international journey.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {serviceList.map((service, idx) => (
                <div key={idx} className="relative p-10 rounded-3xl border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -mr-10 -mt-10 group-hover:bg-blue-50 transition-all"></div>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-8 transition-all shadow-sm ${
                        service.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        service.color === 'green' ? 'bg-green-100 text-green-600' :
                        service.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                        service.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                        service.color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-indigo-100 text-indigo-600'
                    }`}>
                        <i className={`fas ${service.icon}`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-500 leading-relaxed mb-8">{service.desc}</p>
                    <button className="text-sm font-black uppercase tracking-widest text-blue-600 flex items-center group-hover:translate-x-2 transition-transform">
                        Learn More <i className="fas fa-chevron-right ml-2 text-[10px]"></i>
                    </button>
                </div>
            ))}
        </div>

        {/* Consultation Call to Action */}
        <div className="mt-24 gradient-bg rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 opacity-10">
                <i className="fas fa-paper-plane text-[300px] -ml-20 -mt-20"></i>
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Still Unsure About Your Future?</h2>
                <p className="text-blue-100 mb-10 text-lg">Our experts offer a free 30-minute consultation to evaluate your profile and recommend the best paths for you.</p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <button className="bg-white text-blue-700 px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl">
                        Schedule Call
                    </button>
                    <button className="bg-blue-800/40 border border-white/20 px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-blue-800 transition-all">
                        Chat on Messenger
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
