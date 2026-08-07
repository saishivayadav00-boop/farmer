import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sprout, 
  Sun, 
  TrendingUp, 
  FileText, 
  BookOpen, 
  Mail, 
  UserCheck, 
  ShieldAlert, 
  Menu, 
  X, 
  ChevronDown, 
  LayoutDashboard, 
  Bug, 
  FlaskConical, 
  LogIn, 
  UserPlus
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => {
    setIsOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                Agri<span className="gradient-text">Connect</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-emerald-400/90 -mt-1">
                Smart Farmer Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 font-medium text-sm">
            <Link 
              to="/" 
              className={`px-3.5 py-2 rounded-lg transition-all ${isActive('/') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}
            >
              Home
            </Link>

            <Link 
              to="/dashboard" 
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${isActive('/dashboard') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>

            {/* Smart Tools Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setServicesOpen(!servicesOpen)}
                onBlur={() => setTimeout(() => setServicesOpen(false), 200)}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  ['/crop-recommendation', '/fertilizer-recommendation', '/disease-detection'].includes(location.pathname)
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                AI Smart Tools <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesOpen && (
                <div className="absolute left-0 mt-2 w-64 glass-panel bg-slate-900/95 border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <Link 
                    to="/crop-recommendation" 
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                  >
                    <Sprout className="w-4 h-4 text-emerald-400" />
                    Crop Recommendation
                  </Link>
                  <Link 
                    to="/fertilizer-recommendation" 
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                  >
                    <FlaskConical className="w-4 h-4 text-amber-400" />
                    Fertilizer Advisory
                  </Link>
                  <Link 
                    to="/disease-detection" 
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                  >
                    <Bug className="w-4 h-4 text-red-400" />
                    Crop Disease Diagnosis
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to="/weather" 
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${isActive('/weather') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}
            >
              <Sun className="w-4 h-4 text-amber-400" />
              Weather
            </Link>

            <Link 
              to="/market-prices" 
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${isActive('/market-prices') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Mandi Prices
            </Link>

            <Link 
              to="/government-schemes" 
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${isActive('/government-schemes') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}
            >
              <FileText className="w-4 h-4 text-blue-400" />
              Schemes
            </Link>

            <Link 
              to="/blogs" 
              className={`px-3.5 py-2 rounded-lg transition-all ${isActive('/blogs') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}
            >
              Blogs
            </Link>

            <Link 
              to="/contact" 
              className={`px-3.5 py-2 rounded-lg transition-all ${isActive('/contact') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Right Auth Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link 
              to="/admin" 
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${isActive('/admin') ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-slate-800/70 text-slate-300 border border-slate-700 hover:bg-slate-800 hover:text-white'}`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
              Admin Portal
            </Link>

            <Link 
              to="/login" 
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>

            <Link 
              to="/register" 
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 text-slate-950 hover:from-emerald-400 hover:to-green-500 shadow-md shadow-emerald-900/30 transition-all flex items-center gap-1.5 font-bold"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden glass-panel bg-slate-900/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <Link 
            to="/" 
            onClick={closeMenu}
            className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            onClick={closeMenu}
            className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
          >
            Dashboard
          </Link>
          <div className="pl-4 space-y-1 border-l-2 border-slate-700">
            <span className="block px-4 py-1 text-xs uppercase font-bold tracking-wider text-slate-400">AI Smart Tools</span>
            <Link to="/crop-recommendation" onClick={closeMenu} className="block px-4 py-2 text-sm text-slate-300 hover:text-emerald-400">Crop Recommendation</Link>
            <Link to="/fertilizer-recommendation" onClick={closeMenu} className="block px-4 py-2 text-sm text-slate-300 hover:text-emerald-400">Fertilizer Advisory</Link>
            <Link to="/disease-detection" onClick={closeMenu} className="block px-4 py-2 text-sm text-slate-300 hover:text-emerald-400">Disease Detection</Link>
          </div>
          <Link 
            to="/weather" 
            onClick={closeMenu}
            className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
          >
            Weather Advisory
          </Link>
          <Link 
            to="/market-prices" 
            onClick={closeMenu}
            className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
          >
            Mandi Market Prices
          </Link>
          <Link 
            to="/government-schemes" 
            onClick={closeMenu}
            className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
          >
            Government Schemes
          </Link>
          <Link 
            to="/blogs" 
            onClick={closeMenu}
            className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
          >
            Blogs & Knowledge Base
          </Link>
          <Link 
            to="/contact" 
            onClick={closeMenu}
            className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
          >
            Contact & Support
          </Link>
          
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <Link 
              to="/admin" 
              onClick={closeMenu}
              className="w-full text-center py-2.5 rounded-lg bg-purple-900/40 text-purple-300 border border-purple-500/30 text-sm font-semibold"
            >
              Admin Portal
            </Link>
            <div className="flex gap-2 pt-1">
              <Link 
                to="/login" 
                onClick={closeMenu}
                className="flex-1 text-center py-2.5 rounded-lg bg-slate-800 text-white text-sm font-semibold"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                onClick={closeMenu}
                className="flex-1 text-center py-2.5 rounded-lg bg-emerald-500 text-slate-950 text-sm font-bold"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
