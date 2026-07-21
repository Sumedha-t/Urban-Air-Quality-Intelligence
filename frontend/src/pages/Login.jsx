import { useState } from 'react';
import { useUser } from '../App';
import { useNavigate } from 'react-router-dom';
import { FiShield, FiUser, FiLock, FiInfo } from 'react-icons/fi';

export default function Login() {
  const { setRole } = useUser();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('citizen'); // 'admin' or 'citizen'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Pre-validating fields
    if (selectedRole === 'admin') {
      if (!username || !password || !pin) {
        setError('Administrators require Username, Password, and a Security PIN.');
        return;
      }
    } else {
      if (!username) {
        setError('Citizens require at least a Name or Mobile Number to proceed.');
        return;
      }
    }

    setLoading(true);
    // Simulate JWT authentication delay
    setTimeout(() => {
      setLoading(false);
      setRole(selectedRole);
      navigate(selectedRole === 'admin' ? '/admin' : '/citizen');
    }, 850);
  };

  return (
    <div className="min-h-screen w-screen bg-[#fbf9f7] flex items-center justify-center p-4">
      {/* Outer Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-maroon-100/40 flex flex-col md:flex-row h-auto md:h-[580px]">
        
        {/* Info/Emblem Column (Left Side) */}
        <div className="w-full md:w-1/2 bg-slate-900 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle maroon ambient mesh background */}
          <div className="absolute inset-0 bg-radial-gradient from-maroon-900/30 to-slate-950 z-0"></div>
          
          <div className="relative z-10 space-y-4">
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-xl font-serif">
              🇮🇳
            </div>
            <div>
              <p className="text-[10px] text-maroon-400 font-bold uppercase tracking-widest font-mono">Government of India</p>
              <h2 className="text-xl md:text-2xl font-black font-sans leading-tight mt-1 tracking-tight">
                Urban Air Quality <br />
                <span className="text-maroon-400">Intelligence Platform</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm pt-2">
              An AI-powered environmental decision support gateway for real-time monitoring, multi-sensor data fusion, forecast modeling, and emission mitigation dispatch.
            </p>
          </div>

          {/* NCAP targets summary */}
          <div className="relative z-10 border-t border-slate-800 pt-6 space-y-3.5 mt-8 md:mt-0">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">National Clean Air Programme Goals</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Target Particulate Drop:</span>
                <span className="text-emerald-400 font-bold font-mono">20% - 30% by 2026</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Active Sensor Grid Network:</span>
                <span className="text-emerald-400 font-bold font-mono">150+ Smart Cities</span>
              </div>
            </div>
            <p className="text-[9px] text-slate-500 leading-tight flex items-start gap-1">
              <FiInfo className="w-3.5 h-3.5 shrink-0 text-maroon-400" />
              This site uses spatial datasets aligned with guidelines from the Central Pollution Control Board.
            </p>
          </div>
        </div>

        {/* Auth form Column (Right Side) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Access Portal Gateway</h3>
              <p className="text-xs text-gray-400 font-semibold mt-1">Select your access layer and enter credentials</p>
            </div>

            {/* Role switcher toggle tabs */}
            <div className="grid grid-cols-2 bg-gray-50 border border-gray-200/50 rounded-2xl p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('citizen');
                  setError('');
                }}
                className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  selectedRole === 'citizen' ? 'bg-white text-maroon-800 shadow-md border border-gray-100' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <FiUser className="w-4 h-4" />
                Citizen Portal
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('admin');
                  setError('');
                }}
                className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  selectedRole === 'admin' ? 'bg-white text-maroon-800 shadow-md border border-gray-100' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <FiShield className="w-4 h-4" />
                Administrator
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl font-medium">
                {error}
              </div>
            )}

            {/* Inputs */}
            <div className="space-y-3.5 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-slate-500">{selectedRole === 'admin' ? 'Administrator ID / Email' : 'Name / Mobile (for verification)'}</label>
                <input
                  type="text"
                  required
                  placeholder={selectedRole === 'admin' ? 'admin@moefcc.gov.in' : 'Rahul Sharma or +91 98765 43210'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-maroon-500 focus:bg-white px-3.5 py-3 rounded-xl outline-none font-medium text-slate-800 transition-all text-sm"
                />
              </div>

              {selectedRole === 'admin' && (
                <>
                  <div className="space-y-1">
                    <label className="text-slate-500">Secure Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-maroon-500 focus:bg-white pl-3.5 pr-10 py-3 rounded-xl outline-none font-medium text-slate-800 transition-all text-sm"
                      />
                      <FiLock className="absolute right-3.5 top-3.5 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500">Government Security PIN (4-digit)</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      placeholder="0000"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-maroon-500 focus:bg-white px-3.5 py-3 rounded-xl outline-none font-mono text-center font-bold tracking-widest text-slate-800 transition-all text-sm"
                    />
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-maroon-800 hover:bg-maroon-900 disabled:bg-slate-400 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>

            <div className="text-center pt-2 text-[10px] text-gray-400 font-medium">
              <p>For credentials support, reach out to the NIC Helpdesk at <span className="underline cursor-pointer">support@cpcb.nic.in</span></p>
              <p className="mt-1">Future security measures will include multi-factor JWT tokens.</p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
