import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  Sun, 
  TrendingUp, 
  Bug, 
  FlaskConical, 
  ShieldCheck, 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  BarChart3, 
  CloudRain, 
  FileText,
  PhoneCall,
  Search,
  ChevronDown,
  Mail,
  Send,
  Newspaper,
  Star,
  Award,
  HeartHandshake
} from 'lucide-react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', query: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 4000);
  };

  const faqs = [
    {
      q: 'Is AgriConnect completely free of cost for Indian farmers?',
      a: 'Yes! AgriConnect is 100% free for all farmers. All AI tools, crop recommendation engines, live mandi price trackers, weather forecasts, and disease scanners can be accessed without any subscription fee.'
    },
    {
      q: 'How accurate is the AI Leaf Disease Detection tool?',
      a: 'Our Leaf Disease Diagnostic model is trained on over 50,000 verified ICAR agricultural leaf datasets and delivers up to 98.4% diagnostic accuracy for common fungal, bacterial, and pest diseases.'
    },
    {
      q: 'How often are Mandi Commodity Prices updated?',
      a: 'Market prices across national APMC mandis are synchronized every hour directly from official AGMARKNET agricultural market boards.'
    },
    {
      q: 'Can I apply for government schemes directly through this portal?',
      a: 'AgriConnect provides step-by-step application guidance, required document checklists, and direct link routing to official state and central scheme portals (PM-Kisan, PMFBY, KCC).'
    },
    {
      q: 'How do I request a free soil sample test for my farm?',
      a: 'Submit an inquiry through our Contact section selecting "Soil Testing Request". Our nearest district agronomist will arrange sample pickup and provide an NPK analysis report.'
    }
  ];

  const newsItems = [
    {
      id: 1,
      title: 'Cabinet Approves Hike in Minimum Support Price (MSP) for Rabi Crops',
      category: 'Government Policy',
      date: 'Aug 6, 2026',
      readTime: '3 min read',
      snippet: 'Wheat MSP increased by ₹150 per quintal, ensuring guaranteed profitable returns for small and marginal farmers.',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Monsoon Revival Brings Relaying Opportunities for Kharif Paddy Farmers',
      category: 'Climate & Weather',
      date: 'Aug 5, 2026',
      readTime: '4 min read',
      snippet: 'Widespread precipitation across Punjab, Haryana, and UP restores groundwater reservoirs and accelerates rice transplantation.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Drone Technology Subsidy Extended to Farmer Producer Organizations (FPOs)',
      category: 'AgriTech Innovation',
      date: 'Aug 3, 2026',
      readTime: '5 min read',
      snippet: 'Up to 80% subsidy offered on agricultural spraying drones for precision liquid fertilizer and pesticide deployment.',
      image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const testimonials = [
    {
      name: 'Gurpreet Singh',
      location: 'Ludhiana, Punjab',
      crop: 'Wheat & Paddy',
      stars: 5,
      quote: 'AgriConnect helped me detect Nitrogen deficiency early in my wheat crop. Following their fertilizer recommendation boosted my yield by 4 quintals per acre!'
    },
    {
      name: 'Rameshwar Patil',
      location: 'Nashik, Maharashtra',
      crop: 'Cotton & Sugarcane',
      stars: 5,
      quote: 'The live Mandi price tracker allowed me to sell my cotton at Rajkot APMC for ₹7,200/qtl instead of selling locally at a lower rate. Exceptional app!'
    },
    {
      name: 'Sunita Devi',
      location: 'Gorakhpur, Uttar Pradesh',
      crop: 'Vegetables & Mustard',
      stars: 5,
      quote: 'I uploaded a photo of my leaf spots, and the Disease Scanner diagnosed Early Blight within seconds with exact fungicide dosages. Saved my tomato harvest!'
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      
      {/* 1. Hero Banner */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        {/* Glowing backdrop blur elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-emerald-500/40 text-emerald-400 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Next-Gen AI Agriculture Portal for Indian Farmers
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-5xl mx-auto leading-tight">
            Cultivate Higher Yields with <span className="gradient-text">Smart Agricultural Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            AgriConnect brings AI crop selection, precision soil testing, instant leaf disease scanning, live APMC mandi prices, and government scheme access directly to your farm.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              to="/crop-recommendation" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-900/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Sprout className="w-5 h-5" />
              Get AI Crop Recommendation
            </Link>

            <Link 
              to="/market-prices" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel hover:bg-slate-800 text-white font-semibold text-base transition-all border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Check Live Mandi Prices
            </Link>
          </div>

        </div>
      </section>

      {/* 2. Live Mandi Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-4 rounded-2xl border-emerald-500/20 bg-slate-900/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-bold text-white uppercase tracking-wider">Live Mandi Ticker:</span>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto w-full py-1 text-sm no-scrollbar">
            <div className="flex items-center gap-2 shrink-0 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="font-semibold text-slate-200">Wheat (Punjab)</span>
              <span className="text-emerald-400 font-bold">₹2,275/qtl</span>
              <span className="text-xs text-emerald-400">▲ +1.5%</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="font-semibold text-slate-200">Paddy (Haryana)</span>
              <span className="text-emerald-400 font-bold">₹2,183/qtl</span>
              <span className="text-xs text-emerald-400">▲ +0.8%</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="font-semibold text-slate-200">Cotton (Gujarat)</span>
              <span className="text-red-400 font-bold">₹7,120/qtl</span>
              <span className="text-xs text-red-400">▼ -0.4%</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="font-semibold text-slate-200">Soybean (MP)</span>
              <span className="text-emerald-400 font-bold">₹4,850/qtl</span>
              <span className="text-xs text-emerald-400">▲ +2.1%</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Live Statistics Counter Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-3xl text-center space-y-2 border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center mb-2">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white gradient-text">50,000+</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Farmers Registered</p>
          </div>

          <div className="glass-card p-6 rounded-3xl text-center space-y-2 border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center mb-2">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white gradient-amber-text">98.4%</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">AI Crop Accuracy</p>
          </div>

          <div className="glass-card p-6 rounded-3xl text-center space-y-2 border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 mx-auto flex items-center justify-center mb-2">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white text-blue-400">450+</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">APMC Mandis Tracked</p>
          </div>

          <div className="glass-card p-6 rounded-3xl text-center space-y-2 border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 mx-auto flex items-center justify-center mb-2">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white text-purple-400">₹12 Cr+</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Subsidies Claimed</p>
          </div>
        </div>
      </section>

      {/* 4. About Agriculture & Smart Farming */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <HeartHandshake className="w-4 h-4" /> Empowering Rural Agriculture
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Bridging Traditional Farming Wisdom with <span className="gradient-text">Artificial Intelligence</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Agriculture is the backbone of India’s economy. AgriConnect was created to eliminate information asymmetry for small and marginal farmers. By combining soil science, satellite weather telemetry, machine learning models, and direct APMC market connectivity, we help farmers reduce crop risk and maximize net income.
            </p>
            <div className="space-y-3 text-sm text-slate-200">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Optimized Soil NPK & Micronutrient Balancing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Early Blight & Rust Fungal Disease Alerts</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Direct Access to PM-Kisan & Subsidy Welfare Grants</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-2xl border-emerald-500/30 bg-emerald-950/20 text-center space-y-2">
              <Sprout className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white text-base">Soil Diagnostics</h4>
              <p className="text-xs text-slate-400">Customized fertilizer recommendations per acre.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border-amber-500/30 bg-amber-950/20 text-center space-y-2">
              <Sun className="w-10 h-10 text-amber-400 mx-auto" />
              <h4 className="font-bold text-white text-base">Weather Advisory</h4>
              <p className="text-xs text-slate-400">Hyperlocal 7-day rain & humidity forecasts.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border-blue-500/30 bg-blue-950/20 text-center space-y-2">
              <TrendingUp className="w-10 h-10 text-blue-400 mx-auto" />
              <h4 className="font-bold text-white text-base">Mandi Prices</h4>
              <p className="text-xs text-slate-400">Real-time commodity rates across Indian mandis.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border-purple-500/30 bg-purple-950/20 text-center space-y-2">
              <FileText className="w-10 h-10 text-purple-400 mx-auto" />
              <h4 className="font-bold text-white text-base">Welfare Schemes</h4>
              <p className="text-xs text-slate-400">Simplified subsidy eligibility & application guides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4" /> Full Spectrum Platform
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Smart Services for Every Stage of Cultivation
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From pre-sowing soil testing to post-harvest selling at maximum market prices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="glass-card p-8 rounded-3xl space-y-4 relative group border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Sprout className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
              AI Crop Recommendation
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Analyze Nitrogen, Phosphorus, Potassium, soil pH, and climate metrics to determine high-yield crops.
            </p>
            <Link to="/crop-recommendation" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 pt-2">
              Calculate Crop Match <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4 relative group border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <FlaskConical className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
              Precision Fertilizer Calculator
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Calculate exact per-acre doses of Urea, DAP, and MOP to optimize input cost and protect soil health.
            </p>
            <Link to="/fertilizer-recommendation" className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 pt-2">
              Calculate Fertilizer <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4 relative group border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
              <Bug className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
              Crop Leaf Disease Doctor
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Upload a clear photo of an infected leaf to diagnose fungal diseases and receive agronomist treatment plans.
            </p>
            <Link to="/disease-detection" className="inline-flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300 pt-2">
              Scan Affected Leaf <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4 relative group border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Sun className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              Hyperlocal Weather Advisory
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              7-day forecasts, humidity levels, wind speeds, and extreme weather alerts tailored to your district.
            </p>
            <Link to="/weather" className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 pt-2">
              Check Forecast <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4 relative group border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
              Real-time APMC Mandi Rates
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Track daily commodity prices across national APMC mandis to negotiate top rates for your harvest.
            </p>
            <Link to="/market-prices" className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 pt-2">
              Track Prices <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4 relative group border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
              Government Schemes Portal
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Discover PM-Kisan, crop insurance, solar pump subsidies, and low-interest Kisan Credit Cards.
            </p>
            <Link to="/government-schemes" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 pt-2">
              Check Schemes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. Latest Agriculture News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Newspaper className="w-4 h-4" /> Agricultural Bulletins
            </div>
            <h2 className="text-3xl font-extrabold text-white mt-1">Latest Agriculture News & Policy Updates</h2>
          </div>
          <Link to="/blogs" className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1">
            View All Articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((news) => (
            <div key={news.id} className="glass-card rounded-3xl border-slate-800 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-emerald-400 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                    {news.category}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-[11px] text-slate-400">{news.date} • {news.readTime}</span>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                    {news.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{news.snippet}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link to="/blogs" className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs transition-colors flex items-center justify-center gap-1.5">
                  Read Full Bulletin <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Star className="w-4 h-4 fill-amber-400" /> Farmer Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Trusted by Over 50,000 Indian Farmers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="glass-card p-6 sm:p-8 rounded-3xl border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">"{item.quote}"</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center border border-emerald-500/40 text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-[11px] text-slate-400">{item.location} • {item.crop}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Interactive FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-xs sm:text-sm">Find answers to key questions about soil testing, accuracy, and free services.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card border border-slate-800 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-5 text-sm font-bold text-white flex items-center justify-between hover:text-emerald-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-300 border-t border-slate-800/80 pt-3 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. Contact & Emergency Helpline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
                <PhoneCall className="w-4 h-4 animate-pulse" /> 24/7 Kisan Helpdesk
              </span>
              <h3 className="text-2xl font-bold text-white">Need Expert Agricultural Guidance?</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Connect directly with certified ICAR extension scientists for instant assistance with crop diseases, fertilizer calculations, or welfare schemes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Toll-Free Kisan Helpline</span>
              <p className="text-3xl font-black text-white">1800-180-1551</p>
              <p className="text-xs text-slate-400">Available Daily 6:00 AM – 10:00 PM IST</p>
            </div>
          </div>

          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
              <Mail className="w-5 h-5 text-emerald-400" /> Send Query to Agronomists
            </h3>

            {contactSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Query submitted! An agricultural officer will contact you within 24 hours.
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ramesh Kumar"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Mobile Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98765 43210"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Question / Problem</label>
                <textarea 
                  rows="3"
                  required
                  placeholder="Ask about crop diseases, soil testing, or mandi prices..."
                  value={contactForm.query}
                  onChange={(e) => setContactForm({...contactForm, query: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Query
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 10. Call-To-Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-900/60 via-slate-900 to-emerald-950/80 p-8 sm:p-14 border border-emerald-500/30 overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to Upgrade Your Farm's Yield & Profitability?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Join 50,000+ Indian farmers using AgriConnect to test soil, scan diseases, track mandi rates, and access government subsidies.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/register" className="px-8 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold hover:bg-emerald-400 transition-colors shadow-lg">
                Create Free Account
              </Link>
              <Link to="/contact" className="px-8 py-3.5 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 border border-slate-700 transition-colors">
                Talk to Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
