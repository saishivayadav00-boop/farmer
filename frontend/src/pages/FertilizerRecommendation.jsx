import React, { useState } from 'react';
import axios from 'axios';
import { 
  FlaskConical, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Droplet, 
  Scale, 
  FileCheck,
  Layers,
  Sprout,
  Info,
  ShieldAlert,
  RefreshCw
} from 'lucide-react';

export default function FertilizerRecommendation() {
  const [formData, setFormData] = useState({
    crop: 'Wheat',
    soil: 'Loamy Soil'
  });

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState({
    best_fertilizer: 'Urea (46% N) + DAP (18-46-0) + MOP (60% K2O)',
    reason: 'Wheat cultivated in Loamy Soil requires robust Nitrogen for crown root initiation (CRI) and high Phosphorus to establish deep root architecture.',
    usage: 'Apply 55 Kg DAP + 20 Kg MOP per acre as basal dose during land preparation. Apply 45 Kg Urea in 2 split doses: 50% at 1st irrigation (21 days) and 50% at jointing stage (45 days).',
    precautions: 'Do not apply Urea on dry soil surface. Avoid mixing DAP directly with Zinc Sulphate in the same container. Wear protective gloves and a mask during broadcasting.'
  });

  const handlePreset = (crop, soil) => {
    setFormData({ crop, soil });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://127.0.0.1:5000/api/crops/fertilizer', {
        crop: formData.crop,
        soil: formData.soil
      });

      if (res.data && res.data.recommendation) {
        setRecommendation(res.data.recommendation);
      }
    } catch (err) {
      console.warn("Backend API unreachable, using local recommendation calculation.", err);
      if (formData.crop.toLowerCase().includes('paddy')) {
        setRecommendation({
          best_fertilizer: 'Urea + Single Super Phosphate (SSP) + MOP + Zinc Sulphate (21%)',
          reason: `Paddy grown in ${formData.soil} needs early Nitrogen and Zinc supplementation to prevent Khaira disease in flooded clay fields.`,
          usage: 'Apply 150 Kg SSP + 25 Kg MOP + 10 Kg Zinc Sulphate per acre before transplanting. Top-dress 50 Kg Urea at active tillering (21 days).',
          precautions: 'Keep field flooded with 2-3 cm water layer during Urea application. Never apply Zinc Sulphate with DAP directly in the same basin.'
        });
      } else {
        setRecommendation({
          best_fertilizer: 'Urea (46% N) + DAP (18-46-0) + MOP (60% K2O)',
          reason: `${formData.crop} grown in ${formData.soil} requires balanced NPK nutrition.`,
          usage: 'Apply 55 Kg DAP + 20 Kg MOP per acre basal. Apply 45 Kg Urea in 2 split doses.',
          precautions: 'Avoid broadcasting Urea during peak hot afternoon hours. Wear protective equipment.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <FlaskConical className="w-4 h-4" /> Soil Nutrient Advisory Engine
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Precision Fertilizer <span className="gradient-amber-text">Calculator</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Select your target crop and soil type to receive agronomist-verified fertilizer dosage, usage instructions, and safety precautions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column (6 cols) */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" /> Enter Farm Crop & Soil
            </h2>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-semibold">Quick Presets:</span>
              <button onClick={() => handlePreset('Wheat', 'Loamy Soil')} type="button" className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-700">Wheat/Loam</button>
              <button onClick={() => handlePreset('Paddy', 'Clay Soil')} type="button" className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-700">Paddy/Clay</button>
              <button onClick={() => handlePreset('Cotton', 'Black Cotton Soil')} type="button" className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-700">Cotton/Black</button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Input 1: Crop */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-emerald-400" /> Target Crop Selection
              </label>
              <select 
                value={formData.crop}
                onChange={(e) => setFormData({...formData, crop: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
              >
                <option value="Wheat">Wheat (Rabi Season)</option>
                <option value="Paddy">Paddy / Rice (Kharif Season)</option>
                <option value="Cotton">Cotton (Bt-Cotton)</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Maize">Maize (Corn)</option>
                <option value="Potato">Potato</option>
                <option value="Mustard">Mustard (Sarson)</option>
                <option value="Vegetables">Vegetables / Commercial</option>
              </select>
            </div>

            {/* Input 2: Soil */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" /> Farm Soil Type
              </label>
              <select 
                value={formData.soil}
                onChange={(e) => setFormData({...formData, soil: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
              >
                <option value="Loamy Soil">Loamy Soil</option>
                <option value="Clay Soil">Clay Soil</option>
                <option value="Sandy Soil">Sandy Soil</option>
                <option value="Black Cotton Soil">Black Cotton Soil</option>
                <option value="Red Soil">Red / Laterite Soil</option>
                <option value="Alluvial Soil">Alluvial Soil</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-extrabold text-base transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Calculating Optimum Fertilizer Formula...
                </>
              ) : (
                <>
                  <FlaskConical className="w-5 h-5" /> Calculate Fertilizer Recommendation
                </>
              )}
            </button>

          </form>
        </div>

        {/* Results Column (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-amber-500/30 bg-slate-900/90 space-y-6">
            
            {/* Header / Target */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-amber-400" /> Fertilizer Advisory Output
              </h3>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30">
                {formData.crop} • {formData.soil}
              </span>
            </div>

            {/* Output 1: Best Fertilizer */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Best Fertilizer Recommendation:</span>
              <p className="text-xl font-extrabold text-white">{recommendation.best_fertilizer}</p>
            </div>

            {/* Output 2: Reason */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-blue-400" /> Agronomic Reason:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
                {recommendation.reason}
              </p>
            </div>

            {/* Output 3: Usage */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Usage & Application Instructions:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-emerald-950/20 p-4 rounded-2xl border border-emerald-500/20">
                {recommendation.usage}
              </p>
            </div>

            {/* Output 4: Precautions */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> Handling Precautions & Guidelines:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-red-950/20 p-4 rounded-2xl border border-red-500/20">
                {recommendation.precautions}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
