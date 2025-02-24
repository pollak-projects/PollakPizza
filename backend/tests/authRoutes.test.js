const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/auth');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

describe('Auth Routes', () => {
  beforeAll(async () => {
    // Töröljük a teszt felhasználót az adatbázisból, ha létezik
    await new Promise((resolve, reject) => {
      const db = require('../models/db');
      db.query('DELETE FROM users WHERE email = ?', ['test@example.com'], (err, results) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        birthdate: '1990-01-01',
        address: '123 Test St',
        phonenumber: '1234567890'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Sikeres regisztráció!');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Sikeres bejelentkezés.');
    expect(res.body).toHaveProperty('token');
  });
});