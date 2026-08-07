import sys
import os

# Add current workspace directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from backend.app import app

if __name__ == '__main__':
    print("[SERVER] Starting AgriConnect Flask REST API Server on http://127.0.0.1:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
