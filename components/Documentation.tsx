
import React from 'react';
import { ACADEMIC_DATA } from '../constants';

const Documentation: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-16">
            <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block shadow-sm">
                Final Year Software Project - RTM AKTU
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Academic Report</h1>
            <p className="text-gray-500 text-lg">Detailed documentation of the 'GlobalPath' software engineering project developed at RTM Al-Kabir Technical University.</p>
        </header>

        <div className="space-y-12">
            {/* Team Credits */}
            <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-[#002B49] text-white rounded-xl flex items-center justify-center mr-5 shadow-lg">
                        <i className="fas fa-graduation-cap text-xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold">Research Team & Supervision</h2>
                </div>
                <div className="space-y-6">
                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2">Project Supervisor</span>
                        <div className="font-black text-gray-900 text-xl">Abdulla Rajib Sir</div>
                        <div className="text-sm text-gray-500 font-medium">Assistant Professor, Dept. of Computer Science & Engineering, RTM AKTU</div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Student Lead</span>
                            <div className="font-black text-gray-800 text-lg">Tasnia Jannath</div>
                            <div className="text-[10px] font-bold text-blue-500 mt-1 uppercase">Documentation & Logic</div>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Student Architect</span>
                            <div className="font-black text-gray-800 text-lg">Abdulla Faysal Ifthekar</div>
                            <div className="text-[10px] font-bold text-blue-500 mt-1 uppercase">UI/UX & AI Core</div>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Student Backend</span>
                            <div className="font-black text-gray-800 text-lg">Aminul Islam</div>
                            <div className="text-[10px] font-bold text-blue-500 mt-1 uppercase">Data Engineering</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Definition */}
            <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mr-5 shadow-lg">
                        <i className="fas fa-info-circle text-xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold">1. Project Definition</h2>
                </div>
                
                <div className="mb-8">
                    <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-3">Problem Statement</h3>
                    <p className="text-gray-600 leading-relaxed text-lg italic border-l-4 border-blue-200 pl-6 bg-blue-50/30 py-4 rounded-r-xl">
                        "{ACADEMIC_DATA.problemStatement}"
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4">Core Objectives</h3>
                    <ul className="space-y-4">
                        {ACADEMIC_DATA.objectives.map((obj, i) => (
                            <li key={i} className="flex items-start">
                                <i className="fas fa-check-circle text-green-500 mt-1.5 mr-3"></i>
                                <span className="text-gray-700 font-medium">{obj}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* AI Core Proprietary Tech */}
            <section className="bg-gray-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-5 shadow-lg">
                            <i className="fas fa-microchip text-xl"></i>
                        </div>
                        <h2 className="text-2xl font-bold">2. Intelligent Core Engine</h2>
                    </div>
                    <p className="text-blue-100/70 mb-8 leading-relaxed">
                        The GlobalPath Intelligent Core is a proprietary AI implementation developed specifically for this project. It leverages advanced natural language processing to simulate expert education consultancy, tailored to the regional needs of Sylheti students.
                    </p>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 italic text-sm">
                        "Designed, prompted, and integrated by the student team as a localized solution for academic guidance."
                    </div>
                </div>
                <i className="fas fa-brain absolute bottom-[-50px] right-[-50px] text-[250px] opacity-[0.03]"></i>
            </section>
        </div>

        <div className="mt-20 text-center text-gray-400 text-xs font-black uppercase tracking-[0.3em]">
            Developed at RTM Al-Kabir Technical University (2024 Cycle)
        </div>
      </div>
    </div>
  );
};

export default Documentation;
