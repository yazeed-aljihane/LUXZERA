import React, { useState, useEffect } from "react";
import { Sliders } from "lucide-react";
import { getMeasurements, saveMeasurements } from "../../services/users/userService";
import Loader from "../Loader";

const MeasurementsView = ({ userId, initialMeasurements, onSaveSuccess }) => {
  const [measurements, setMeasurements] = useState(initialMeasurements || {
    topSize: "",
    bottomSize: "",
    shoeSize: "",
    fitPreference: "REGULAR"
  });
  const [loading, setLoading] = useState(!initialMeasurements);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (initialMeasurements) {
      setMeasurements(initialMeasurements);
      setLoading(false);
      return;
    }

    const fetchMeasurements = async () => {
      if (!userId) return;
      try {
        const data = await getMeasurements(userId);
        if (data) {
          setMeasurements({
            topSize: data.topSize || "",
            bottomSize: data.bottomSize || "",
            shoeSize: data.shoeSize || "",
            fitPreference: data.fitPreference || "REGULAR"
          });
        }
      } catch (err) {
        console.error("Failed to load measurements", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeasurements();
  }, [userId, initialMeasurements]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setErrorMsg("");
    try {
      await saveMeasurements(userId, measurements);
      setSuccess(true);
      onSaveSuccess?.(measurements);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to save measurements. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 select-none">
        <Loader size="w-12 h-12" />
        <div className="text-[10px] tracking-[0.45em] font-semibold text-slate-400/80 mt-5 uppercase animate-pulse pl-[0.45em]">
          LuxZera
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <style>{`
        .animate-draw-path {
          stroke-dasharray: 300;
          animation: path-draw 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2.5s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes path-draw {
          0% { stroke-dashoffset: 300; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -300; }
        }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(255, 140, 51, 0.15)); opacity: 0.8; }
          50% { filter: drop-shadow(0 0 10px rgba(255, 140, 51, 0.6)); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Saving Overlay */}
      {saving && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] rounded-2xl flex items-center justify-center z-20 animate-fade-in">
          <Loader size="w-10 h-10" />
        </div>
      )}

      <div className="pb-6 border-b border-slate-100 mb-6">
        <h2 className="text-xl font-bold text-[#2D3436] tracking-tight">Personal Measurements & Fit</h2>
        <p className="text-xs text-slate-400 mt-1">Configure your physical sizing parameters to find clothing that fits perfectly.</p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-xs font-semibold text-red-600">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          {/* Top Size */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Top / Shirt Size</label>
            <select
              name="topSize"
              value={measurements.topSize}
              onChange={handleChange}
              className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition cursor-pointer"
            >
              <option value="">Select Size</option>
              <option value="XS">Extra Small (XS)</option>
              <option value="S">Small (S)</option>
              <option value="M">Medium (M)</option>
              <option value="L">Large (L)</option>
              <option value="XL">Extra Large (XL)</option>
              <option value="XXL">Double Extra Large (XXL)</option>
            </select>
          </div>

          {/* Bottom Size */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Bottom / Waist Size</label>
            <select
              name="bottomSize"
              value={measurements.bottomSize}
              onChange={handleChange}
              className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition cursor-pointer"
            >
              <option value="">Select Size</option>
              <option value="28">28</option>
              <option value="30">30</option>
              <option value="32">32</option>
              <option value="34">34</option>
              <option value="36">36</option>
              <option value="38">38</option>
              <option value="40">40</option>
            </select>
          </div>

          {/* Shoe Size */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Shoe Size (US)</label>
            <select
              name="shoeSize"
              value={measurements.shoeSize}
              onChange={handleChange}
              className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition cursor-pointer"
            >
              <option value="">Select Size</option>
              <option value="7">7</option>
              <option value="7.5">7.5</option>
              <option value="8">8</option>
              <option value="8.5">8.5</option>
              <option value="9">9</option>
              <option value="9.5">9.5</option>
              <option value="10">10</option>
              <option value="10.5">10.5</option>
              <option value="11">11</option>
              <option value="11.5">11.5</option>
              <option value="12">12</option>
            </select>
          </div>

          {/* Fit Preference */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Fit Style Preference</label>
            <select
              name="fitPreference"
              value={measurements.fitPreference}
              onChange={handleChange}
              className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition cursor-pointer"
            >
              <option value="SLIM">Slim Fit</option>
              <option value="REGULAR">Regular Fit</option>
              <option value="OVERSIZED">Oversized / Loose Fit</option>
            </select>
          </div>
        </div>

        {/* Fit Tip Card */}
        <div className="p-4 bg-[#F9F9F9] rounded-xl border border-slate-200/50 flex gap-3.5 items-start">
          <Sliders size={18} className="text-[#FF8C33] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-[#2D3436]">LuxZera SmartSizing</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              These sizes will be cross-referenced with designer blueprints to suggest sizing options automatically on all product pages.
            </p>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-2.5 text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 ${
              success 
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/10" 
                : "bg-[#FF8C33] hover:bg-[#e67e2e] disabled:bg-slate-300 text-white shadow-orange-500/10"
            }`}
          >
            {saving ? (
              <span>Saving...</span>
            ) : success ? (
              <>
                <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Changes Saved</span>
              </>
            ) : (
              "Save Measurements"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeasurementsView;
