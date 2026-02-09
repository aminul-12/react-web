
import React, { useState } from 'react';

const EligibilityChecker: React.FC = () => {
  const [gpa, setGpa] = useState('');
  const [ielts, setIelts] = useState('');
  const [result, setResult] = useState<null | { tier: string; color: string; desc: string }>(null);

  const handleCheck = () => {
    const gpaNum = parseFloat(gpa);
    const ieltsNum = parseFloat(ielts);

    if (isNaN(gpaNum) || isNaN(ieltsNum)) return;

    if (gpaNum >= 4.8 && ieltsNum >= 7.0) {
      setResult({ tier: 'Tier 1 / Ivy League', color: 'blue', desc: 'You qualify for elite universities like Oxford, Harvard, or University of Toronto with potential full scholarships.' });
    } else if (gpaNum >= 4.0 && ieltsNum >= 6.5) {
      setResult({ tier: 'Top National Ranking', color: 'green', desc: 'You are eligible for highly ranked Russell Group (UK) and U15 (Canada) institutions.' });
    } else if (gpaNum >= 3.5 && ieltsNum >= 6.0) {
      setResult({ tier: 'Standard Admission', color: 'orange', desc: 'Great profile for reputable public universities and professional programs across UK and Australia.' });
    } else {
      setResult({ tier: 'Foundational Pathway', color: 'purple', desc: 'We recommend a foundation year or intensive English pathway to secure your entry to a degree program.' });
    }
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-3xl font-black text-gray-900 mb-4 text-center">FastLane Eligibility Check</h2>
          <p className="text-gray-500 text-center mb-10">Instant university matching based on your current profile.</p>
          
          <div className="space-y-6 mb-10">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">HSC / Graduate GPA (0-5.0)</label>
              <input 
                type="number" 
                step="0.01"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                placeholder="E.g. 4.85" 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">Target/Recent IELTS Score</label>
              <input 
                type="number" 
                step="0.5"
                value={ielts}
                onChange={(e) => setIelts(e.target.value)}
                placeholder="E.g. 6.5" 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-lg"
              />
            </div>
            <button 
              onClick={handleCheck}
              className="w-full bg-blue-600 text-white py-5 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
            >
              Find My Match <i className="fas fa-bolt ml-2"></i>
            </button>
          </div>

          {result && (
            <div className={`p-8 rounded-2xl animate-fadeIn border-l-8 ${
              result.color === 'blue' ? 'bg-blue-50 border-blue-600' :
              result.color === 'green' ? 'bg-green-50 border-green-600' :
              result.color === 'orange' ? 'bg-orange-50 border-orange-600' :
              'bg-purple-50 border-purple-600'
            }`}>
              <div className="text-xs font-black uppercase tracking-widest mb-1 opacity-60">Result Category</div>
              <h3 className="text-2xl font-black mb-3">{result.tier}</h3>
              <p className="text-gray-700 leading-relaxed font-medium">{result.desc}</p>
              <div className="mt-6 flex space-x-3">
                <button className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-bold">Download List</button>
                <button className="text-blue-600 px-6 py-2 text-sm font-bold">Talk to Sylhet Expert</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EligibilityChecker;
