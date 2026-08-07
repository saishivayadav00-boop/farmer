from flask import Blueprint, request, jsonify
from models.blog import Blog

blog_bp = Blueprint('blog', __name__, url_prefix='/api/blogs')

SAMPLE_BLOGS = [
    {
        'id': 1,
        'title': 'Organic Soil Health: Transitioning from Chemical Fertilizers to Bio-Compost',
        'category': 'Organic Farming',
        'author': 'Dr. Harpreet Singh',
        'author_role': 'Chief Soil Scientist, ICAR',
        'date': 'Aug 5, 2026',
        'read_time': '5 min read',
        'image': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
        'excerpt': 'Learn how combining Vermicompost, Panchagavya, and Jeevamrut rejuvenates soil organic carbon and boosts long-term soil fertility.',
        'content': '''Over-reliance on synthetic nitrogen fertilizers (Urea) has depleted organic carbon in Indian soils below 0.5%. Transitioning to bio-organic farming regenerates soil micro-flora, improves water retention capacity, and reduces input costs.

### Key Practices for Soil Regeneration:
1. **Jeevamrut Preparation**: Blend 10 Kg fresh cow dung, 10 L cow urine, 2 Kg jaggery, and 2 Kg pulse flour in 200 L water. Ferment for 48 hours and apply via irrigation water.
2. **Green Manuring**: Sow Dhaincha (*Sesbania*) or Sunnhemp prior to paddy cultivation and plow back at 45 days.
3. **Crop Residue Management**: Mulch wheat straw instead of burning to add 3.5 tonnes of carbon per acre.

Following these practices increases earthworm populations by 300% and reduces chemical fertilizer demand by 40% within two crop cycles.'''
    },
    {
        'id': 2,
        'title': 'Drone Agriculture & AI Telemetry: The Future of Precision Pesticide Spraying',
        'category': 'Technology',
        'author': 'Priya Sharma',
        'author_role': 'AgriTech Innovation Lead',
        'date': 'Aug 4, 2026',
        'read_time': '6 min read',
        'image': 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80',
        'excerpt': 'Agricultural spraying drones equipped with multispectral cameras slash pesticide volume by 30% and cover 10 acres in under 20 minutes.',
        'content': '''Drone spraying technology is revolutionizing crop protection across Punjab, Haryana, and Maharashtra. By utilizing ultra-low volume (ULV) nozzles, drones achieve uniform droplet distribution while eliminating manual exposure to hazardous chemicals.

### Benefits of Drone Spraying:
- **Efficiency**: Covers 1 acre in 6 minutes with 10 liters of water vs 200 liters needed manually.
- **Pesticide Savings**: Precision targeted spraying reduces chemical wastage by 25-30%.
- **Safety**: Zero physical contact for farmers with liquid insecticides.'''
    },
    {
        'id': 3,
        'title': 'Sub-Surface Drip Irrigation: Maximizing Crop Yields with 50% Less Water',
        'category': 'Irrigation',
        'author': 'Rajeshwar Patil',
        'author_role': 'Irrigation Engineer',
        'date': 'Aug 2, 2026',
        'read_time': '4 min read',
        'image': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        'excerpt': 'Sub-surface drip fertigation delivers water and nutrients directly to the root zone, preventing weed germination and evaporation loss.',
        'content': '''Water scarcity poses a critical challenge for sugarcane, cotton, and maize growers. Sub-surface drip irrigation (SDI) places dripperlines 15-20 cm below the soil surface, supplying water directly to crop roots.

### Advantages of SDI Systems:
- 50% water savings compared to flood irrigation.
- 90% reduction in weed growth between crop rows.
- Ability to apply soluble NPK fertilizers directly via fertigation pumps.'''
    },
    {
        'id': 4,
        'title': 'Laser Land Levelers & Smart Tractors: Equipment Upgrades for Modern Farms',
        'category': 'Modern Equipment',
        'author': 'Gurpreet Singh',
        'author_role': 'Farming Machinery Specialist',
        'date': 'Jul 29, 2026',
        'read_time': '5 min read',
        'image': 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=800&q=80',
        'excerpt': 'Precision laser land leveling levels fields to within 2mm accuracy, ensuring uniform water spread and boosting crop yields by 15%.',
        'content': '''Laser land levelers utilize a transmitter beam and hydraulic scraper to level uneven farmland. Proper leveling eliminates waterlogging in low spots and drought stress on high spots.'''
    },
    {
        'id': 5,
        'title': 'Rabi Sowing Tips: Wheat Seed Treatment, Spacing, and First Irrigation Timing',
        'category': 'Seasonal Tips',
        'author': 'Dr. Anita Verma',
        'author_role': 'Extension Agronomist',
        'date': 'Jul 25, 2026',
        'read_time': '4 min read',
        'image': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
        'excerpt': 'Timely sowing of Rabi wheat between Nov 1-15 combined with seed treatment using Carboxin + Thiram protects against loose smut.',
        'content': '''Timely wheat sowing is critical for high yields before summer heat hits grain filling in March. Treating seed with Carboxin 75% WP @ 2.5g/kg seed prevents seed-borne diseases.'''
    }
]

@blog_bp.route('', methods=['GET'])
@blog_bp.route('/', methods=['GET'])
def get_blogs():
    category = request.args.get('category', '').strip()
    search = request.args.get('search', '').strip()

    filtered = SAMPLE_BLOGS

    if category and category != 'All':
        filtered = [b for b in filtered if b['category'].lower() == category.lower()]

    if search:
        s_lower = search.lower()
        filtered = [
            b for b in filtered 
            if s_lower in b['title'].lower() or s_lower in b['excerpt'].lower() or s_lower in b['category'].lower()
        ]

    return jsonify({'status': 'success', 'count': len(filtered), 'blogs': filtered}), 200

@blog_bp.route('/<int:blog_id>', methods=['GET'])
def get_blog_detail(blog_id):
    post = next((b for b in SAMPLE_BLOGS if b['id'] == blog_id), None)
    if not post:
        return jsonify({'status': 'error', 'message': 'Blog article not found'}), 404
    return jsonify({'status': 'success', 'blog': post}), 200
