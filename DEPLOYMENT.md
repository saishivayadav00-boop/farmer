# Deployment Guide - AgriConnect Smart Farmer Portal 🚢

This guide outlines production deployment procedures for **AgriConnect – Smart Farmer Portal**.

---

## 🛠 Prerequisites

- Python 3.10+
- Node.js 18+ & npm 9+
- SQLite3 or PostgreSQL
- Nginx / Caddy Web Server
- Gunicorn WSGI Server

---

## 🐍 Backend Deployment

### 1. Environment Configuration
Create a `.env` file in the root directory:

```ini
FLASK_ENV=production
SECRET_KEY=e9a4f78b12c34d567890abcdef123456
DATABASE_PATH=database/agriconnect.db
CORS_ORIGINS=*
UPLOAD_FOLDER=uploads
```

### 2. Install Production Dependencies
```bash
pip install -r requirements.txt gunicorn
```

### 3. Initialize Database
```bash
python database/seed_data.py
```

### 4. Run Gunicorn WSGI Server
```bash
gunicorn --workers 4 --bind 127.0.0.1:5000 app:app
```

---

## ⚛️ Frontend Deployment

### 1. Configure Production API Endpoint
In `frontend/src/services/api.js`, update `baseURL` to your domain:
```javascript
const api = axios.create({
  baseURL: 'https://api.agriconnect.gov.in/api',
  headers: { 'Content-Type': 'application/json' }
});
```

### 2. Build Static Dist Bundle
```bash
cd frontend
npm install
npm run build
```

This creates the `frontend/dist` directory containing HTML, CSS, JavaScript, and asset bundles.

---

## 🌐 Nginx Reverse Proxy Configuration

Create `/etc/nginx/sites-available/agriconnect`:

```nginx
server {
    listen 80;
    server_name agriconnect.gov.in www.agriconnect.gov.in;

    # Serve React Frontend Build
    location / {
        root /var/www/agriconnect/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy Flask REST API Requests
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Media Uploads
    location /uploads/ {
        alias /var/www/agriconnect/uploads/;
    }
}
```

Enable site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/agriconnect /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```
