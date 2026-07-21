import { useState, useEffect } from 'react';
import { useUser } from '../../App';
import { getSourceAttributionData, askExplainabilityAgent } from '../../services/api';
import AttributionPie from '../../components/Charts/AttributionPie';
import { FiPieChart, FiCpu, FiSliders, FiSend } from 'react-icons/fi';
import { getAqiCategory } from '../../services/mockData';

export default function SourceAttribution() {
  const { activeLocation } = useUser();
  const [baseAttribution, setBaseAttribution] = useState(null);
  const [loading, setLoading] = useState(true);

  // What-If Simulator state
  const [trafficReduction, setTrafficReduction] = useState(0);
  const [industrialReduction, setIndustrialReduction] = useState(0);
  
  // Dynamic simulated state
  const [simulatedAqi, setSimulatedAqi] = useState(0);
  const [simulatedAttribution, setSimulatedAttribution] = useState({});

  // AI Agent chatbot state
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I am the UAQIP AI Explainability Agent. I analyze spatial data fusion matrices to clarify pollution sources and run what-if simulators. Select a preset query or ask me anything.`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Fetch initial base values
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getSourceAttributionData(activeLocation.id);
        setBaseAttribution(data.attribution);
        
        // Reset sliders
        setTrafficReduction(0);
        setIndustrialReduction(0);
        
        setSimulatedAqi(activeLocation.aqi);
        setSimulatedAttribution(data.attribution);
      } catch (err) {
        console.error("Failed to load attribution metrics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeLocation]);

  // Recalculate What-If effects
  useEffect(() => {
    if (!baseAttribution) return;

    // Reductions formulas
    const netAqiDecrease = Math.round((trafficReduction * 0.8) + (industrialReduction * 0.5));
    const newAqi = Math.max(45, activeLocation.aqi - netAqiDecrease);
    setSimulatedAqi(newAqi);

    // Compute new relative weights
    const newTraffic = baseAttribution.traffic * (1 - trafficReduction / 100);
    const newIndustries = baseAttribution.industries * (1 - industrialReduction / 100);
    
    const sumReduced = newTraffic + newIndustries;
    const baseSumReduced = baseAttribution.traffic + baseAttribution.industries;
    const baseOthers = 100 - baseSumReduced;

    const newTotal = sumReduced + baseOthers;
    
    const newAtt = {
      traffic: Number(((newTraffic / newTotal) * 100).toFixed(1)),
      industries: Number(((newIndustries / newTotal) * 100).toFixed(1)),
      construction: Number(((baseAttribution.construction / newTotal) * 100).toFixed(1)),
      residential: Number(((baseAttribution.residential / newTotal) * 100).toFixed(1)),
      biomass_burning: Number(((baseAttribution.biomass_burning / newTotal) * 100).toFixed(1)),
      weather: Number(((baseAttribution.weather / newTotal) * 100).toFixed(1)),
      natural: Number(((baseAttribution.natural / newTotal) * 100).toFixed(1)),
    };
    setSimulatedAttribution(newAtt);
  }, [trafficReduction, industrialReduction, baseAttribution, activeLocation]);

  const handleAskAgent = async (textToSend) => {
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setAiLoading(true);

    try {
      const response = await askExplainabilityAgent(
        textToSend,
        { trafficReduction, industrialReduction },
        activeLocation.name
      );
      setMessages(prev => [...prev, { sender: 'ai', text: response.answer }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'ai', text: 'I encountered an issue compiling the simulation statistics. Please try again.' }]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplyPreset = (query) => {
    handleAskAgent(query);
  };

  if (loading || !baseAttribution) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-maroon-800 border-t-transparent"></div>
        <p className="mt-4 text-xs font-semibold text-gray-400">Loading Attribution Model Matrices...</p>
      </div>
    );
  }

  const category = getAqiCategory(simulatedAqi);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Pollution Diagnostics</span>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
          Source Attribution & AI Diagnostics
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-medium">
          Deduce source shares affecting the active location's AQI and simulate target emissions limits.
        </p>
      </div>

      {/* Grid: Left Panel (AI Console + Sliders) | Right Panel (Attribution Graph) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT PANEL: AI Console & Simulator (Occupies 2 columns on lg screen for better layout) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Sliders Simulator */}
          <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-3">
              <FiSliders className="text-maroon-800" />
              "What-If" Emission Simulator
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Slider 1: Traffic */}
              <div className="space-y-1.5 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-700">Vehicular Traffic Caps</span>
                  <span className="text-maroon-800 font-bold">-{trafficReduction}% emissions</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={trafficReduction}
                  onChange={(e) => setTrafficReduction(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 border border-gray-200 accent-maroon-800 rounded-full cursor-pointer"
                />
              </div>

              {/* Slider 2: Industrial */}
              <div className="space-y-1.5 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-700">Industrial Output Limit</span>
                  <span className="text-maroon-800 font-bold">-{industrialReduction}% emissions</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={industrialReduction}
                  onChange={(e) => setIndustrialReduction(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 border border-gray-200 accent-maroon-800 rounded-full cursor-pointer"
                />
              </div>
            </div>

            {/* Simulated outcome Box */}
            <div className="bg-cream-100/40 border border-maroon-100/30 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Simulated Outcome AQI</p>
                <p className="text-3xl font-black text-slate-800 font-mono mt-1 leading-none">{simulatedAqi}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase border shadow-sm ${category.color}`}>
                  {category.label}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setTrafficReduction(0);
                    setIndustrialReduction(0);
                  }}
                  className="block text-[9px] font-bold text-maroon-700 hover:underline mt-2 cursor-pointer ml-auto"
                >
                  Reset Simulation
                </button>
              </div>
            </div>
          </div>

          {/* AI Diagnostics Chat Console */}
          <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm flex flex-col h-[350px] justify-between relative">
            <h3 className="font-bold text-slate-800 text-xs tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-2">
              <FiCpu className="text-maroon-800 animate-pulse" />
              AI Diagnostics Console
            </h3>

            {/* Message logs */}
            <div className="flex-1 overflow-y-auto space-y-3.5 my-3 pr-1 text-xs">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">
                    {m.sender === 'user' ? 'You' : 'Explainability Agent'}
                  </span>
                  <div className={`p-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-maroon-800 text-white font-medium rounded-tr-none' 
                      : 'bg-gray-50 border border-gray-100 text-slate-700 rounded-tl-none font-medium'
                  }`}>
                    <div className="space-y-1.5 whitespace-pre-wrap">{m.text}</div>
                  </div>
                </div>
              ))}
              
              {aiLoading && (
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold animate-pulse">
                  <FiCpu className="animate-spin text-maroon-800 w-3.5 h-3.5" />
                  Agent is analyzing simulation factors...
                </div>
              )}
            </div>

            {/* Presets query tags */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-1.5 pb-2.5">
                <button
                  type="button"
                  onClick={() => handleApplyPreset('How is PM2.5 AQI computed?')}
                  className="bg-gray-50 hover:bg-maroon-50 border border-gray-200/50 hover:border-maroon-200 text-[9px] font-bold text-slate-600 hover:text-maroon-800 rounded-lg px-2 py-1 transition-all cursor-pointer"
                >
                  Explain AQI Calculation
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('Explain what-if simulation output.')}
                  className="bg-gray-50 hover:bg-maroon-50 border border-gray-200/50 hover:border-maroon-200 text-[9px] font-bold text-slate-600 hover:text-maroon-800 rounded-lg px-2 py-1 transition-all cursor-pointer"
                >
                  Explain "What-If" Simulation
                </button>
              </div>
            )}

            {/* Chat Input */}
            <div className="flex items-center gap-2 border-t border-gray-100 pt-3.5">
              <input
                type="text"
                placeholder="Ask about calculations or site diagnostics..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAgent(inputValue)}
                className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 outline-none text-xs text-slate-700 font-medium"
              />
              <button
                type="button"
                onClick={() => handleAskAgent(inputValue)}
                className="p-2.5 bg-maroon-800 hover:bg-maroon-900 text-white rounded-xl transition-all cursor-pointer"
              >
                <FiSend className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: Source share chart & Legend (Occupies 1 column) */}
        <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-4 h-max">
          <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-3">
            <FiPieChart className="text-maroon-800" />
            Source Contribution Share (Simulated)
          </h3>
          <div className="flex flex-col items-center">
            <AttributionPie attributionData={simulatedAttribution} />
          </div>
        </div>

      </div>
    </div>
  );
}
