
import React from 'react';
import { View } from '../types';
import { SYLHET_OFFICE, SCHOLARSHIPS } from '../constants';

interface HomeProps {
  onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-[#002B49] text-white py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fadeIn">
              <div className="flex items-center space-x-2 mb-6">
                <span className="bg-blue-500 px-3 py-1 rounded text-[10px] font-bold uppercase">Official Partner</span>
                <span className="text-blue-200 text-xs font-semibold">| Global Education Experts in Sylhet</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] mb-8">
                Your Global <br/><span className="text-blue-400">Ambition,</span> <br/>Our Local <br/>Expertise.
              </h1>
              <p className="text-xl text-blue-100/80 mb-10 max-w-lg leading-relaxed font-medium">
                Sylhet's leading consultancy for the UK, USA, Canada, and Australia. 50+ years of global legacy, now right at your doorstep in Jail Road.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
                <button 
                  onClick={() => onNavigate(View.SCHOLARSHIPS)}
                  className="bg-blue-500 text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-blue-600 transition-all shadow-xl"
                >
                  Explore Scholarships
                </button>
                <button 
                  onClick={() => onNavigate(View.ELIGIBILITY)}
                  className="bg-white/10 border border-white/20 text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Check Eligibility
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" 
                alt="Students studying" 
                className="rounded-2xl shadow-2xl relative z-10 grayscale-[20%]"
              />
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-12 items-center opacity-70 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center space-x-3">
            <i className="fas fa-university text-2xl text-blue-900"></i>
            <span className="font-bold text-gray-800">80+ Partners</span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="fas fa-history text-2xl text-blue-900"></i>
            <span className="font-bold text-gray-800">50+ Years Legacy</span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="fas fa-certificate text-2xl text-blue-900"></i>
            <span className="font-bold text-gray-800">British Council Sources linked</span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="fas fa-user-shield text-2xl text-blue-900"></i>
            <span className="font-bold text-gray-800">Visa Status</span>
          </div>
        </div>
      </section>

      {/* Featured Scholarship Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h2 className="text-3xl font-black text-gray-900 mb-4">Trending Scholarships (2025 Cycle)</h2>
           <p className="text-gray-500 mb-12 max-w-xl mx-auto">Latest fully-funded opportunities for Master's and PhD programs across the UK, USA, and Europe.</p>
           <div className="grid md:grid-cols-3 gap-8 text-left">
              {SCHOLARSHIPS.slice(0, 3).map(s => (
                <div key={s.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                   <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">{s.country}</div>
                   <h3 className="text-xl font-bold mb-4 flex-grow">{s.name}</h3>
                   <div className="text-sm text-gray-500 mb-6 flex items-center">
                      <i className="fas fa-calendar-alt mr-2"></i> Deadline: {s.deadline}
                   </div>
                   <button onClick={() => onNavigate(View.SCHOLARSHIPS)} className="text-blue-600 font-bold flex items-center hover:underline">
                      Apply Now <i className="fas fa-arrow-right ml-2 text-xs"></i>
                   </button>
                </div>
              ))}
           </div>
           <button onClick={() => onNavigate(View.SCHOLARSHIPS)} className="mt-12 text-blue-600 font-bold border-2 border-blue-600 px-8 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
              View All Scholarships
           </button>
        </div>
      </section>

      {/* IELTS Co-Ownership Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#002B49] rounded-3xl p-10 lg:p-16 shadow-sm border border-gray-100 flex flex-col lg:flex-row items-center gap-12 text-white">
            <div className="flex-1">
              <h2 className="text-3xl font-black text-white mb-6 flex items-center">
                <span className="w-12 h-1 bg-blue-400 mr-4"></span> Official IELTS Hub
              </h2>
              <p className="text-blue-100/80 text-lg mb-8 leading-relaxed">
                As co-owners of IELTS, we offer the most direct path to your English proficiency goal. Book your test at our Sylhet center and get exclusive access to official preparation materials.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <li className="flex items-center text-blue-50 font-medium"><i className="fas fa-check-circle text-blue-400 mr-2"></i> Free Preparation Resources</li>
                <li className="flex items-center text-blue-50 font-medium"><i className="fas fa-check-circle text-blue-400 mr-2"></i> Sylhet-based Test Centers</li>
                <li className="flex items-center text-blue-50 font-medium"><i className="fas fa-check-circle text-blue-400 mr-2"></i> Official Mock Tests</li>
                <li className="flex items-center text-blue-50 font-medium"><i className="fas fa-check-circle text-blue-400 mr-2"></i> Direct Results Portal</li>
              </ul>
              <div className="flex space-x-4">
                <button className="bg-blue-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-600 transition-all">Book Your Test</button>
                <button className="text-white border border-white/20 px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all">Explore Prep Courses</button>
              </div>
            </div>
            <div className="flex-1 bg-blue-500/10 p-8 rounded-2xl text-center border border-white/10">
              <div className="text-5xl font-black text-blue-400 mb-4 tracking-tighter">IELTS</div>
              <div className="text-sm font-bold text-white uppercase tracking-widest mb-6">By GlobalPath Sylhet</div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-left text-gray-800">
                <div className="text-xs font-bold text-gray-400 mb-2 uppercase">Next Test Date in Sylhet</div>
                <div className="text-xl font-bold text-gray-800">Saturday, 26 Oct 2024</div>
                <div className="text-sm text-gray-500 mt-1">Computer-delivered & Paper-based</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FastLane Tools Intro */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">The GlobalPath FastLane</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Get ahead of the queue with our specialized digital tools designed for the modern Sylheti student.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div onClick={() => onNavigate(View.ELIGIBILITY)} className="group bg-blue-600 text-white p-12 rounded-3xl cursor-pointer hover:scale-[1.02] transition-all relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-4">University Matcher</h3>
                 <p className="text-blue-100 mb-8 opacity-80">Input your GPA and IELTS to see which top universities in the UK or Canada are ready to accept you.</p>
                 <span className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold text-sm">Start Check</span>
               </div>
               <i className="fas fa-search-plus absolute -bottom-10 -right-10 text-[150px] opacity-10 group-hover:rotate-12 transition-all"></i>
            </div>
            <div onClick={() => onNavigate(View.CALCULATOR)} className="group bg-white border border-gray-100 p-12 rounded-3xl cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">Cost Calculator</h3>
                 <p className="text-gray-500 mb-8">Compare living costs in Sylhet versus London, Toronto, or Sydney. Plan your budget effectively.</p>
                 <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm">Compare Costs</span>
               </div>
               <i className="fas fa-calculator absolute -bottom-10 -right-10 text-[150px] text-gray-100 group-hover:rotate-12 transition-all"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Sylhet Presence */}
      <section className="py-24 bg-[#001E33] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-black mb-8">Visit Us in the Heart of Sylhet</h2>
              <p className="text-blue-100/70 text-lg mb-12">
                Our Sylhet office is more than just a consultancy—it's a hub of global opportunity. Located conveniently at JR Tower, we are easy to reach for students from across the region.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">{SYLHET_OFFICE.address}</h4>
                    <p className="text-blue-100/50 text-sm mt-1 uppercase tracking-widest font-bold">Landmark: {SYLHET_OFFICE.landmark}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Open for Walk-ins</h4>
                    <p className="text-blue-100/50 text-sm mt-1 font-bold">{SYLHET_OFFICE.officeHours}</p>
                  </div>
                </div>
              </div>
              <button className="mt-12 bg-white text-blue-900 px-10 py-4 rounded-lg font-bold flex items-center">
                <i className="fas fa-directions mr-2"></i> Get Directions
              </button>
            </div>
            <div className="bg-white/5 p-10 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <i className="fas fa-calendar-alt text-blue-500 mr-3"></i> Upcoming Sylhet Events
              </h3>
              <div className="space-y-6">
                {[
                  { date: 'Oct 15', title: 'UK Spot Admission Day', host: 'University of Westminster' },
                  { date: 'Oct 22', title: 'Canada Study Permit Seminar', host: 'Official Seminar' },
                  { date: 'Nov 05', title: 'USA Higher Ed Workshop', host: 'EducationUSA' },
                ].map((ev, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="text-center bg-blue-600 px-3 py-1 rounded-lg">
                        <div className="text-xs font-bold uppercase">{ev.date.split(' ')[0]}</div>
                        <div className="text-lg font-black">{ev.date.split(' ')[1]}</div>
                      </div>
                      <div>
                        <div className="font-bold">{ev.title}</div>
                        <div className="text-xs text-blue-300 font-semibold">{ev.host}</div>
                      </div>
                    </div>
                    <i className="fas fa-arrow-right text-blue-500"></i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
