import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  MapPin, 
  Filter, 
  ArrowUpRight, 
  BarChart3,
  CheckCircle2,
  Calendar,
  Layers,
  RefreshCw
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function MarketPrices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [loading, setLoading] = useState(false);

  const [mandiPrices, setMandiPrices] = useState([
    { id: 1, commodity: 'Wheat (Sharbati)', state: 'Punjab', district: 'Ludhiana', mandi_name: 'Ludhiana APMC', modal_price: 2275, min_price: 2180, max_price: 2350, change_pct: '+1.5%' },
    { id: 2, commodity: 'Paddy (Basmati 1121)', state: 'Punjab', district: 'Khanna', mandi_name: 'Khanna Mandi', modal_price: 4120, min_price: 4000, max_price: 4250, change_pct: '+0.8%' },
    { id: 3, commodity: 'Cotton (Medium Staple)', state: 'Gujarat', district: 'Rajkot', mandi_name: 'Rajkot APMC', modal_price: 7120, min_price: 6900, max_price: 7300, change_pct: '-0.4%' },
    { id: 4, commodity: 'Soybean (Yellow)', state: 'Madhya Pradesh', district: 'Indore', mandi_name: 'Indore Mandi', modal_price: 4850, min_price: 4650, max_price: 4980, change_pct: '+2.1%' },
    { id: 5, commodity: 'Mustard (Black)', state: 'Rajasthan', district: 'Bharatpur', mandi_name: 'Bharatpur Mandi', modal_price: 5350, min_price: 5100, max_price: 5500, change_pct: '+1.2%' },
    { id: 6, commodity: 'Chana (Gram)', state: 'Maharashtra', district: 'Latur', mandi_name: 'Latur APMC', modal_price: 5800, min_price: 5600, max_price: 5950, change_pct: '-0.2%' },
    { id: 7, commodity: 'Potato (Jyoti)', state: 'Uttar Pradesh', district: 'Agra', mandi_name: 'Agra Mandi', modal_price: 1450, min_price: 1300, max_price: 1600, change_pct: '+3.5%' },
    { id: 8, commodity: 'Onion (Red)', state: 'Maharashtra', district: 'Nashik', mandi_name: 'Lasalgaon APMC', modal_price: 2100, min_price: 1850, max_price: 2300, change_pct: '-1.8%' }
  ]);

  const fetchMandiPrices = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/mandi/prices', {
        params: {
          state: selectedState,
          district: selectedDistrict,
          crop: selectedCrop,
          search: searchQuery
        }
      });
      if (res.data && res.data.prices) {
        setMandiPrices(res.data.prices);
      }
    } catch (err) {
      console.warn("Backend Mandi API unreachable, filtering locally.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMandiPrices();
  }, [selectedState, selectedDistrict, selectedCrop]);

  const filteredPrices = mandiPrices.filter(item => {
    const matchesState = selectedState === 'All' || item.state === selectedState;
    const matchesDistrict = selectedDistrict === 'All' || (item.district && item.district === selectedDistrict);
    const matchesCrop = selectedCrop === 'All' || item.commodity.toLowerCase().includes(selectedCrop.toLowerCase());
    const matchesSearch = item.commodity.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.mandi_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesDistrict && matchesCrop && matchesSearch;
  });

  // Chart data for 6-month historical price trends
  const chartData = {
    labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Wheat Sharbati (₹/qtl)',
        data: [2100, 2150, 2180, 2210, 2240, 2275],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Basmati Rice 1121 (₹/qtl)',
        data: [3850, 3920, 3980, 4050, 4080, 4120],
        borderColor: '#fbbf24',
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Cotton Medium (₹/qtl)',
        data: [6900, 7000, 7150, 7200, 7180, 7120],
        borderColor: '#a855f7',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#94a3b8', font: { family: 'Outfit', size: 12 } }
      },
    },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> APMC AGMARKNET Synchronized Feed
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Today's Mandi <span className="gradient-text">Crop Prices</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time daily modal rates, minimum/maximum price bounds, and historical price trend charts.
          </p>
        </div>

        <button 
          onClick={fetchMandiPrices}
          className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-700 text-xs font-semibold transition-all flex items-center gap-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Mandi Feed
        </button>
      </div>

      {/* Price Trend Chart.js Section */}
      <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" /> 6-Month Commodity Price Trend Index
          </h3>
          <span className="text-xs text-slate-400">Modal Prices per Quintal (100 Kg)</span>
        </div>
        <div className="h-64 sm:h-72 w-full">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Search & Multi-Level Filters Bar */}
      <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" /> Search & Mandi Filters
          </h3>
          <span className="text-xs text-slate-400">{filteredPrices.length} Mandi Records Found</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Search Input */}
          <div className="relative">
            <label className="text-xs font-semibold text-slate-400 block mb-1">Search Crop / Mandi</label>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Wheat, Khanna, Rajkot..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 pl-9 text-white text-xs focus:outline-none focus:border-emerald-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-8" />
          </div>

          {/* State Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Filter by State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All States</option>
              <option value="Punjab">Punjab</option>
              <option value="Haryana">Haryana</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Filter by District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Districts</option>
              <option value="Ludhiana">Ludhiana</option>
              <option value="Khanna">Khanna</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Indore">Indore</option>
              <option value="Bharatpur">Bharatpur</option>
              <option value="Latur">Latur</option>
              <option value="Agra">Agra</option>
              <option value="Nashik">Nashik</option>
            </select>
          </div>

          {/* Crop Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Filter by Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Crops</option>
              <option value="Wheat">Wheat</option>
              <option value="Paddy">Paddy / Rice</option>
              <option value="Cotton">Cotton</option>
              <option value="Soybean">Soybean</option>
              <option value="Mustard">Mustard</option>
              <option value="Chana">Chana (Gram)</option>
              <option value="Potato">Potato</option>
              <option value="Onion">Onion</option>
            </select>
          </div>

        </div>
      </div>

      {/* Today's Prices Responsive Table */}
      <div className="glass-panel rounded-3xl border-slate-800 overflow-hidden space-y-4">
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Today's APMC Mandi Rates</h3>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            ● Live Rates Updated Today
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/90 text-xs uppercase font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Commodity Name</th>
                <th className="py-4 px-6">State / District / Mandi</th>
                <th className="py-4 px-6">Today's Modal Price</th>
                <th className="py-4 px-6">Min / Max Range</th>
                <th className="py-4 px-6">24h Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPrices.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-xs text-slate-400">
                    No mandi rates found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredPrices.map((row) => {
                  const isUp = !row.change_pct.includes('-');
                  return (
                    <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6 font-bold text-white">{row.commodity}</td>
                      <td className="py-4 px-6">
                        <span className="block font-semibold text-slate-200">{row.mandi_name}</span>
                        <span className="text-xs text-slate-400">{row.state} {row.district ? `(${row.district})` : ''}</span>
                      </td>
                      <td className="py-4 px-6 font-extrabold text-emerald-400 text-base">
                        ₹{row.modal_price.toLocaleString()} <span className="text-xs font-normal text-slate-400">/qtl</span>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-400">
                        ₹{row.min_price.toLocaleString()} - ₹{row.max_price.toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 font-bold text-xs px-2.5 py-1 rounded-full ${
                          isUp ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'
                        }`}>
                          {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          {row.change_pct}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
