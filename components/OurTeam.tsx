
import React from 'react';
import { teamService } from '../services/teamService';

const OurTeam: React.FC = () => {
  const members = teamService.getActiveMembers();

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
            Excellence Driven
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-[#002B49] mb-6">
            Meet the Minds Behind <span className="text-blue-600">GlobalPath</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Our team in Sylhet combines global expertise with local heart to guide the next generation of Bangladeshi scholars.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {members.map((member) => (
            <div key={member.id} className="group relative">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gray-100 aspect-[4/5] shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
                
                {/* Overlay for Socials */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <div className="flex space-x-4">
                    {member.socialLinks.linkedin && (
                      <a href={member.socialLinks.linkedin} className="w-10 h-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center text-white hover:bg-blue-500 transition-all">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    )}
                    {member.socialLinks.github && (
                      <a href={member.socialLinks.github} className="w-10 h-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center text-white hover:bg-gray-800 transition-all">
                        <i className="fab fa-github"></i>
                      </a>
                    )}
                    {member.socialLinks.twitter && (
                      <a href={member.socialLinks.twitter} className="w-10 h-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center text-white hover:bg-blue-400 transition-all">
                        <i className="fab fa-twitter"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center px-4">
                <h3 className="text-2xl font-black text-[#002B49] mb-1">{member.name}</h3>
                <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">{member.designation}</p>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Join Us Section */}
        <div className="mt-32 bg-[#F8FAFC] rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-[#002B49] mb-6">Want to Join Our Mission?</h3>
            <p className="text-gray-500 max-w-xl mx-auto mb-10 text-lg">
              We are always looking for passionate consultants and developers to help bridge the gap between Sylhet and the world.
            </p>
            <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#002B49] transition-all shadow-xl">
              View Open Positions
            </button>
          </div>
          <i className="fas fa-users absolute bottom-[-50px] left-[-50px] text-[300px] text-gray-200/40 -rotate-12"></i>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
