import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BookOpen, 
  Search, 
  Tag, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  X, 
  Share2, 
  Sparkles, 
  CheckCircle2,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBlog, setActiveBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    'All',
    'Organic Farming',
    'Technology',
    'Irrigation',
    'Modern Equipment',
    'Seasonal Tips'
  ];

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Organic Soil Health: Transitioning from Chemical Fertilizers to Bio-Compost',
      category: 'Organic Farming',
      author: 'Dr. Harpreet Singh',
      author_role: 'Chief Soil Scientist, ICAR',
      date: 'Aug 5, 2026',
      read_time: '5 min read',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Learn how combining Vermicompost, Panchagavya, and Jeevamrut rejuvenates soil organic carbon and boosts long-term soil fertility.',
      content: `Over-reliance on synthetic nitrogen fertilizers (Urea) has depleted organic carbon in Indian soils below 0.5%. Transitioning to bio-organic farming regenerates soil micro-flora, improves water retention capacity, and reduces input costs.

### Key Practices for Soil Regeneration:
1. **Jeevamrut Preparation**: Blend 10 Kg fresh cow dung, 10 L cow urine, 2 Kg jaggery, and 2 Kg pulse flour in 200 L water. Ferment for 48 hours and apply via irrigation water.
2. **Green Manuring**: Sow Dhaincha (*Sesbania*) or Sunnhemp prior to paddy cultivation and plow back at 45 days.
3. **Crop Residue Management**: Mulch wheat straw instead of burning to add 3.5 tonnes of carbon per acre.

Following these practices increases earthworm populations by 300% and reduces chemical fertilizer demand by 40% within two crop cycles.`
    },
    {
      id: 2,
      title: 'Drone Agriculture & AI Telemetry: The Future of Precision Pesticide Spraying',
      category: 'Technology',
      author: 'Priya Sharma',
      author_role: 'AgriTech Innovation Lead',
      date: 'Aug 4, 2026',
      read_time: '6 min read',
      image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Agricultural spraying drones equipped with multispectral cameras slash pesticide volume by 30% and cover 10 acres in under 20 minutes.',
      content: `Drone spraying technology is revolutionizing crop protection across Punjab, Haryana, and Maharashtra. By utilizing ultra-low volume (ULV) nozzles, drones achieve uniform droplet distribution while eliminating manual exposure to hazardous chemicals.

### Benefits of Drone Spraying:
- **Efficiency**: Covers 1 acre in 6 minutes with 10 liters of water vs 200 liters needed manually.
- **Pesticide Savings**: Precision targeted spraying reduces chemical wastage by 25-30%.
- **Safety**: Zero physical contact for farmers with liquid insecticides.`
    },
    {
      id: 3,
      title: 'Sub-Surface Drip Irrigation: Maximizing Crop Yields with 50% Less Water',
      category: 'Irrigation',
      author: 'Rajeshwar Patil',
      author_role: 'Irrigation Engineer',
      date: 'Aug 2, 2026',
      read_time: '4 min read',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Sub-surface drip fertigation delivers water and nutrients directly to the root zone, preventing weed germination and evaporation loss.',
      content: `Water scarcity poses a critical challenge for sugarcane, cotton, and maize growers. Sub-surface drip irrigation (SDI) places dripperlines 15-20 cm below the soil surface, supplying water directly to crop roots.

### Advantages of SDI Systems:
- 50% water savings compared to flood irrigation.
- 90% reduction in weed growth between crop rows.
- Ability to apply soluble NPK fertilizers directly via fertigation pumps.`
    },
    {
      id: 4,
      title: 'Laser Land Levelers & Smart Tractors: Equipment Upgrades for Modern Farms',
      category: 'Modern Equipment',
      author: 'Gurpreet Singh',
      author_role: 'Farming Machinery Specialist',
      date: 'Jul 29, 2026',
      read_time: '5 min read',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Precision laser land leveling levels fields to within 2mm accuracy, ensuring uniform water spread and boosting crop yields by 15%.',
      content: `Laser land levelers utilize a transmitter beam and hydraulic scraper to level uneven farmland. Proper leveling eliminates waterlogging in low spots and drought stress on high spots.`
    },
    {
      id: 5,
      title: 'Rabi Sowing Tips: Wheat Seed Treatment, Spacing, and First Irrigation Timing',
      category: 'Seasonal Tips',
      author: 'Dr. Anita Verma',
      author_role: 'Extension Agronomist',
      date: 'Jul 25, 2026',
      read_time: '4 min read',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Timely sowing of Rabi wheat between Nov 1-15 combined with seed treatment using Carboxin + Thiram protects against loose smut.',
      content: `Timely wheat sowing is critical for high yields before summer heat hits grain filling in March. Treating seed with Carboxin 75% WP @ 2.5g/kg seed prevents seed-borne diseases.`
    }
  ]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/blogs', {
        params: { category: selectedCategory, search: searchQuery }
      });
      if (res.data && res.data.blogs) {
        setBlogs(res.data.blogs);
      }
    } catch (err) {
      console.warn("Backend blog API unreachable, filtering locally.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const filteredBlogs = blogs.filter(b => {
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <BookOpen className="w-4 h-4 text-emerald-400" /> Agronomic Knowledge Base & Guides
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Agriculture <span className="gradient-text">Blogs & Articles</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Expert agricultural articles on organic farming, drone technology, drip irrigation, and seasonal crop management.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-80 relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles & topics..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 pl-10 text-white text-xs focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
              selectedCategory === cat 
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-900/40' 
                : 'glass-panel text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Article Banner (First blog if available) */}
      {filteredBlogs.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <div className="glass-panel rounded-3xl border-emerald-500/30 overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/20">
          <div className="lg:col-span-7 relative h-64 lg:h-auto overflow-hidden">
            <img 
              src={filteredBlogs[0].image} 
              alt={filteredBlogs[0].title} 
              className="w-full h-full object-cover" 
            />
            <span className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/40">
              ⭐ Featured Article
            </span>
          </div>

          <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="text-emerald-400 font-bold">{filteredBlogs[0].category}</span>
                <span>•</span>
                <span>{filteredBlogs[0].date}</span>
                <span>•</span>
                <span>{filteredBlogs[0].read_time}</span>
              </div>
              <h2 className="text-2xl font-bold text-white leading-snug hover:text-emerald-400 transition-colors">
                {filteredBlogs[0].title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {filteredBlogs[0].excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <User className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">{filteredBlogs[0].author}</span>
              </div>
              <button 
                onClick={() => setActiveBlog(filteredBlogs[0])}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-extrabold hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.length === 0 ? (
          <div className="col-span-full glass-panel p-12 text-center text-slate-400 text-sm">
            No articles found matching "{searchQuery}" under {selectedCategory}.
          </div>
        ) : (
          filteredBlogs.map((post) => (
            <div key={post.id} className="glass-card rounded-3xl border-slate-800 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-emerald-400 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> {post.date}
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> {post.read_time}
                  </div>
                  
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/80 pt-4">
                <span className="text-xs text-slate-300 font-semibold">{post.author}</span>
                <button 
                  onClick={() => setActiveBlog(post)}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  Read Full <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Blog Details Modal Reader */}
      {activeBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-panel w-full max-w-3xl rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-150">
            
            <button 
              onClick={() => setActiveBlog(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                {activeBlog.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                {activeBlog.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-800 pb-4">
                <span className="font-bold text-slate-200">{activeBlog.author} ({activeBlog.author_role})</span>
                <span>•</span>
                <span>{activeBlog.date}</span>
                <span>•</span>
                <span>{activeBlog.read_time}</span>
              </div>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden">
              <img src={activeBlog.image} alt={activeBlog.title} className="w-full h-full object-cover" />
            </div>

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-4 font-sans">
              {activeBlog.content}
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <button 
                onClick={() => setActiveBlog(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors"
              >
                Close Article Reader
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
