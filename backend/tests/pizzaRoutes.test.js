const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const pizzaRoutes = require('../routes/pizzas'); // Helyes útvonal

const app = express();
app.use(bodyParser.json());
app.use(pizzaRoutes);

describe('Pizza Routes', () => {
  it('should get a list of pizzas', async () => {
    const res = await request(app)
      .get('/pizzas');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});