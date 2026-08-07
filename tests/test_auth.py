import unittest
import os
import sys

# Append root directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app import create_app
from backend.extensions import db
from models.user import User
from models.admin import Admin

class AuthAPITestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.drop_all()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_01_registration_validation(self):
        """Test registration input validation failure."""
        res = self.client.post('/api/auth/register', json={
            'full_name': '',
            'email': 'invalid-email',
            'password': '123'
        })
        self.assertEqual(res.status_code, 400)
        data = res.get_json()
        self.assertEqual(data['status'], 'error')

    def test_02_farmer_registration_and_login(self):
        """Test successful farmer registration, login, profile access, RBAC, and logout."""
        # 1. Register
        reg_res = self.client.post('/api/auth/register', json={
            'full_name': 'Test Farmer',
            'email': 'testfarmer@agriconnect.in',
            'phone': '9998887770',
            'password': 'password123',
            'role': 'farmer',
            'state': 'Punjab',
            'district': 'Ludhiana'
        })
        self.assertEqual(reg_res.status_code, 201)
        reg_data = reg_res.get_json()
        self.assertIn('access_token', reg_data)
        self.assertEqual(reg_data['user']['role'], 'farmer')

        # 2. Duplicate registration test
        dup_res = self.client.post('/api/auth/register', json={
            'full_name': 'Duplicate Farmer',
            'email': 'testfarmer@agriconnect.in',
            'phone': '9998887770',
            'password': 'password123'
        })
        self.assertEqual(dup_res.status_code, 409)

        # 3. Login
        login_res = self.client.post('/api/auth/login', json={
            'email': 'testfarmer@agriconnect.in',
            'password': 'password123'
        })
        self.assertEqual(login_res.status_code, 200)
        login_data = login_res.get_json()
        token = login_data['access_token']

        # 4. Access protected profile
        profile_res = self.client.get('/api/auth/me', headers={
            'Authorization': f'Bearer {token}'
        })
        self.assertEqual(profile_res.status_code, 200)
        profile_data = profile_res.get_json()
        self.assertEqual(profile_data['user']['email'], 'testfarmer@agriconnect.in')

        # 5. Access Admin protected route as Farmer (Expect 403 Forbidden)
        admin_res = self.client.get('/api/auth/admin-dashboard', headers={
            'Authorization': f'Bearer {token}'
        })
        self.assertEqual(admin_res.status_code, 403)

        # 6. Logout
        logout_res = self.client.post('/api/auth/logout', headers={
            'Authorization': f'Bearer {token}'
        })
        self.assertEqual(logout_res.status_code, 200)

        # 7. Try using token after logout (Expect 401 Unauthorized)
        post_logout_res = self.client.get('/api/auth/me', headers={
            'Authorization': f'Bearer {token}'
        })
        self.assertEqual(post_logout_res.status_code, 401)

    def test_03_admin_role_authorization(self):
        """Test admin registration, login, and admin route access."""
        # 1. Register Admin
        reg_res = self.client.post('/api/auth/register', json={
            'full_name': 'Admin User',
            'email': 'adminuser@agriconnect.in',
            'phone': '9991112223',
            'password': 'adminpassword123',
            'role': 'admin'
        })
        self.assertEqual(reg_res.status_code, 201)
        token = reg_res.get_json()['access_token']

        # 2. Access Admin protected route as Admin (Expect 200 OK)
        admin_res = self.client.get('/api/auth/admin-dashboard', headers={
            'Authorization': f'Bearer {token}'
        })
        self.assertEqual(admin_res.status_code, 200)
        admin_data = admin_res.get_json()
        self.assertEqual(admin_data['status'], 'success')
        self.assertIn('admin_metrics', admin_data)

if __name__ == '__main__':
    unittest.main()
