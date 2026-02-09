
import React from 'react';
import { View } from '../types';
import { SYLHET_OFFICE } from '../constants';

interface FooterProps {
  onNavigate: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#002B49] text-blue-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <div className="flex flex-col mb-8">
              <span className="text-3xl font-black text-white leading-none">GlobalPath</span>
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1">Sylhet Official Branch</span>
            </div>
            <p className="text-blue-200/60 text-sm leading-relaxed mb-8 font-medium">
              Bangladesh's most trusted gateway to international education. With 50+ years of global excellence, we are dedicated to the students of Sylhet.
            </p>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-widest text-xs">Explore Destinations</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li><button onClick={() => onNavigate(View.DESTINATIONS)} className="hover:text-white transition-colors">Study in the UK</button></li>
              <li><button onClick={() => onNavigate(View.DESTINATIONS)} className="hover:text-white transition-colors">Study in Canada</button></li>
              <li><button onClick={() => onNavigate(View.DESTINATIONS)} className="hover:text-white transition-colors">Study in Australia</button></li>
              <li><button onClick={() => onNavigate(View.DESTINATIONS)} className="hover:text-white transition-colors">Study in the USA</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-widest text-xs">FastLane Tools</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li><button onClick={() => onNavigate(View.ELIGIBILITY)} className="hover:text-white transition-colors">Eligibility Checker</button></li>
              <li><button onClick={() => onNavigate(View.VISA)} className="hover:text-white transition-colors">Visa Guidance</button></li>
              <li><button onClick={() => onNavigate(View.AI_ADVISOR)} className="hover:text-white transition-colors">AI Advisor</button></li>
              <li><button onClick={() => onNavigate(View.CONTACT)} className="hover:text-white transition-colors">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-widest text-xs">Sylhet Office</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-blue-400"></i>
                <span>{SYLHET_OFFICE.address} <br/><span className="text-[10px] text-blue-400 font-bold uppercase">{SYLHET_OFFICE.landmark}</span></span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-blue-400"></i>
                <span>{SYLHET_OFFICE.phone}</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-blue-400"></i>
                <span>{SYLHET_OFFICE.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[11px] text-blue-400/60 font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} GlobalPath Education. An official IELTS Co-owner Partner.
          </p>
          <div className="flex space-x-6 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
