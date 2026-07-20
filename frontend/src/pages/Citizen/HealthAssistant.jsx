import { useState, useEffect } from 'react';
import { useUser } from '../../App';
import { getAIHealthAdvice } from '../../services/api';
import { FiHeart, FiUser, FiActivity, FiMessageSquare, FiSend, FiPlus, FiSmile } from 'react-icons/fi';

export default function HealthAssistant() {
  const { activeLocation } = useUser();
  
  // Health profile state
  const [age, setAge] = useState('adult'); // 'child' | 'adult' | 'elderly'
  const [asthma, setAsthma] = useState(false);
  const [copd, setCopd] = useState(false);
  const [heartDisease, setHeartDisease] = useState(false);
  const [allergies, setAllergies] = useState(false);
  const [outdoorHours, setOutdoorHours] = useState(2);

  // Recommendations state
  const [advice, setAdvice] = useState(null);
  const [adviceLoading, setAdviceLoading] = useState(false);

  // Chat assistant state
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I am your AI Health Assistant. I analyze your health profile and the active location's AQI (${activeLocation.aqi}) to recommend safe outdoor practices and precautions. Ask me if it is safe to walk or jog today!`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Fetch/recalculate advice when profile or location changes
  useEffect(() => {
    const fetchAdvice = async () => {
      setAdviceLoading(true);
      try {
        const data = await getAIHealthAdvice(
          { age, asthma, copd, heartDisease, allergies, outdoorHours },
          activeLocation.aqi
        );
        setAdvice(data);
      } catch (err) {
        console.error(err);
      } finally {
        setAdviceLoading(false);
      }
    };
    fetchAdvice();
  }, [age, asthma, copd, heartDisease, allergies, outdoorHours, activeLocation]);

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setChatLoading(true);

    try {
      // Prompt includes profile details and current AQI
      const prompt = `Based on my profile (Age: ${age}, Asthma: ${asthma ? 'Yes' : 'No'}, COPD: ${copd ? 'Yes' : 'No'}, Allergies: ${allergies ? 'Yes' : 'No'}, Outdoor hours: ${outdoorHours}h) and current AQI of ${activeLocation.aqi} in ${activeLocation.name}, please answer: ${textToSend}`;
      
      const response = await getAIHealthAdvice(
        { age, asthma, copd, heartDisease, allergies, outdoorHours },
        activeLocation.aqi
      );

      // Simulate tailored chat replies
      let replyText = '';
      if (textToSend.toLowerCase().includes('safe') || textToSend.toLowerCase().includes('go out') || textToSend.toLowerCase().includes('outdoor')) {
        replyText = `Given the current **${response.status}** air quality (${activeLocation.aqi} AQI), outdoor exposure should be **${response.outdoorTime}**. \n\n${response.precautions} ${response.maskRequired}`;
      } else {
        replyText = `For your health profile and current conditions, follow these guidelines: \n* **Mask Standard:** ${response.maskRequired}\n* **Exposure Limits:** ${response.outdoorTime}\n* **Action Plan:** ${response.precautions}`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: replyText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'ai', text: 'I faced an issue connecting to the health registry. Please repeat.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleApplyPreset = (query) => {
    handleSendMessage(query);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Health Diagnostics</span>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
          Health Profile & AI Assistant Counselor
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-medium">
          Configure a respiratory health profile to receive personalized advice and interact with the AI assistant.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card and dynamic advice (Col 1-2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-3">
              <FiUser className="text-maroon-800" />
              Configure Health Profile
            </h3>

            <div className="space-y-4 text-xs font-semibold text-slate-600">
              {/* Age select */}
              <div className="space-y-1.5">
                <label>Age Classification</label>
                <div className="grid grid-cols-3 bg-gray-50 border border-gray-200/50 rounded-2xl p-1 font-semibold">
                  <button
                    onClick={() => setAge('child')}
                    className={`py-2 rounded-xl transition-all ${age === 'child' ? 'bg-white text-maroon-800 shadow-sm border border-gray-100' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Child (&lt;12 yrs)
                  </button>
                  <button
                    onClick={() => setAge('adult')}
                    className={`py-2 rounded-xl transition-all ${age === 'adult' ? 'bg-white text-maroon-800 shadow-sm border border-gray-100' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Adult (12-65 yrs)
                  </button>
                  <button
                    onClick={() => setAge('elderly')}
                    className={`py-2 rounded-xl transition-all ${age === 'elderly' ? 'bg-white text-maroon-800 shadow-sm border border-gray-100' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Elderly (&gt;65 yrs)
                  </button>
                </div>
              </div>

              {/* Respiratory disorders toggles */}
              <div className="space-y-1.5">
                <label>Pre-existing Chronic Ailments (Select all that apply)</label>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setAsthma(!asthma)}
                    className={`px-3.5 py-2.5 rounded-2xl border transition-all ${
                      asthma ? 'bg-maroon-50 border-maroon-300 text-maroon-800 font-bold' : 'bg-gray-50 border-gray-100 text-slate-500 hover:bg-gray-50'
                    }`}
                  >
                    Asthma
                  </button>
                  <button
                    onClick={() => setCopd(!copd)}
                    className={`px-3.5 py-2.5 rounded-2xl border transition-all ${
                      copd ? 'bg-maroon-50 border-maroon-300 text-maroon-800 font-bold' : 'bg-gray-50 border-gray-100 text-slate-500 hover:bg-gray-50'
                    }`}
                  >
                    COPD / Emphysema
                  </button>
                  <button
                    onClick={() => setHeartDisease(!heartDisease)}
                    className={`px-3.5 py-2.5 rounded-2xl border transition-all ${
                      heartDisease ? 'bg-maroon-50 border-maroon-300 text-maroon-800 font-bold' : 'bg-gray-50 border-gray-100 text-slate-500 hover:bg-gray-50'
                    }`}
                  >
                    Cardiovascular Disease
                  </button>
                  <button
                    onClick={() => setAllergies(!allergies)}
                    className={`px-3.5 py-2.5 rounded-2xl border transition-all ${
                      allergies ? 'bg-maroon-50 border-maroon-300 text-maroon-800 font-bold' : 'bg-gray-50 border-gray-100 text-slate-500 hover:bg-gray-50'
                    }`}
                  >
                    Particulate Allergies
                  </button>
                </div>
              </div>

              {/* Daily outdoor exposure hours slider */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs">
                  <span>Planned Daily Outdoor Transits</span>
                  <span className="text-maroon-800 font-bold">{outdoorHours} hours / day</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={outdoorHours}
                  onChange={(e) => setOutdoorHours(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 border border-gray-200 accent-maroon-800 rounded-full cursor-pointer"
                />
              </div>

            </div>
          </div>

          {/* Dynamic Advice Card details */}
          {advice && (
            <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-3">
                <FiActivity className="text-maroon-800" />
                Personalized Health Advisories
              </h3>

              {adviceLoading ? (
                <p className="text-xs text-gray-400 font-semibold">Recalculating precaution advice...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-600">
                  <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200/20">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Outdoor Exposure</p>
                    <p className="font-bold text-slate-800 mt-2 leading-relaxed">{advice.outdoorTime}</p>
                  </div>
                  <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200/20">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Mask Mandate</p>
                    <p className="font-bold text-slate-800 mt-2 leading-relaxed">{advice.maskRequired}</p>
                  </div>
                  <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200/20">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Home Environment</p>
                    <p className="font-bold text-slate-800 mt-2 leading-relaxed">Seal windows & run HEPA filters on high.</p>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs text-slate-500 leading-relaxed font-medium">
                <span className="font-bold text-slate-800">Precautionary Directive:</span>
                <p className="mt-1">{advice.precautions}</p>
              </div>
            </div>
          )}

        </div>

        {/* AI Health Assistant Chat (Col 3) */}
        <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm flex flex-col h-[520px] justify-between relative">
          <h3 className="font-bold text-slate-800 text-xs tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-2">
            <FiMessageSquare className="text-maroon-800" />
            AI Health Assistant Chat
          </h3>

          {/* Message Thread */}
          <div className="flex-1 overflow-y-auto space-y-4 my-4 pr-1 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">
                  {m.sender === 'user' ? 'You' : 'AI Health Counselor'}
                </span>
                <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-maroon-800 text-white font-medium rounded-tr-none'
                    : 'bg-gray-50 border border-gray-100 text-slate-700 rounded-tl-none font-medium'
                }`}>
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}

            {chatLoading && (
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold animate-pulse">
                <FiActivity className="animate-spin text-maroon-800 w-3.5 h-3.5" />
                Counselor is evaluating spatial health factors...
              </div>
            )}
          </div>

          {/* Quick presets */}
          {messages.length === 1 && (
            <div className="flex flex-col gap-1.5 pb-2.5 border-t border-gray-100 pt-3">
              <button
                onClick={() => handleApplyPreset('Is it safe to go out today for a walk?')}
                className="w-full text-left bg-gray-50 hover:bg-maroon-50 border border-gray-200/50 hover:border-maroon-200 text-[10px] font-bold text-slate-600 hover:text-maroon-800 rounded-xl px-3 py-2 transition-all flex items-center gap-1.5"
              >
                <FiSmile className="shrink-0" /> Is it safe to go out for a walk today?
              </button>
              <button
                onClick={() => handleApplyPreset('Can I do outdoor exercises or jogging?')}
                className="w-full text-left bg-gray-50 hover:bg-maroon-50 border border-gray-200/50 hover:border-maroon-200 text-[10px] font-bold text-slate-600 hover:text-maroon-800 rounded-xl px-3 py-2 transition-all flex items-center gap-1.5"
              >
                <FiSmile className="shrink-0" /> Can I do outdoor exercises or jogging?
              </button>
            </div>
          )}

          {/* Input control */}
          <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
            <input
              type="text"
              placeholder="Ask whether it is safe to walk or exercise..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 outline-none text-xs text-slate-700 font-medium"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              className="p-3 bg-maroon-800 hover:bg-maroon-900 text-white rounded-xl transition-all"
            >
              <FiSend className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
