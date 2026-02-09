
import React, { useState } from 'react';
import { VISA_DATA, SYLHET_OFFICE } from '../constants';
import { View, VisaCountry, VisaStep, VisaMistake } from '../types';

interface VisaGuidanceProps {
  onNavigate: (view: View, context?: any) => void;
}

const VisaGuidance: React.FC<VisaGuidanceProps> = ({ onNavigate }) => {
  const [activeCountry, setActiveCountry] = useState<VisaCountry>(VISA_DATA[0]);

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <section className="bg-[#002B49] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center animate-fadeIn">
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 inline-block shadow-lg">
            Visa Success Center
          </span>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
            Visa Guidance – <span className="text-blue-400">Step-by-Step</span> <br/> Student Visa Process
          </h1>
          <p className="text-blue-100/70 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Follow our clearly defined, numbered roadmap to secure your student visa for {activeCountry.country}. We've simplified the journey for our Sylheti scholars.
          </p>
        </div>
        <div className="absolute top-0 right-0 opacity-[0.05] pointer-events-none">
          <i className="fas fa-passport text-[400px] -mr-20 -mt-20"></i>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        {/* Country Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {VISA_DATA.map((data) => (
            <button
              key={data.code}
              onClick={() => setActiveCountry(data)}
              className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 flex items-center shadow-md border-2 ${
                activeCountry.code === data.code 
                  ? 'bg-blue-600 text-white border-blue-600 scale-105 shadow-blue-200' 
                  : 'bg-white text-gray-500 border-gray-100 hover:border-blue-200'
              }`}
            >
              <span className="mr-3 text-lg">{data.code === 'UK' ? '🇬🇧' : data.code === 'CA' ? '🇨🇦' : data.code === 'USA' ? '🇺🇸' : '🇦🇺'}</span>
              {data.country}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Numbered Timeline (Core Focus) */}
          <div className="lg:col-span-8 animate-fadeIn">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-[#002B49] uppercase tracking-tight">Visa Timeline</h2>
              <div className="bg-blue-50 text-blue-600 px-5 py-2 rounded-2xl border border-blue-100 font-black text-xs uppercase tracking-widest flex items-center">
                <i className="fas fa-history mr-2"></i> {activeCountry.processingTime}
              </div>
            </div>

            {/* Vertical Timeline Component */}
            <div className="relative pl-12 lg:pl-16">
              {/* Central Timeline Line */}
              <div className="absolute left-[23px] lg:left-[31px] top-4 bottom-4 w-1 bg-gradient-to-b from-blue-600 via-blue-400 to-gray-100 rounded-full"></div>

              {activeCountry.steps.map((step: VisaStep) => (
                <div key={step.id} className="relative mb-12 last:mb-0 group">
                  {/* Numbered Circle */}
                  <div className="absolute -left-[50px] lg:-left-[64px] top-0 w-12 h-12 lg:w-16 lg:h-16 bg-white border-4 border-[#002B49] rounded-full flex items-center justify-center font-black text-xl text-[#002B49] shadow-xl z-10 group-hover:bg-[#002B49] group-hover:text-white transition-all duration-300">
                    {step.stepNumber}
                  </div>
                  
                  <div className="bg-gray-50 p-8 lg:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:bg-white hover:border-blue-200 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform shadow-sm">
                        <i className={`fas ${step.icon} text-lg`}></i>
                      </div>
                      <h4 className="text-xl lg:text-2xl font-black text-[#002B49] uppercase tracking-tight">Step {step.stepNumber}: {step.title}</h4>
                    </div>
                    <p className="text-gray-500 font-medium leading-relaxed text-lg border-l-4 border-blue-100 pl-6">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Call to Action */}
            <div className="mt-16 bg-[#002B49] p-10 lg:p-14 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-black mb-4">Questions about {activeCountry.country} Visa?</h3>
                  <p className="text-blue-100 text-lg font-medium leading-relaxed opacity-90 max-w-md">
                    Our GlobalPath AI Core has specific knowledge for each step of the {activeCountry.country} journey. Ask your personalized questions now.
                  </p>
                </div>
                <button 
                  onClick={() => onNavigate(View.AI_ADVISOR, { country: activeCountry.country })}
                  className="bg-blue-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-400 hover:scale-105 transition-all shadow-2xl flex items-center whitespace-nowrap"
                >
                  Ask AI Advisor <i className="fas fa-robot ml-3"></i>
                </button>
              </div>
              <i className="fas fa-microchip absolute bottom-[-40px] right-[-40px] text-[200px] opacity-[0.03] -rotate-12"></i>
            </div>
          </div>

          {/* Right Column: Checklists & Warnings */}
          <div className="lg:col-span-4 space-y-10 sticky top-28">
            {/* Required Documents Checklist */}
            <div className="bg-white p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
              <h3 className="text-xl font-black text-[#002B49] mb-10 uppercase tracking-widest flex items-center relative z-10">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-3 text-xs shadow-sm">
                  <i className="fas fa-check-double"></i>
                </span>
                Document List
              </h3>
              <div className="space-y-4 relative z-10">
                {activeCountry.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100 group hover:border-blue-200 hover:bg-white transition-all shadow-sm">
                    <i className="fas fa-file-alt text-blue-200 group-hover:text-blue-600 transition-colors"></i>
                    <span className="text-sm font-bold text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 relative z-10">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Financial Requirement</div>
                <div className="p-6 bg-blue-50 rounded-[1.5rem] border border-blue-100">
                  <p className="text-xs font-bold text-blue-900 leading-relaxed italic">
                    "{activeCountry.financials}"
                  </p>
                </div>
              </div>
            </div>

            {/* Warning: Common Refusal Risks */}
            <div className="bg-red-50 p-10 rounded-[3rem] border border-red-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <i className="fas fa-exclamation-circle text-6xl text-red-500"></i>
              </div>
              <h3 className="text-lg font-black text-red-900 mb-8 flex items-center uppercase tracking-tight relative z-10">
                Refusal Risks
              </h3>
              <div className="space-y-6 relative z-10">
                {activeCountry.mistakes.map((m: VisaMistake, idx: number) => (
                  <div key={idx} className="bg-white/50 p-5 rounded-2xl border border-red-100 shadow-sm">
                    <div className="flex items-start space-x-3 mb-2">
                      <i className="fas fa-ban mt-1 text-red-500 shrink-0"></i>
                      <span className="text-xs font-black text-red-900 uppercase tracking-tight">{m.risk}</span>
                    </div>
                    <p className="text-[11px] text-red-800 font-medium leading-relaxed mb-3 italic">
                      {m.avoidance}
                    </p>
                    {m.resourceLink && (
                      <a 
                        href={m.resourceLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] hover:underline flex items-center"
                      >
                        Official Resource <i className="fas fa-external-link-alt ml-2 text-[7px]"></i>
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-6 border-t border-red-100">
                 <button 
                  onClick={() => onNavigate(View.CONTACT)}
                  className="w-full text-[11px] font-black uppercase tracking-widest text-red-600 hover:underline"
                 >
                   Request Professional Profile Review
                 </button>
              </div>
            </div>

            {/* Fast Fact Card */}
            <div className="bg-gray-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
               <div className="relative z-10">
                 <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Immigration Category</div>
                 <div className="text-2xl font-black mb-1 group-hover:text-blue-300 transition-colors">{activeCountry.visaType}</div>
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-3">RTM AKTU Knowledge Hub 2024</p>
               </div>
               <i className="fas fa-stamp absolute bottom-[-30px] right-[-30px] text-[150px] opacity-[0.03] group-hover:rotate-0 transition-all duration-700 -rotate-12"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Office Support CTA */}
      <section className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white p-10 lg:p-14 rounded-[3.5rem] shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center space-x-8">
               <div className="w-20 h-20 bg-[#002B49] text-white rounded-[1.5rem] shadow-lg flex items-center justify-center text-3xl">
                 <i className="fas fa-map-marker-alt"></i>
               </div>
               <div>
                 <h4 className="text-2xl font-black text-[#002B49] mb-1">Local Hub in Sylhet</h4>
                 <p className="text-gray-500 font-medium max-w-xs">Visit us at TV Gate, RTM AKTU for application support.</p>
               </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
               <button 
                onClick={() => onNavigate(View.CONTACT)}
                className="flex-grow md:flex-none bg-[#002B49] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-blue-600 transition-all"
               >
                 Visit Sylhet Office
               </button>
               <a 
                href={`https://wa.me/${SYLHET_OFFICE.phone.replace(/[^0-9]/g, '')}`} 
                className="flex-grow md:flex-none bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-all text-center"
               >
                 WhatsApp Desk
               </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisaGuidance;
