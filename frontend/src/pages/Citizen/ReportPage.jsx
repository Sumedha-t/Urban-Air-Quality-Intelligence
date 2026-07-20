import { useState, useEffect } from 'react';
import { getComplaints, submitComplaint, voteComplaint } from '../../services/api';
import { FiMessageSquare, FiUpload, FiCheckCircle, FiHeart, FiMapPin } from 'react-icons/fi';
import { useUser } from '../../App';

export default function ReportPage() {
  const { activeLocation } = useUser();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [category, setCategory] = useState('Construction Dust');
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getComplaints();
        setComplaints(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Pre-fill location based on context
  useEffect(() => {
    if (activeLocation) {
      setLocationName(activeLocation.name);
    }
  }, [activeLocation]);

  const handleImageUploadMock = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess(false);

    if (!locationName.trim() || !description.trim()) {
      setFormError('Please enter the location and detailed description.');
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitComplaint({
        location: locationName,
        category,
        description,
        image: imagePreview
      });
      
      setComplaints(prev => [result, ...prev]);
      setDescription('');
      setImagePreview(null);
      setFormSuccess(true);
    } catch (err) {
      console.error(err);
      setFormError('Failed to dispatch complaint records. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (id) => {
    try {
      const updated = await voteComplaint(id);
      setComplaints(prev =>
        prev.map(c => c.id === id ? { ...c, votes: updated.votes, userVoted: updated.userVoted } : c)
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
        <p className="mt-4 text-xs font-semibold text-gray-400">Loading Complaints Registry...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Public Participation</span>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
          Report Pollution & Upvote Hotspots
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-medium">
          Flag localized emission sources (waste burning, construction dust, industrial leaks) to demand intervention.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form panel */}
        <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm h-max">
          <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-3">
            <FiMessageSquare className="text-maroon-800" />
            File New Environmental Complaint
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs font-semibold text-slate-600">
            {formSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center gap-1.5 font-bold animate-pulse">
                <FiCheckCircle className="shrink-0" /> Complaint submitted and posted to Priority board.
              </div>
            )}
            
            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl font-medium">
                {formError}
              </div>
            )}

            {/* Category */}
            <div className="space-y-1">
              <label>Pollution Source Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none font-semibold text-slate-700 focus:ring-1 focus:ring-maroon-500"
              >
                <option>Construction Dust</option>
                <option>Waste Burning</option>
                <option>Industrial Smoke Leak</option>
                <option>Vehicular Smog</option>
                <option>Others / Natural Dust</option>
              </select>
            </div>

            {/* Location input */}
            <div className="space-y-1">
              <label className="flex items-center gap-1">
                <FiMapPin className="text-maroon-700" /> Site Coordinates / Address
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sector 5, Salt Lake, Kolkata"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl px-3 py-2.5 outline-none font-medium text-slate-700 transition-all text-xs"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label>Details & Observations</label>
              <textarea
                required
                rows={4}
                placeholder="Detail the pollution event, timing, intensity, and impact..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl px-3 py-2 outline-none font-medium text-slate-700 transition-all text-xs"
              ></textarea>
            </div>

            {/* Mock Image Upload */}
            <div className="space-y-1">
              <label>Attach Evidence Photo (Optional)</label>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center cursor-pointer hover:bg-gray-50 hover:border-maroon-300 transition-all relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUploadMock}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {imagePreview ? (
                  <img src={imagePreview} alt="Evidence Preview" className="h-28 mx-auto rounded-lg object-cover" />
                ) : (
                  <div className="space-y-1">
                    <FiUpload className="w-5 h-5 mx-auto text-gray-400" />
                    <p className="text-[10px] text-gray-400">Click or drag images to upload evidence</p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-maroon-800 hover:bg-maroon-900 disabled:bg-slate-400 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {submitting ? 'Submitting Details...' : 'Submit Mitigation Report'}
            </button>
          </form>
        </div>

        {/* Complaints list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm tracking-tight border-b border-gray-50 pb-3 flex items-center gap-1.5">
              Active Regional Complaints Registry
            </h3>

            <div className="space-y-4 mt-4 max-h-[500px] overflow-y-auto pr-1">
              {complaints.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/20 flex gap-4 transition-all items-start justify-between">
                  <div className="flex gap-4">
                    {/* Complaint Mock Image */}
                    {c.image && (
                      <img 
                        src={c.image} 
                        alt="Evidence" 
                        className="h-16 w-16 md:h-20 md:w-20 rounded-xl object-cover border border-gray-200 shrink-0" 
                      />
                    )}
                    
                    {/* Details */}
                    <div className="space-y-1.5 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full font-bold text-[9px] bg-maroon-50 border border-maroon-100 text-maroon-800 uppercase">
                          {c.category}
                        </span>
                        <span className="text-gray-400 font-mono text-[9px]">{c.date}</span>
                      </div>
                      <h4 className="font-bold text-slate-700 text-sm leading-snug">{c.location}</h4>
                      <p className="text-slate-500 leading-relaxed text-[11px]">{c.description}</p>
                      
                      {/* Status Badges */}
                      <div className="flex items-center gap-2.5 pt-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Status: <span className="text-slate-600">{c.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Vote button */}
                  <button
                    onClick={() => handleVote(c.id)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border shrink-0 transition-all ${
                      c.userVoted 
                        ? 'bg-maroon-50 border-maroon-200 text-maroon-800' 
                        : 'bg-white border-gray-200 text-slate-400 hover:text-slate-600 hover:bg-gray-50'
                    }`}
                  >
                    <FiHeart className={`w-4 h-4 ${c.userVoted ? 'fill-maroon-800' : ''}`} />
                    <span className="text-[10px] font-black font-mono leading-none">{c.votes}</span>
                  </button>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
