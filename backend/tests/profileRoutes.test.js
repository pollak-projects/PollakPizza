const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const profileRoutes = require('../routes/profile');
const authRoutes = require('../routes/auth'); // Hozzáadjuk az authRoutes-t a token megszerzéséhez
const authMiddleware = require('../middleware/auth');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes); // Hozzáadjuk az authRoutes-t a token megszerzéséhez
app.use(authMiddleware);
app.use(profileRoutes);

describe('Profile Routes', () => {
  let token;

  beforeAll(async () => {
    // Regisztráljunk egy új felhasználót a tesztekhez
    await request(app)
      .post('/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        birthdate: '1990-01-01',
        address: '123 Test St',
        phonenumber: '1234567890'
      });

    // Login to get a valid token
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    token = res.body.token;
  });

  it('should get user profile', async () => {
    const res = await request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });

  it('should update user profile', async () => {
    const res = await request(app)
      .put('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated User',
        email: 'updated@example.com',
        address: '456 Updated St',
        phonenumber: '0987654321'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Profil sikeresen frissítve.');
  });
});