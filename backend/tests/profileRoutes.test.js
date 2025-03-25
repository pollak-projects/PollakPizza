const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const profileRoutes = require('../routes/profile');
const authRoutes = require('../routes/auth'); // Hozzáadjuk az authRoutes-t a token megszerzéséhez
const authMiddleware = require('../middleware/auth');
const db = require('../models/db'); // Importing the database connection

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
        email: 'test@1example.com',
        password: 'password123',
        birthdate: '1990-01-01',
        address: '123 Test St',
        phonenumber: '123456789011'
      });

    // Login to get a valid token
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@1example.com',
        password: 'password123'
      });
    token = res.body.token;
  });

  it('should not allow access to profile without token', async () => {
    const res = await request(app)
      .get('/profile');
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Hiányzik az Authorization fejléc.');
  });

  it('should get user profile with valid token', async () => {
    const res = await request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Érvénytelen token.');
  });

  it('should not allow profile update without token', async () => {
    const res = await request(app)
      .put('/profile') // Token nélkül érhető el
      .send({
        name: 'Updated User',
        email: 'updated@1example.com',
        address: '456 Updated St',
        phonenumber: '123456789012'
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Hiányzik az Authorization fejléc.');
  });

  it('should update user profile with valid token', async () => {
    const res = await request(app)
      .put('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated User',
        email: 'updated@1example.com',
        address: '456 Updated St',
        phonenumber: '123456789012'
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Érvénytelen token.');
  });
});
