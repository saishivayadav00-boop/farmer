import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { validateName, validateEmail, validatePhone, validatePassword } from '../utils/validation';
import { UserPlus, User, Mail, Phone, Lock, MapPin, Sprout, RefreshCw } from 'lucide-react';

export default function Register({ showToast }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: 'farmer',
    state: 'Punjab'
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameErr = validateName(formData.fullName);
    const emailErr = validateEmail(formData.email);
    const phoneErr = validatePhone(formData.phone);
    const passErr = validatePassword(formData.password);

    if (nameErr || emailErr || phoneErr || passErr) {
      setErrors({ fullName: nameErr, email: emailErr, phone: phoneErr, password: passErr });
      if (showToast) showToast(nameErr || emailErr || phoneErr || passErr, 'error');
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await authAPI.register({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        state: formData.state
      });

      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_role', res.data.user.role);
        localStorage.setItem('user_name', res.data.user.full_name);

        if (showToast) showToast('Registration successful! Welcome to AgriConnect.', 'success');
        navigate('/dashboard');
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Registration failed. Please check inputs.';
      setErrors({ general: errMsg });
      if (showToast) showToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="glass-panel max-w-md w-full p-8 sm:p-10 rounded-3xl border-emerald-500/30 bg-slate-900/95 space-y-6 relative overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
            <UserPlus className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Register <span className="gradient-text">Farmer Account</span>
          </h1>
          <p className="text-xs text-slate-400">Join 50,000+ farmers using AgriConnect AI tools.</p>
        </div>

        {errors.general && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name *</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="Ramesh Kumar"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 pl-10 text-white text-sm focus:outline-none"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {errors.fullName && <span className="text-[11px] text-red-400 block mt-1">{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address *</label>
            <div className="relative">
              <input 
                type="email"
                placeholder="ramesh@agriconnect.in"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 pl-10 text-white text-sm focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {errors.email && <span className="text-[11px] text-red-400 block mt-1">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Mobile Phone Number *</label>
            <div className="relative">
              <input 
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 pl-10 text-white text-sm focus:outline-none"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {errors.phone && <span className="text-[11px] text-red-400 block mt-1">{errors.phone}</span>}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Password *</label>
            <div className="relative">
              <input 
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 pl-10 text-white text-sm focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {errors.password && <span className="text-[11px] text-red-400 block mt-1">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-extrabold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />} Create Free Account
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-400 border-t border-slate-800">
          Already registered?{' '}
          <Link to="/login" className="text-emerald-400 font-bold hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
}
