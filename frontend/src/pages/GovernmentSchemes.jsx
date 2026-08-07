import React, { useState, useEffect } from 'react';
import { schemeAPI } from '../services/api';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Coins, 
  Clock, 
  X,
  RefreshCw
} from 'lucide-react';

export default function GovernmentSchemes({ showToast }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeScheme, setActiveScheme] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    'All',
    'Financial Support',
    'Solar & Energy',
    'Crop Insurance',
    'Credit & Loans'
  ];

  const [schemes, setSchemes] = useState([
    {
      id: 1,
      title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      category: 'Financial Support',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      benefit: '₹6,000 / Year in 3 Direct Cash Installments',
      eligibility: 'All landholding farmer families with cultivable land',
      documents: ['Aadhaar Card', 'Land Ownership Records (Khasra/Khatauni)', 'Active Bank Passbook'],
      link: 'https://pmkisan.gov.in',
      description: 'Central sector scheme providing income support of ₹6,000 per annum to small and marginal farmer families nationwide via Direct Benefit Transfer (DBT).'
    },
    {
      id: 2,
      title: 'PM-KUSUM Solar Irrigation Pump Scheme',
      category: 'Solar & Energy',
      ministry: 'Ministry of New & Renewable Energy',
      benefit: 'Up to 60% Subsidy on Off-Grid Solar Pumps',
      eligibility: 'Farmers, FPOs, Cooperatives with agricultural land',
      documents: ['Aadhaar Card', 'Electricity Connection No.', 'Land Registration Paper'],
      link: 'https://pmkusum.mnre.gov.in',
      description: 'Provides standalone solar agriculture pumps to replace diesel engines, enabling daytime irrigation and reducing electricity bills to zero.'
    },
    {
      id: 3,
      title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      category: 'Crop Insurance',
      ministry: 'Ministry of Agriculture',
      benefit: 'Comprehensive Yield & Weather Crop Damage Cover',
      eligibility: 'All farmers growing notified crops in notified areas',
      documents: ['Aadhaar Card', 'Sowing Certificate', 'Bank Account Details'],
      link: 'https://pmfby.gov.in',
      description: 'Financial support to farmers suffering crop loss/damage arising out of unforeseen natural calamities, pests & diseases at low premium rates (2% Kharif, 1.5% Rabi).'
    },
    {
      id: 4,
      title: 'Kisan Credit Card (KCC) Scheme',
      category: 'Credit & Loans',
      ministry: 'Reserve Bank of India & NABARD',
      benefit: 'Concessional Agricultural Loans at 4% Effective Interest',
      eligibility: 'Individual farmers, joint borrowers, tenant farmers',
      documents: ['KCC Application Form', 'Pahani/Land Records', 'Identity Proof'],
      link: 'https://nabard.org',
      description: 'Timely credit support to farmers for their cultivation and farm asset purchasing needs with flexible repayment periods.'
    }
  ]);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const res = await schemeAPI.getSchemes({
        category: selectedCategory,
        search: searchQuery
      });
      if (res.data && res.data.schemes) {
        setSchemes(res.data.schemes);
      }
    } catch (err) {
      console.warn("Backend Scheme API offline, filtering local dataset.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [selectedCategory]);

  const filteredSchemes = schemes.filter(s => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <FileText className="w-4 h-4 text-emerald-400" /> Government Welfare Schemes & Subsidies
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Farmer Welfare <span className="gradient-text">Schemes Portal</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Simplified application guidelines, required document checklists, and direct official scheme links.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80 relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search schemes (e.g. PM-Kisan, Solar)..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 pl-10 text-white text-xs focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
              selectedCategory === cat 
                ? 'bg-emerald-500 text-slate-950 shadow-lg' 
                : 'glass-panel text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Schemes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="glass-card p-6 sm:p-8 rounded-3xl border-slate-800 space-y-5 flex flex-col justify-between group">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  {scheme.category}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">{scheme.ministry}</span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                {scheme.title}
              </h3>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Financial / Subsidy Benefit:</span>
                <p className="text-base font-extrabold text-emerald-400">{scheme.benefit}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {scheme.description}
              </p>

            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button 
                onClick={() => setActiveScheme(scheme)}
                className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
              >
                View Required Documents & Application <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Scheme Detail Reader Modal */}
      {activeScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-150">
            
            <button 
              onClick={() => setActiveScheme(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                {activeScheme.category}
              </span>
              <h2 className="text-2xl font-extrabold text-white leading-snug">
                {activeScheme.title}
              </h2>
              <p className="text-xs text-slate-400">{activeScheme.ministry}</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Benefit Amount:</span>
              <p className="text-lg font-bold text-white">{activeScheme.benefit}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider">Required Document Checklist:</h4>
              <div className="space-y-2">
                {activeScheme.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button 
                onClick={() => setActiveScheme(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors"
              >
                Close Window
              </button>
              <a 
                href={activeScheme.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
              >
                Go to Official Govt Portal <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
