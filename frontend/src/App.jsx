import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatAssistant from './components/AIChatAssistant';
import Toast from './components/Toast';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Weather from './pages/Weather';
import CropRecommendation from './pages/CropRecommendation';
import FertilizerRecommendation from './pages/FertilizerRecommendation';
import DiseaseDetection from './pages/DiseaseDetection';
import MarketPrices from './pages/MarketPrices';
import GovernmentSchemes from './pages/GovernmentSchemes';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';

export default function App() {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-hidden">
        
        {/* Ambient Glow Orbs */}
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Navbar />

        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home showToast={showToast} />} />
            <Route path="/dashboard" element={<Dashboard showToast={showToast} />} />
            <Route path="/weather" element={<Weather showToast={showToast} />} />
            <Route path="/crop-recommendation" element={<CropRecommendation showToast={showToast} />} />
            <Route path="/fertilizer-recommendation" element={<FertilizerRecommendation showToast={showToast} />} />
            <Route path="/disease-detection" element={<DiseaseDetection showToast={showToast} />} />
            <Route path="/market-prices" element={<MarketPrices showToast={showToast} />} />
            <Route path="/government-schemes" element={<GovernmentSchemes showToast={showToast} />} />
            <Route path="/blogs" element={<Blogs showToast={showToast} />} />
            <Route path="/contact" element={<Contact showToast={showToast} />} />
            <Route path="/login" element={<Login showToast={showToast} />} />
            <Route path="/register" element={<Register showToast={showToast} />} />
            <Route path="/admin" element={<Admin showToast={showToast} />} />
          </Routes>
        </main>

        <Footer />

        {/* Global Toast Notification */}
        {toast.show && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={closeToast} 
          />
        )}

        {/* Floating Global AI Chat Assistant */}
        <AIChatAssistant />
      </div>
    </Router>
  );
}
