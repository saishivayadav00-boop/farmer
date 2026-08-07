import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, PhoneCall, ShieldCheck, Mail, ArrowRight, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm mt-24">
      {/* Kisan Emergency Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <PhoneCall className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-emerald-400">24/7 Kisan Toll-Free Advisory Helpline</p>
              <p className="text-lg font-extrabold text-white">1800-180-1551 <span className="text-xs font-normal text-slate-400">(Toll Free)</span></p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Government Certified Agronomists & Soil Experts Available Daily
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-900/40">
                <Sprout className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Agri<span className="gradient-text">Connect</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm max-w-sm">
              Empowering farmers with AI-driven crop intelligence, real-time weather alerts, mandi market prices, and direct access to welfare schemes.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-300 mb-2">Subscribe to Weekly Agricultural Bulletins</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-sm">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg px-3.5 py-2 w-full focus:outline-none focus:border-emerald-500"
                />
                <button 
                  type="submit" 
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-lg font-bold transition-all shrink-0 flex items-center gap-1"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Smart Platform</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home Portal</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Farmer Dashboard</Link></li>
              <li><Link to="/weather" className="hover:text-emerald-400 transition-colors">Weather Advisory</Link></li>
              <li><Link to="/market-prices" className="hover:text-emerald-400 transition-colors">Live Mandi Prices</Link></li>
              <li><Link to="/government-schemes" className="hover:text-emerald-400 transition-colors">Welfare Schemes</Link></li>
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">AI Advisory Tools</h4>
            <ul className="space-y-2.5">
              <li><Link to="/crop-recommendation" className="hover:text-emerald-400 transition-colors">Crop Suitability AI</Link></li>
              <li><Link to="/fertilizer-recommendation" className="hover:text-emerald-400 transition-colors">Fertilizer Calculator</Link></li>
              <li><Link to="/disease-detection" className="hover:text-emerald-400 transition-colors">Leaf Disease Scanner</Link></li>
              <li><Link to="/blogs" className="hover:text-emerald-400 transition-colors">Knowledge Base</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Consult Agronomist</Link></li>
            </ul>
          </div>

          {/* Account & Support */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">User Portal</h4>
            <ul className="space-y-2.5">
              <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Farmer Login</Link></li>
              <li><Link to="/register" className="hover:text-emerald-400 transition-colors">New Registration</Link></li>
              <li><Link to="/admin" className="hover:text-emerald-400 transition-colors">Admin Console</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Help & FAQ</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AgriConnect Portal. Designed for Sustainable Indian Farming.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400">Terms of Service</a>
            <a href="#disclaimer" className="hover:text-slate-400">Agricultural Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
