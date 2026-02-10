
import React, { useState } from 'react';
import { COUNTRIES, UNIVERSITIES } from '../constants';
import { University } from '../types';

const Destinations: React.FC = () => {
  const [activeCountry, setActiveCountry] = useState<string>('CA'); // Default to Canada as per request
  const [selectedUni, setSelectedUni] = useState<University | null>(null);

  const filteredUnis = activeCountry === 'All' 
    ? UNIVERSITIES 
    : UNIVERSITIES.filter(u => u.country === activeCountry);

  const activeCountryData = COUNTRIES.find(c => c.code === activeCountry);

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12">
            <span className="bg-blue-600 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-sm mb-4 inline-block">International Education Hub</span>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Discover Your Future <span className="text-blue-600">Destination</span></h1>
            <p className="text-gray-600 max-w-2xl text-lg font-medium">Detailed MSc roadmaps and institutional guides for top global destinations.</p>
        </header>

        {/* Country Filter Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            <button 
                onClick={() => setActiveCountry('All')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center ${activeCountry === 'All' ? 'bg-blue-600 text-white border-blue-600 shadow-xl' : 'bg-white text-gray-600 border-gray-100 hover:border-blue-200'}`}
            >
                <div className="text-2xl mb-2">🌍</div>
                <div className="font-bold text-xs uppercase tracking-widest">All Regions</div>
            </button>
            {COUNTRIES.map(country => (
                <button 
                    key={country.code}
                    onClick={() => setActiveCountry(country.code)}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center ${activeCountry === country.code ? 'bg-blue-600 text-white border-blue-600 shadow-xl' : 'bg-white text-gray-600 border-gray-100 hover:border-blue-200'}`}
                >
                    <div className="text-2xl mb-2">{country.flag}</div>
                    <div className="font-bold text-xs uppercase tracking-widest">{country.name}</div>
                </button>
            ))}
        </div>

        {/* Destination Details Section */}
        {activeCountryData && (
            <div className="bg-white p-10 lg:p-14 rounded-[2.5rem] shadow-sm mb-16 border border-gray-100 animate-fadeIn relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                   <div className="text-[300px] font-black">{activeCountryData.code}</div>
                </div>
                <div className="relative z-10">
                    <div className="flex items-center mb-8">
                        <span className="text-6xl mr-6">{activeCountryData.flag}</span>
                        <div>
                            <h2 className="text-4xl font-black text-gray-900">{activeCountryData.name} Guide</h2>
                            <p className="text-blue-500 font-bold uppercase tracking-widest text-xs mt-1">GlobalPath Exclusive MSc Portal</p>
                        </div>
                    </div>
                    <p className="text-gray-600 text-xl leading-relaxed max-w-4xl mb-12 font-medium">
                        {activeCountryData.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <div className="text-blue-600 font-black text-xl mb-1">2025-26</div>
                            <div className="text-[10px] text-blue-400 uppercase font-black tracking-widest">Upcoming Intake</div>
                        </div>
                        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                            <div className="text-green-600 font-black text-xl mb-1">PGWP Eligible</div>
                            <div className="text-[10px] text-green-400 uppercase font-black tracking-widest">Post-Study Work</div>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                            <div className="text-purple-600 font-black text-xl mb-1">Institutions</div>
                            <div className="text-[10px] text-purple-400 uppercase font-black tracking-widest">MSc Providers</div>
                        </div>
                        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                            <div className="text-orange-600 font-black text-xl mb-1">75%+ Success</div>
                            <div className="text-[10px] text-orange-400 uppercase font-black tracking-widest">Sylhet Applicant Rate</div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Dynamic University Listing */}
        <div className="flex justify-between items-center mb-10">
            <h3 className="text-3xl font-black text-gray-900 flex items-center">
                <i className="fas fa-university mr-4 text-blue-600"></i> Featured MSc Providers
            </h3>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Showing {filteredUnis.length} Institutions
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredUnis.map(uni => (
                <div key={uni.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col group border-b-8 border-transparent hover:border-blue-600">
                    <div className="relative h-64 overflow-hidden">
                        <img src={uni.imageUrl} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                        <div className="absolute top-5 left-5 bg-white/95 backdrop-blur px-4 py-2 rounded-xl text-xs font-black text-blue-900 shadow-xl flex items-center">
                            <i className="fas fa-trophy mr-2 text-blue-500"></i> QS #{uni.ranking}
                        </div>
                        <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                            {uni.location.split(',')[0]}
                        </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="font-black text-2xl text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{uni.name}</h4>
                        </div>
                        
                        <div className="flex items-center text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">
                            <i className="fas fa-map-marker-alt mr-2 text-blue-500"></i> {uni.location}
                        </div>

                        {/* Detailed Stats Card */}
                        <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-gray-400">Tuition Range</span>
                                <span className="text-sm font-black text-blue-600">{uni.tuitionFee} <span className="text-[9px]">CAD/YR</span></span>
                            </div>
                            <div className="h-[1px] bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-gray-400">Min. GPA</span>
                                <span className="text-xs font-bold text-gray-700">{uni.minGpa}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-gray-400">IELTS Score</span>
                                <span className="text-xs font-bold text-gray-700">{uni.ielts}</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="text-[10px] font-black uppercase text-gray-400 mb-2">Academic USP</div>
                            <p className="text-xs text-gray-600 italic leading-relaxed border-l-2 border-blue-200 pl-3">
                                "{uni.usp}"
                            </p>
                        </div>

                        <div className="mb-8">
                            <div className="text-[10px] font-black uppercase text-gray-400 mb-3">Key MSc Programs</div>
                            <div className="flex flex-wrap gap-2">
                                {uni.programs.slice(0, 3).map((p, idx) => (
                                    <span key={idx} className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight">
                                        {p}
                                    </span>
                                ))}
                                {uni.programs.length > 3 && (
                                    <span className="text-[10px] font-bold text-gray-400 py-1.5 ml-1">+{uni.programs.length - 3} more</span>
                                )}
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-gray-50">
                            <button 
                                onClick={() => setSelectedUni(uni)}
                                className="w-full bg-[#002B49] text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-all text-sm shadow-lg hover:shadow-blue-200 uppercase tracking-widest"
                            >
                                View Detailed Guide
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Modal for detailed University Profile */}
        {selectedUni && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-900/60 backdrop-blur-md animate-fadeIn">
                <div className="bg-white rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
                    <button 
                        onClick={() => setSelectedUni(null)}
                        className="absolute top-8 right-8 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-gray-900 hover:bg-red-50 hover:text-red-500 transition-all z-10 shadow-lg"
                    >
                        <i className="fas fa-times"></i>
                    </button>

                    <div className="relative h-80">
                        <img src={selectedUni.imageUrl} className="w-full h-full object-cover" alt={selectedUni.name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
                        <div className="absolute bottom-10 left-10 right-10">
                            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2 leading-tight">{selectedUni.name}</h2>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center text-blue-600 font-bold uppercase text-sm tracking-widest">
                                    <i className="fas fa-map-marker-alt mr-2"></i> {selectedUni.location}
                                </div>
                                <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-black">
                                    QS World Rank #{selectedUni.ranking}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 lg:p-14">
                        <div className="grid lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 space-y-10">
                                <section>
                                    <h5 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 border-b pb-2">Institutional USP</h5>
                                    <p className="text-2xl font-bold text-gray-800 leading-relaxed italic border-l-4 border-blue-500 pl-6 bg-blue-50/30 py-6 rounded-r-2xl">
                                        "{selectedUni.usp}"
                                    </p>
                                </section>

                                <section>
                                    <h5 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 border-b pb-2">MSc Admission Requirements</h5>
                                    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                        <ul className="space-y-4">
                                            {selectedUni.mscRequirements.map((req, i) => (
                                                <li key={i} className="flex items-start">
                                                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4 mt-0.5 shrink-0">
                                                        <i className="fas fa-check text-[10px]"></i>
                                                    </div>
                                                    <span className="text-gray-700 font-medium">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </section>

                                <section>
                                    <h5 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 border-b pb-2">Academic Benchmarks</h5>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                            <div className="text-[10px] font-black uppercase text-blue-500 mb-2 tracking-widest">IELTS Minimum</div>
                                            <div className="text-xl font-black text-gray-900">{selectedUni.ielts}</div>
                                            <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase">Safe for Admission & Visa</p>
                                        </div>
                                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                            <div className="text-[10px] font-black uppercase text-blue-500 mb-2 tracking-widest">Target GPA</div>
                                            <div className="text-xl font-black text-gray-900">{selectedUni.minGpa}</div>
                                            <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase">Competitive Profile Strength</p>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h5 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 border-b pb-2">MSc Specializations</h5>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedUni.programs.map((p, idx) => (
                                            <div key={idx} className="bg-blue-600 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-sm">
                                                {p}
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h5 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 border-b pb-2">Financial Breakdown</h5>
                                    <div className="p-8 bg-gray-900 text-white rounded-[2rem] shadow-xl relative overflow-hidden">
                                        <i className="fas fa-dollar-sign absolute top-[-20px] right-[-20px] text-[150px] opacity-5"></i>
                                        <div className="relative z-10 space-y-8">
                                            <div>
                                                <div className="text-[10px] font-black uppercase text-blue-400 mb-1 tracking-widest">Scholarship & Funding</div>
                                                <div className="text-lg font-bold leading-relaxed">{selectedUni.funding}</div>
                                            </div>
                                            <div className="h-[1px] bg-white/10"></div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase text-blue-400 mb-1 tracking-widest">Est. Annual Tuition</div>
                                                <div className="text-3xl font-black text-white">{selectedUni.tuitionFee} <span className="text-sm font-normal text-gray-400">CAD / Year</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 sticky top-4">
                                    <h5 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-6 flex items-center">
                                        <i className="fas fa-user-tie mr-2"></i> Expert Recommendation
                                    </h5>
                                    <p className="text-sm text-blue-900 leading-relaxed mb-8 font-medium italic">
                                        "This institution is a top-tier choice for students from Sylhet aiming for {selectedUni.programs[0]}. It offers high research funding and excellent {selectedUni.country === 'CA' ? 'PGWP potential' : 'career links'}."
                                    </p>
                                    <div className="space-y-4">
                                        <a 
                                            href={selectedUni.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="block text-center bg-blue-600 text-white py-4 rounded-xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg"
                                        >
                                            Official Site <i className="fas fa-external-link-alt ml-2 text-[10px]"></i>
                                        </a>
                                        <button className="w-full bg-white text-blue-600 border border-blue-200 py-4 rounded-xl font-black text-sm hover:bg-blue-50 transition-all">
                                            Request SOP Help
                                        </button>
                                    </div>
                                    
                                    <div className="mt-8 pt-8 border-t border-blue-200">
                                        <div className="flex items-center text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">
                                            <i className="fas fa-info-circle mr-2"></i> Sylhet Desk Contact
                                        </div>
                                        <div className="text-xs font-bold text-gray-600">JR Tower, Jail Road</div>
                                        <div className="text-xs font-black text-blue-600 mt-1">Direct: +880 1712-345678</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Global Conversion CTA */}
        <div className="mt-24 text-center bg-gradient-to-br from-[#002B49] to-[#004b7a] text-white p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
                <span className="bg-blue-400 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Admission Cycle 2025</span>
                <h2 className="text-4xl font-black mb-6">Secure Your MSc Offer Letter Today</h2>
                <p className="text-blue-100 mb-10 text-xl font-medium leading-relaxed">Our experts in Sylhet have direct portals to all 18 featured Canadian institutions. Don't wait—Fall intake is approaching fast.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-5">
                    <button className="bg-white text-blue-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl">
                        Apply Now
                    </button>
                    <button className="bg-transparent border border-white/30 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                        Talk to an Expert
                    </button>
                </div>
            </div>
            <i className="fas fa-globe-americas absolute bottom-[-80px] left-[-80px] text-[400px] opacity-5 rotate-12"></i>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
