
import React, { useState, useRef, useEffect } from 'react';
import { getAIStudyAdvice } from '../services/geminiService';

interface AIAdvisorProps {
  initialContext?: { country?: string; message?: string };
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ initialContext }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Assalamu Alaikum! I'm the GlobalPath Intelligent Core. I was developed by the CSE students of RTM AKTU to guide you through your study abroad journey. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialContext?.country) {
      const contextMsg = `I need specialized visa advice for ${initialContext.country}. What are the critical requirements I should know about?`;
      handleSend(contextMsg);
    }
  }, [initialContext]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (customMsg?: string) => {
    const msgText = customMsg || input;
    if (!msgText.trim() || isLoading) return;

    if (!customMsg) setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msgText }]);
    setIsLoading(true);

    const botResponse = await getAIStudyAdvice(msgText);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[700px]">
        {/* Header */}
        <div className="bg-[#002B49] p-6 text-white flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-inner">
              <i className="fas fa-brain text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold">GlobalPath Intelligent Core</h2>
              <p className="text-sm text-blue-100">Proprietary Educational AI System</p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <span className="bg-green-400 w-3 h-3 rounded-full inline-block mr-2 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
            <span className="text-sm font-semibold uppercase tracking-widest text-[10px]">Active Engine</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-md' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
              }`}>
                <div className="prose prose-sm prose-invert">
                    {msg.text.split('\n').map((line, i) => (
                        <p key={i} className="mb-2 last:mb-0 leading-relaxed">{line}</p>
                    ))}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask our proprietary AI about study abroad..."
              className="flex-grow bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading}
              className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest gap-2">
            <span>Built by RTM AKTU CSE Students</span>
            <span className="hidden sm:inline">|</span>
            <span>Supervised by Abdulla Rajib Sir</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;
