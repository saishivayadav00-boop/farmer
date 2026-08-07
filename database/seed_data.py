import os
import sys

# Ensure root workspace directory is in python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app import create_app
from backend.extensions import db
from utils.auth import hash_password

from models import (
    User, Admin, Crop, SoilLog, Fertilizer, Disease,
    CropPrice, GovernmentScheme, Blog, ContactMessage, Notification
)

def seed_database():
    app = create_app()
    with app.app_context():
        print("[INFO] Resetting SQLite Database tables...")
        db.drop_all()
        db.create_all()

        print("[INFO] Seeding Admin Users...")
        admin1 = Admin(
            full_name="Dr. Anita Sharma",
            email="admin@agriconnect.in",
            password_hash=hash_password("admin123"),
            permission_level="superadmin"
        )
        admin2 = Admin(
            full_name="Sardar Gurpreet Singh",
            email="agronomist@agriconnect.in",
            password_hash=hash_password("agro123"),
            permission_level="agronomist_mod"
        )
        db.session.add_all([admin1, admin2])
        db.session.commit()

        print("[INFO] Seeding Sample Farmers & Users...")
        user1 = User(
            full_name="Ramesh Kumar",
            email="ramesh@gmail.com",
            phone="9876543210",
            password_hash=hash_password("farmer123"),
            role="farmer",
            state="Punjab",
            district="Ludhiana",
            farm_size=4.5,
            primary_crop="Wheat"
        )
        user2 = User(
            full_name="Vikram Patil",
            email="vikram@gmail.com",
            phone="9876543211",
            password_hash=hash_password("farmer123"),
            role="farmer",
            state="Maharashtra",
            district="Nashik",
            farm_size=8.0,
            primary_crop="Cotton"
        )
        db.session.add_all([user1, user2])
        db.session.commit()

        print("[INFO] Seeding Crops Database...")
        crop1 = Crop(
            name="Wheat (Rabi Season)",
            season="Rabi",
            soil_type="Alluvial / Loam",
            nitrogen_req=90.0,
            phosphorus_req=42.0,
            potassium_req=43.0,
            ph_min=6.0,
            ph_max=7.5,
            min_rainfall=100.0,
            max_rainfall=250.0,
            expected_yield="22 - 25 Quintals / Acre",
            description="Optimal soil NPK ratios and temperature profile for High Yield Wheat varieties like HD 2967 / PBW 725."
        )
        crop2 = Crop(
            name="Paddy / Rice (Kharif)",
            season="Kharif",
            soil_type="Clay / Clay Loam",
            nitrogen_req=110.0,
            phosphorus_req=50.0,
            potassium_req=50.0,
            ph_min=5.5,
            ph_max=7.0,
            min_rainfall=150.0,
            max_rainfall=300.0,
            expected_yield="28 - 32 Quintals / Acre",
            description="Requires high water availability and puddle clay soil for optimum tiller formation."
        )
        crop3 = Crop(
            name="Cotton (Medium Staple)",
            season="Kharif",
            soil_type="Black Cotton Soil",
            nitrogen_req=60.0,
            phosphorus_req=30.0,
            potassium_req=60.0,
            ph_min=6.5,
            ph_max=8.0,
            min_rainfall=80.0,
            max_rainfall=150.0,
            expected_yield="12 - 15 Quintals / Acre",
            description="Deep black soil with good water retention capacity ideal for Bt-Cotton cultivation."
        )
        db.session.add_all([crop1, crop2, crop3])

        print("[INFO] Seeding Commercial Fertilizers...")
        f1 = Fertilizer(
            name="Urea (46% Nitrogen)",
            type="Nitrogenous",
            nitrogen_pct=46.0,
            application_guide="Apply in 2 split doses: 50% at sowing time, 50% during 1st irrigation (21 days).",
            dosage_per_acre="45 Kg / Acre"
        )
        f2 = Fertilizer(
            name="DAP (Di-Ammonium Phosphate 18-46-0)",
            type="Phosphatic",
            nitrogen_pct=18.0,
            phosphorus_pct=46.0,
            application_guide="Apply 100% basal dose during land preparation before sowing.",
            dosage_per_acre="55 Kg / Acre"
        )
        f3 = Fertilizer(
            name="MOP (Muriate of Potash 60% K2O)",
            type="Potassic",
            potassium_pct=60.0,
            application_guide="Apply along with basal DAP dose to improve disease resistance and grain shine.",
            dosage_per_acre="20 Kg / Acre"
        )
        db.session.add_all([f1, f2, f3])

        print("[INFO] Seeding Crop Leaf Diseases...")
        d1 = Disease(
            crop_name="Tomato",
            disease_name="Early Blight (Alternaria solani)",
            scientific_name="Alternaria solani",
            symptoms="Concentric dark brown spot rings on lower leaves, yellow halo around lesions, premature leaf fall.",
            organic_treatment="Spray Neem Oil (5ml/L water) or Trichoderma viride bio-fungicide once every 7 days.",
            chemical_treatment="Apply Mancozeb 75% WP @ 2g/L water or Copper Oxychloride 50% WP @ 3g/L water.",
            severity="Moderate"
        )
        d2 = Disease(
            crop_name="Wheat",
            disease_name="Brown Rust (Puccinia triticina)",
            scientific_name="Puccinia triticina",
            symptoms="Small oval orange-brown pustules scattered randomly on leaf surface.",
            organic_treatment="Ensure field aeration; spray fermented buttermilk or sour whey solution (10%).",
            chemical_treatment="Spray Propiconazole 25% EC @ 1ml/L water at first appearance of symptoms.",
            severity="High"
        )
        db.session.add_all([d1, d2])

        print("[INFO] Seeding Mandi Crop Prices...")
        p1 = CropPrice(commodity="Wheat (Sharbati)", state="Punjab", mandi_name="Ludhiana APMC", modal_price=2275.0, min_price=2180.0, max_price=2350.0, change_pct="+1.5%")
        p2 = CropPrice(commodity="Paddy (Basmati 1121)", state="Punjab", mandi_name="Khanna Mandi", modal_price=4120.0, min_price=4000.0, max_price=4250.0, change_pct="+0.8%")
        p3 = CropPrice(commodity="Cotton (Medium Staple)", state="Gujarat", mandi_name="Rajkot APMC", modal_price=7120.0, min_price=6900.0, max_price=7300.0, change_pct="-0.4%")
        p4 = CropPrice(commodity="Soybean (Yellow)", state="Madhya Pradesh", mandi_name="Indore Mandi", modal_price=4850.0, min_price=4650.0, max_price=4980.0, change_pct="+2.1%")
        p5 = CropPrice(commodity="Mustard (Black)", state="Rajasthan", mandi_name="Bharatpur Mandi", modal_price=5350.0, min_price=5100.0, max_price=5500.0, change_pct="+1.2%")
        db.session.add_all([p1, p2, p3, p4, p5])

        print("[INFO] Seeding Government Welfare Schemes...")
        s1 = GovernmentScheme(
            admin_id=admin1.id,
            title="Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
            category="Direct Income Support",
            benefit="₹6,000 / year (3 equal installments of ₹2,000 directly to bank)",
            eligibility="All small & marginal landholder farmer families with cultivable land.",
            department="Ministry of Agriculture & Farmers Welfare",
            description="Provides direct financial assistance to small farmer households across India to supplement crop input expenses."
        )
        s2 = GovernmentScheme(
            admin_id=admin1.id,
            title="Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            category="Crop Insurance",
            benefit="Comprehensive crop loss protection against natural risks at nominal premium (1.5% - 2%)",
            eligibility="Farmers growing notified crops in notified areas including sharecroppers.",
            department="Department of Agriculture & Farmers Welfare",
            description="Financial support to farmers suffering crop damage arising out of natural calamities, pests & diseases."
        )
        s3 = GovernmentScheme(
            admin_id=admin2.id,
            title="PM-KUSUM Solar Pump Subsidy Scheme",
            category="Equipment & Energy Subsidy",
            benefit="Up to 60% government subsidy for installing solar-powered irrigation pumps",
            eligibility="Individual farmers, panchayats, water user associations.",
            department="Ministry of New and Renewable Energy",
            description="Promotes solar pump installation to eliminate diesel dependencies for farm irrigation."
        )
        db.session.add_all([s1, s2, s3])

        print("[INFO] Seeding Blog Articles...")
        b1 = Blog(
            admin_id=admin1.id,
            title="Modern Drip Irrigation: How to Reduce Farm Water Usage by 45%",
            slug="modern-drip-irrigation-water-saving",
            category="Irrigation",
            author="Dr. Anita Sharma (Agronomist)",
            read_time="5 min read",
            snippet="Discover how subsurface drip emitters deliver water directly to crop root zones, reducing evaporation losses.",
            content="Subsurface drip irrigation (SDI) is rapidly transforming Indian agriculture. By delivering precise water drops directly to plant root structures, farmers save up to 45% water compared to flood irrigation, while cutting weed growth by 60%.",
            image_url="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80"
        )
        b2 = Blog(
            admin_id=admin2.id,
            title="Biological Pest Management in Paddy: Say Goodbye to Chemical Sprays",
            slug="bio-pest-management-paddy",
            category="Pest Control",
            author="Sardar Gurpreet Singh",
            read_time="6 min read",
            snippet="Deploying Trichogramma egg parasitoids and light traps against Yellow Stem Borer in rice fields.",
            content="Integrated Pest Management (IPM) utilizes beneficial insects, neem extract sprays, and pheromone traps to combat destructive stem borers without degrading soil micro-flora.",
            image_url="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
        )
        db.session.add_all([b1, b2])

        print("[INFO] Seeding Contact Help Queries & Notifications...")
        msg1 = ContactMessage(
            user_id=user1.id,
            name="Ramesh Kumar",
            phone="9876543210",
            state="Punjab",
            category="Crop Disease Consultation",
            message="My wheat leaves have small orange spots. Need urgent fungicide suggestion.",
            status="Pending"
        )
        notif1 = Notification(
            user_id=user1.id,
            title="Weather Alert: Rainfall Expected",
            message="Light rainfall expected on Saturday. Postpone pesticide spraying for 48 hrs.",
            is_read=False
        )
        notif2 = Notification(
            user_id=user1.id,
            title="PM-Kisan Installment Approved",
            message="Your 14th installment of ₹2,000 has been credited to your bank account.",
            is_read=True
        )
        db.session.add_all([msg1, notif1, notif2])

        db.session.commit()
        print("[SUCCESS] Database seeding completed successfully! All 10 tables initialized.")

if __name__ == '__main__':
    seed_database()
