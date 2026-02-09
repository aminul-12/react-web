
import React, { useState } from 'react';
import { SCHOLARSHIPS } from '../constants';

const Scholarships: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('All');

  const filteredScholarships = SCHOLARSHIPS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = filterCountry === 'All' || s.country === filterCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-sm">Global Opportunity Hub</span>
            <div className="h-[1px] flex-grow bg-gray-200"></div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Top 160+ Prestigious <span className="text-blue-600">Global Scholarships</span></h1>
          <p className="text-gray-600 max-w-3xl text-lg leading-relaxed font-medium">
            Explore the world's most competitive fully-funded and partial scholarship programs. From the UK to Canada, your academic journey is fully supported.
          </p>
        </header>

        {/* Success Guide Banner */}
        <section className="bg-gradient-to-br from-[#002B49] to-[#004b7a] text-white p-8 lg:p-12 rounded-[2rem] shadow-2xl mb-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
             <i className="fas fa-graduation-cap text-[400px] -mr-32 -mt-32"></i>
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-black mb-6 flex items-center">
                 <i className="fas fa-check-double text-blue-400 mr-3"></i> IELTS & Roadmap Guide
              </h2>
              <p className="text-blue-100 text-lg mb-8 italic border-l-4 border-blue-400 pl-6 py-2 leading-relaxed">
                "স্কলারশিপ মানেই যে শুধু মেধাবীদের জন্য তা নয়, সঠিক সময়ে সঠিক প্রস্তুতিই আপনাকে আপনার স্বপ্নের গন্তব্যে নিয়ে যাবে।"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                   <div className="text-xs font-black text-blue-400 uppercase mb-2">Academic Safe Zone</div>
                   <div className="text-xl font-bold">Overall 6.5 (All 6.0+)</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                   <div className="text-xs font-black text-blue-400 uppercase mb-2">High Tier Access</div>
                   <div className="text-xl font-bold">7.0 - 7.5 Band Score</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl text-gray-900 min-w-[320px] shadow-xl text-center">
              <div className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Sylhet Success Hub</div>
              <h4 className="text-2xl font-black text-blue-900 mb-6 uppercase">IDP Partner Office</h4>
              <p className="text-sm text-gray-500 mb-8 font-medium">Official IELTS test booking and preparation right here in Sylhet TV Gate.</p>
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center">
                Check My Profile <i className="fas fa-arrow-right ml-2 text-[10px]"></i>
              </button>
            </div>
          </div>
        </section>

        {/* Discovery Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Search by scholarship name or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-white border-2 border-transparent focus:border-blue-600 rounded-2xl shadow-sm outline-none transition-all font-medium text-lg"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="px-8 py-5 bg-white border-2 border-transparent focus:border-blue-600 rounded-2xl outline-none font-bold text-sm text-gray-700 shadow-sm"
            >
              <option value="All">All Regions</option>
              <option value="Canada">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="USA">United States</option>
              <option value="Europe">Europe</option>
              <option value="Japan">Japan</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </div>

        {/* Scholarship Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredScholarships.map((s) => (
            <div key={s.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:border-blue-100 transition-all flex flex-col group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[4rem] flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <span className="text-2xl font-bold text-gray-200 group-hover:text-blue-100 uppercase tracking-tighter">
                    {s.country === 'Canada' ? '🇨🇦' : s.country === 'USA' ? '🇺🇸' : s.country === 'UK' ? '🇬🇧' : '🌎'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{s.funding}</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{s.degree}</span>
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors h-[64px] overflow-hidden">{s.name}</h3>
              
              {s.location && (
                  <div className="flex items-center text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">
                      <i className="fas fa-map-marker-alt mr-2 text-blue-500"></i> {s.location}
                  </div>
              )}

              <div className="flex gap-2 mb-6">
                <div className="flex items-center text-[10px] font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                    <i className="fas fa-certificate mr-1.5"></i> IELTS: {s.ielts}
                </div>
                {s.gpa && (
                    <div className="flex items-center text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                        <i className="fas fa-user-graduate mr-1.5"></i> Min GPA: {s.gpa}
                    </div>
                )}
              </div>

              {/* MSc Fields / Popular Subjects */}
              {s.mscFields && (
                  <div className="mb-6">
                    <div className="text-[9px] font-black uppercase text-gray-400 mb-3 flex items-center">
                        <span className="w-4 h-[1px] bg-gray-200 mr-2"></span> Top MSc Fields
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {s.mscFields.map((f, i) => (
                            <span key={i} className="text-[9px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                                {f}
                            </span>
                        ))}
                    </div>
                  </div>
              )}

              {/* Coverage Section */}
              <div className="mb-8 flex-grow">
                <div className="text-[10px] font-black uppercase text-gray-400 mb-4 flex items-center">
                  <span className="w-6 h-[1px] bg-gray-200 mr-2"></span> Coverage & Benefits
                </div>
                <ul className="space-y-3">
                  {s.coverage.map((benefit, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600 font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                        <i className="fas fa-check text-blue-500 text-[8px]"></i>
                      </div>
                      <span className="leading-tight">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Area */}
              <div className="pt-8 border-t border-gray-50 mt-auto">
                <div className="flex justify-between items-center mb-6">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deadlines</span>
                      <span className="text-sm font-black text-red-500">{s.deadline}</span>
                   </div>
                   <div className="text-right">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Region</span>
                      <div className="text-sm font-black text-gray-800 uppercase">{s.country}</div>
                   </div>
                </div>
                <a 
                  href={s.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full bg-[#002B49] text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-all text-sm text-center block shadow-lg hover:shadow-blue-200"
                >
                  Official Portal
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredScholarships.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <i className="fas fa-search text-2xl text-gray-300"></i>
            </div>
            <h3 className="text-2xl font-black text-gray-400 mb-2">No Matching Opportunities</h3>
            <p className="text-gray-500 font-medium">Try searching for a different country or university name.</p>
          </div>
        )}

        {/* Footer Research Credits */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] gap-6">
          <div className="flex items-center">
            <i className="fas fa-search-location mr-2"></i> RTM AKTU Research Cell
          </div>
          <div className="flex items-center">
            <i className="fas fa-database mr-2"></i> 18 Canadian Hub Portal Sync
          </div>
          <div className="flex items-center">
            <i className="fas fa-shield-alt mr-2"></i> Student Built Project 2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholarships;
