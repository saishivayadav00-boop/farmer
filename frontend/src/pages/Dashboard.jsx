import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  Sun, 
  TrendingUp, 
  Bug, 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  MapPin, 
  ArrowUpRight,
  Droplets,
  Wind,
  Bell,
  Check,
  Activity,
  PieChart as PieIcon,
  BarChart2,
  Clock,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Weather Advisory', message: 'Rainfall expected on Saturday. Postpone pesticide spraying for 48 hrs.', type: 'warning', time: '2 hours ago', read: false },
    { id: 2, title: 'PM-Kisan Installment', message: 'Your 14th installment of ₹2,000 has been credited to your bank account.', type: 'success', time: '1 day ago', read: false },
    { id: 3, title: 'Soil Test Result Ready', message: 'Your NPK analysis report for Field Sector 4 is ready to view.', type: 'info', time: '2 days ago', read: true },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const activities = [
    { id: 1, title: 'Soil Test Analyzed', desc: 'NPK reading: N-90, P-42, K-43 (Alluvial Soil)', date: 'Today, 10:30 AM', icon: Sprout, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { id: 2, title: 'Leaf Disease Scan', desc: 'Diagnosed Tomato Early Blight (97.6% confidence)', date: 'Yesterday, 4:15 PM', icon: Bug, color: 'text-red-400', bg: 'bg-red-500/10' },
    { id: 3, title: 'Mandi Price Alert', desc: 'Wheat Sharbati reached ₹2,275/qtl at Khanna Mandi', date: '6 Aug 2026', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { id: 4, title: 'PM-KUSUM Scheme Inquiry', desc: 'Solar Pump subsidy eligibility guide downloaded', date: '4 Aug 2026', icon: ShieldCheck, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  ];

  // Chart 1: 6-Month Mandi Price Trend
  const priceTrendData = {
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
      }
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#94a3b8', font: { family: 'Outfit', size: 12 } } },
    },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
    }
  };

  // Chart 2: Land Crop Distribution
  const cropDistributionData = {
    labels: ['Wheat (2.5 Acres)', 'Paddy (1.5 Acres)', 'Mustard (0.5 Acre)'],
    datasets: [
      {
        data: [55, 33, 12],
        backgroundColor: ['#22c55e', '#3b82f6', '#fbbf24'],
        borderWidth: 0,
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: 'Outfit', size: 11 } } }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-emerald-500/20 bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" /> Punjab, Sector 4 Farm • Active Rabi Season
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Welcome back, <span className="gradient-text">Ramesh Kumar</span> 🌾
          </h1>
          <p className="text-slate-400 text-sm">
            Here is your daily farm summary, weather advisory, market price trends, and active tasks.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <Link 
            to="/crop-recommendation" 
            className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-sm font-bold hover:bg-emerald-400 transition-all shadow-md flex items-center gap-1.5"
          >
            <Sprout className="w-4 h-4" /> New Crop Test
          </Link>
          <Link 
            to="/disease-detection" 
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Bug className="w-4 h-4 text-red-400" /> Leaf Diagnosis
          </Link>
        </div>
      </div>

      {/* 2. Statistics Cards (4 Core Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Total Cultivated Area</span>
          <p className="text-2xl font-bold text-white mt-1">4.5 Acres</p>
          <span className="text-[11px] text-emerald-400 font-semibold">Wheat & Mustard</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Soil Health Index</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">84 / 100</p>
          <span className="text-[11px] text-slate-400">pH 6.8 (Optimal)</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Est. Wheat Mandi Price</span>
          <p className="text-2xl font-bold text-amber-400 mt-1">₹2,275</p>
          <span className="text-[11px] text-emerald-400 font-semibold">▲ +1.5% this week</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Active Scheme Status</span>
          <p className="text-xl font-bold text-blue-400 mt-1">PM-Kisan</p>
          <span className="text-[11px] text-emerald-400 font-semibold">Installment #14 Approved</span>
        </div>
      </div>

      {/* Main Grid: Left Column & Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Chart 1: Price Trends */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-400" /> Mandi Commodity Price Trends
              </h3>
              <span className="text-xs text-slate-400">6-Month Historical Index</span>
            </div>
            <div className="h-64 sm:h-72 w-full">
              <Line data={priceTrendData} options={lineOptions} />
            </div>
          </div>

          {/* Grid: Notifications & Crop Land Distribution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Notifications Alert Center */}
            <div className="glass-card p-6 rounded-3xl space-y-4 border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">Alerts & Notifications</h3>
                </div>
                {unreadCount > 0 ? (
                  <button onClick={markAllRead} className="text-[11px] text-emerald-400 font-semibold hover:underline">
                    Mark All Read ({unreadCount})
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-500">All caught up</span>
                )}
              </div>

              <div className="space-y-3">
                {notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`p-3.5 rounded-2xl border text-xs space-y-1 transition-all ${
                      n.read ? 'bg-slate-900/40 border-slate-800/80 opacity-75' : 'bg-slate-900 border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${n.type === 'warning' ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{n.message}</p>
                    {!n.read && (
                      <button 
                        onClick={() => markAsRead(n.id)} 
                        className="text-[10px] text-emerald-400 font-bold hover:underline pt-1 inline-flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Dismiss Alert
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Land Distribution Doughnut */}
            <div className="glass-card p-6 rounded-3xl space-y-4 border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PieIcon className="w-5 h-5 text-blue-400" /> Crop Land Distribution
                </h3>
                <span className="text-xs text-slate-400">4.5 Acres</span>
              </div>
              <div className="h-56 w-full flex items-center justify-center">
                <Doughnut data={cropDistributionData} options={doughnutOptions} />
              </div>
            </div>

          </div>

          {/* Recent Activities Log */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" /> Recent Farm Activities
              </h3>
              <span className="text-xs text-slate-400">Activity Log</span>
            </div>

            <div className="space-y-3">
              {activities.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${act.bg} ${act.color} flex items-center justify-center shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{act.title}</p>
                        <p className="text-xs text-slate-400">{act.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 shrink-0">{act.date}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Weather Widget */}
          <div className="glass-card p-6 rounded-3xl space-y-6 bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/20 border-amber-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sun className="w-4 h-4" /> Live Weather Today
              </span>
              <Link to="/weather" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
                Full 7-Day <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-4xl font-extrabold text-white">28°C</h4>
                <p className="text-sm text-slate-300 font-medium mt-1">Partly Cloudy</p>
                <p className="text-xs text-slate-400">Feels like 30°C • Amritsar, PB</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sun className="w-10 h-10 animate-spin-slow" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <Droplets className="w-4 h-4 text-blue-400" />
                <div>
                  <span className="block text-slate-400">Humidity</span>
                  <span className="font-bold text-slate-200">62%</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <Wind className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="block text-slate-400">Wind</span>
                  <span className="font-bold text-slate-200">14 km/h</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
              💡 <strong>Agri Tip:</strong> Ideal weather for Urea fertilizer top-dressing today. Rain probability low for 48 hrs.
            </div>
          </div>

          {/* Mandi Crop Prices Watchlist */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" /> Mandi Watchlist
              </h3>
              <Link to="/market-prices" className="text-xs text-emerald-400 hover:underline">View All</Link>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <div>
                  <p className="font-bold text-white">Wheat (Sharbati)</p>
                  <p className="text-xs text-slate-400">Khanna Mandi</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-400">₹2,275/qtl</p>
                  <p className="text-[11px] text-emerald-400">▲ +₹35 (+1.5%)</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <div>
                  <p className="font-bold text-white">Basmati Rice 1121</p>
                  <p className="text-xs text-slate-400">Tarn Taran</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-400">₹4,120/qtl</p>
                  <p className="text-[11px] text-emerald-400">▲ +₹20 (+0.8%)</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <div>
                  <p className="font-bold text-white">Mustard Seed</p>
                  <p className="text-xs text-slate-400">Bathinda Mandi</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-400">₹5,350/qtl</p>
                  <p className="text-[11px] text-emerald-400">▲ +₹80 (+1.2%)</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <div>
                  <p className="font-bold text-white">Cotton (Medium)</p>
                  <p className="text-xs text-slate-400">Rajkot APMC</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-400">₹7,120/qtl</p>
                  <p className="text-[11px] text-red-400">▼ -₹30 (-0.4%)</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
