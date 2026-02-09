
import React from 'react';
import { COST_COMPARISON } from '../constants';

const CostCalculator: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <header className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Financial Planner</h2>
          <p className="text-gray-500 max-w-xl mx-auto font-medium">Comparing monthly living costs in Sylhet vs your dream study destinations. All prices converted to BDT (Approximate).</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
             <h3 className="text-2xl font-bold mb-8 flex items-center">
                <i className="fas fa-chart-bar text-blue-600 mr-3"></i> Cost Comparison Table
             </h3>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="py-4 text-xs font-black uppercase text-gray-400">Destination</th>
                      <th className="py-4 text-xs font-black uppercase text-gray-400">Accom.</th>
                      <th className="py-4 text-xs font-black uppercase text-gray-400">Monthly Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {COST_COMPARISON.map(item => (
                      <tr key={item.city} className={item.city === 'Sylhet' ? 'bg-blue-50 font-bold' : ''}>
                        <td className="py-5">{item.city}</td>
                        <td className="py-5">{item.rent}</td>
                        <td className="py-5 text-blue-600">{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-600 text-white p-10 rounded-3xl shadow-xl">
               <h3 className="text-2xl font-bold mb-4">Sylhet vs The World</h3>
               <p className="text-blue-100 mb-8 opacity-90 leading-relaxed">
                 While study abroad costs are significantly higher than Sylhet, international students have access to part-time work rights (up to 20-24 hours/week) which typically covers 100% of these living expenses.
               </p>
               <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold">Estimated Part-time Earnings</span>
                    <span className="text-xl font-black">৳120,000 - ৳180,000 /mo</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-300 w-[75%]"></div>
                  </div>
                  <div className="mt-2 text-[10px] font-bold uppercase opacity-60">Covering ~80% of total UK living costs</div>
               </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
               <h4 className="font-bold mb-4 flex items-center">
                 <i className="fas fa-shield-alt text-green-500 mr-2"></i> Proof of Funds (Solvency)
               </h4>
               <p className="text-gray-500 text-sm leading-relaxed mb-6">
                 Most visas require you to show 'Liquid Funds' for 1 year of tuition + living costs. Our Sylhet office provides specialized Bank Solvency guidance for local families.
               </p>
               <button className="w-full border-2 border-blue-100 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-all">
                  Request Solvency Guide
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;
