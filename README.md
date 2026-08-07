# AgriConnect – Smart Farmer Portal 🌾⚡

**AgriConnect** is an enterprise-grade full-stack agricultural web application designed to empower Indian farmers with Artificial Intelligence crop selection, precision fertilizer advisory, leaf disease diagnostics, real-time APMC mandi commodity prices, weather forecasts, government welfare schemes, and an AI Chatbot assistant.

---

## 🚀 Tech Stack

### **Frontend**
- **Core Framework**: React.js (Vite)
- **Styling**: Tailwind CSS & Vanilla CSS Design System (Dark Mode & Glassmorphism)
- **Icons & Motion**: Lucide Icons & Framer Motion
- **Data Visualization**: Chart.js & React-Chartjs-2
- **HTTP Client**: Axios with JWT Bearer Token Interceptors

### **Backend**
- **API Framework**: Flask REST API (Python 3.13)
- **Database ORM**: Flask-SQLAlchemy (SQLite)
- **Authentication**: PyJWT (HS256) & Werkzeug Password Hashing (`pbkdf2:sha256`)
- **Database Migrations**: Flask-Migrate
- **CORS Management**: Flask-CORS

---

## 📂 Project Structure

```text
farmer/
├── app.py                      # Root Python Entry Point (python app.py)
├── requirements.txt            # Python Dependencies
├── package.json                # Project Root Package Configuration
├── README.md                   # Complete Documentation & Setup Guide
├── backend/
│   ├── app.py                  # Flask Application Factory & Blueprint Registration
│   ├── config.py               # Application Environment Settings
│   └── extensions.py           # SQLAlchemy, CORS, Migrate Extensions
├── database/
│   ├── agriconnect.db          # SQLite Production Database
│   └── seed_data.py            # Sample Database Seeding Script (10 Tables)
├── models/                     # SQLAlchemy Database Models (10 Tables)
│   ├── user.py                 # Users & Admins
│   ├── crop.py                 # Crops & Soil Logs
│   ├── fertilizer.py           # Commercial Fertilizer Products
│   ├── disease.py              # Leaf Disease Catalog
│   ├── crop_price.py           # APMC Mandi Commodity Rates
│   ├── scheme.py               # Government Welfare Schemes
│   ├── blog.py                 # Agricultural Articles & Guides
│   ├── contact_message.py      # Contact Helpdesk Queries
│   └── notification.py         # System Notifications
├── routes/                     # Flask Blueprint REST API Routes
│   ├── auth_routes.py          # /api/auth (Login, Register, Logout, RBAC)
│   ├── crop_routes.py          # /api/crops (Crop Selector & Fertilizer Advisory)
│   ├── mandi_routes.py         # /api/mandi (Commodity Rates & Trends)
│   ├── disease_routes.py       # /api/disease (TensorFlow Leaf Scanner)
│   ├── scheme_routes.py        # /api/schemes (Welfare Schemes Portal)
│   ├── weather_routes.py       # /api/weather (Hyperlocal Weather & Forecast)
│   ├── blog_routes.py          # /api/blogs (Agronomic Articles & Guides)
│   ├── contact_routes.py       # /api/contact (Support Queries & Database Storage)
│   └── chat_routes.py          # /api/chat (AgriBot AI Assistant)
├── frontend/                   # React Vite Application
│   ├── package.json            # React Dependencies & Scripts
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js          # Centralized Axios API Service Instance
│   │   ├── utils/
│   │   │   └── validation.js   # Client-Side Form Validation Helpers
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Top Navigation Bar & Mobile Drawer
│   │   │   ├── Footer.jsx      # Footer with Helpline & Quick Links
│   │   │   ├── AIChatAssistant.jsx # Floating Global AI Chatbot Widget
│   │   │   ├── Toast.jsx       # Toast Notification Banners
│   │   │   ├── SkeletonLoader.jsx # Shimmer Loading Placeholders
│   │   │   └── LoadingScreen.jsx # Full-Page Telemetry Loader
│   │   └── pages/
│   │       ├── Home.jsx        # Glassmorphism Landing Page (11 Sections)
│   │       ├── Dashboard.jsx   # Farmer Dashboard & Chart.js Widgets
│   │       ├── Weather.jsx     # Hyperlocal Weather & 7-Day Forecast
│   │       ├── CropRecommendation.jsx # AI Crop Match Engine
│   │       ├── FertilizerRecommendation.jsx # Precision Fertilizer Calculator
│   │       ├── DiseaseDetection.jsx # TensorFlow Leaf Scanner
│   │       ├── MarketPrices.jsx # APMC Mandi Rates & Historical Trends
│   │       ├── GovernmentSchemes.jsx # Scheme Eligibility & Document Guides
│   │       ├── Blogs.jsx       # Agronomic Knowledge Base & Details Reader
│   │       ├── Contact.jsx     # Helpdesk Form & Google Map Placeholder
│   │       ├── Login.jsx       # JWT User Authentication
│   │       ├── Register.jsx    # Farmer Onboarding Portal
│   │       └── Admin.jsx       # Secure Admin Console & Management Tabs
```

---

## ⚡ Quick Start & Run Instructions

### 1. **Backend REST API Setup**

```bash
# Navigate to workspace root
cd farmer

# Install required Python packages
pip install -r requirements.txt

# (Optional) Seed SQLite Database with 10 tables of sample data
python database/seed_data.py

# Launch Flask REST API server (http://127.0.0.1:5000)
python app.py
```

### 2. **Frontend React Application Setup**

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start Vite Development Server (http://localhost:5173)
npm run dev
```

---

## 🌟 Key Application Features

1. **AI Crop Recommendation**: Input Soil Type, Temperature, Humidity, Rainfall, and Season to calculate high-yield crops, expected yield, and confidence scores.
2. **Precision Fertilizer Advisory**: Input Target Crop and Soil Type to receive per-acre Urea, DAP, and MOP dosages, application timing, and precautions.
3. **TensorFlow Leaf Disease Doctor**: Upload crop leaf photos to run TensorFlow CNN prediction for instant pathogen identification, causes, chemical treatment, and organic prevention.
4. **APMC Mandi Rates & Charts**: Real-time commodity prices with State/District/Crop filters and Chart.js 6-month historical price trend graphs.
5. **Hyperlocal Weather Advisory**: Real-time temperature, humidity, wind, rain chance, sunrise/sunset times, 7-day outlook, and field spray advice.
6. **Government Schemes Portal**: Simplified eligibility requirements, required document checklists, and direct official portal application links.
7. **AgriBot AI Chatbot**: Global floating assistant offering instant natural language answers to farming questions.
8. **Secure Admin Console**: Role-protected management console (`admin`, `superadmin`) for managing Users, Mandi Prices, Blogs, Schemes, and Diseases.

---

## 🚢 Production Deployment Guide

### **Backend Deployment (Gunicorn / Nginx / Render / Heroku)**
1. Set Environment Variables:
   ```bash
   FLASK_ENV=production
   SECRET_KEY=your_secure_jwt_secret_key
   DATABASE_URL=sqlite:///database/agriconnect.db
   ```
2. Run using Gunicorn WSGI Server:
   ```bash
   gunicorn --bind 0.0.0.0:5000 app:app
   ```

### **Frontend Deployment (Vercel / Netlify / AWS S3)**
1. Build production static bundle:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the generated `frontend/dist` folder to your CDN host.

---

## 🛡️ License & Copyright
Built for Indian Farmers by the AgriConnect Open Agricultural Technology Initiative. Licensed under the MIT License.
