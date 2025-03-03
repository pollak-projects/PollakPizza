const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const pizzaRoutes = require('../routes/pizzas'); // Helyes útvonal
const db = require('../models/db'); // Importing the database connection

const app = express();
app.use(bodyParser.json());
app.use(pizzaRoutes);

describe('Pizza Routes', () => {
  beforeAll(async () => {
    try {
      const connection = await db.getConnection();
      // Add any necessary setup or test data here if needed
      connection.release();
    } catch (err) {
      console.error('Error setting up the test environment:', err);
      throw err;
    }
  });

  it('should get a list of pizzas', async () => {
    const res = await request(app)
      .get('/pizzas');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
