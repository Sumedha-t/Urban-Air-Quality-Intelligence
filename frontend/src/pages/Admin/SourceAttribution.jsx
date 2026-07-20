import { useState, useEffect } from 'react';
import { useUser } from '../../App';
import { getSourceAttributionData, askExplainabilityAgent } from '../../services/api';
import AttributionPie from '../../components/Charts/AttributionPie';
import { FiPieChart, FiCpu, FiSliders, FiHelpCircle, FiSend } from 'react-icons/fi';
import { getAqiCategory } from '../../services/mockData';

export default function SourceAttribution() {
  const { activeLocation } = useUser();
  const [baseAttribution, setBaseAttribution] = useState(null);
  const [estimatorData, setEstimatorData] = useState(null);
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
        setEstimatorData(data.estimator);
        
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

    // Remaining others stay absolute but scale relatively to sum up to 100
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
          Source Attribution & AI Explainability
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-medium">
          Deduce source shares affecting the active location's AQI and simulate target emissions limits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Attribution breakdown and Construction Estimator */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Attribution Pie block */}
          <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-3">
              <FiPieChart className="text-maroon-800" />
              Source Contribution Share (Simulated)
            </h3>
            <AttributionPie attributionData={simulatedAttribution} />
          </div>

          {/* Construction Estimator display */}
          <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm space-y-4">
            <div>
              <span className="text-[10px] text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded font-bold border border-maroon-100 uppercase tracking-wider inline-block">
                CPCB Proximate Model
              </span>
              <h3 className="font-bold text-slate-800 text-sm mt-2">Unpermitted Construction Dust Estimator</h3>
              <p className="text-xs text-gray-400 mt-0.5 leading-normal">
                Because construction permits are often unreported, we evaluate dust using Sentinel-2 Greenness indices, bare-soil ratios, and localized PM10 concentration spikes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-50 pt-4">
              <div className="bg-cream-50/50 rounded-2xl p-3 border border-cream-200/20 text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Satellite SVI Veg.</p>
                <p className="text-base font-black text-slate-800 font-mono mt-1">{estimatorData?.satelliteSVI}</p>
                <p className="text-[9px] text-emerald-600 mt-0.5">Healthy foliage</p>
              </div>
              <div className="bg-cream-50/50 rounded-2xl p-3 border border-cream-200/20 text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Bare Soil Ratio</p>
                <p className="text-base font-black text-slate-800 font-mono mt-1">{estimatorData?.bareSoilRatio}%</p>
                <p className="text-[9px] text-orange-600 mt-0.5">Dust potential</p>
              </div>
              <div className="bg-cream-50/50 rounded-2xl p-3 border border-cream-200/20 text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Active Dust Sites</p>
                <p className="text-base font-black text-slate-800 font-mono mt-1">{estimatorData?.detectedActiveSites}</p>
                <p className="text-[9px] text-gray-400 mt-0.5">AI Spatial detection</p>
              </div>
            </div>

            <div className="text-xs font-semibold text-slate-600 space-y-2 bg-gray-50/50 border border-gray-100 rounded-2xl p-4.5">
              <div className="flex justify-between">
                <span>Correlation Factor (SVI vs PM10):</span>
                <span className="font-bold font-mono text-maroon-800">+{estimatorData?.pmCorrelationCoefficient} Strong</span>
              </div>
              <div className="flex justify-between">
                <span>Calculated Construction Dust Share:</span>
                <span className="font-bold font-mono text-slate-800">~{estimatorData?.estimatedPMContribution} µg/m³</span>
              </div>
            </div>
          </div>

        </div>

        {/* What-If Simulator and Explainability chatbot */}
        <div className="space-y-6">
          
          {/* Sliders Simulator */}
          <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-3">
              <FiSliders className="text-maroon-800" />
              "What-If" Emission Simulator
            </h3>

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

            {/* Simulated outcome Box */}
            <div className="bg-cream-100/40 border border-maroon-100/30 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Simulated AQI</p>
                <p className="text-3xl font-black text-slate-800 font-mono mt-1 leading-none">{simulatedAqi}</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border shadow-sm ${category.color}`}>
                {category.label}
              </span>
            </div>
            
            <button
              onClick={() => {
                setTrafficReduction(0);
                setIndustrialReduction(0);
              }}
              className="w-full text-center text-[10px] font-bold text-gray-400 hover:text-maroon-800 hover:underline transition-all mt-1"
            >
              Reset Simulation Sliders
            </button>
          </div>

          {/* AI Explainability Agent chatbot container */}
          <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm flex flex-col h-[320px] justify-between relative">
            <h3 className="font-bold text-slate-800 text-xs tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-2">
              <FiCpu className="text-maroon-800" />
              AI Diagnostics Console
            </h3>

            {/* Message thread logs */}
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
                    {/* Render Markdown or standard text */}
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
                  onClick={() => handleApplyPreset('How is PM2.5 AQI computed?')}
                  className="bg-gray-50 hover:bg-maroon-50 border border-gray-200/50 hover:border-maroon-200 text-[9px] font-bold text-slate-600 hover:text-maroon-800 rounded-lg px-2 py-1 transition-all"
                >
                  Explain AQI Calculation
                </button>
                <button
                  onClick={() => handleApplyPreset('Explain what-if simulation output.')}
                  className="bg-gray-50 hover:bg-maroon-50 border border-gray-200/50 hover:border-maroon-200 text-[9px] font-bold text-slate-600 hover:text-maroon-800 rounded-lg px-2 py-1 transition-all"
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
                onClick={() => handleAskAgent(inputValue)}
                className="p-2.5 bg-maroon-800 hover:bg-maroon-900 text-white rounded-xl transition-all"
              >
                <FiSend className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
