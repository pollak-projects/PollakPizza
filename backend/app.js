const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Környezeti változók betöltése
dotenv.config();

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const pizzaRoutes = require('./routes/pizzas');
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/orders'); // Új útvonal importálása

// Express alkalmazás inicializálása
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:8200',
  methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(bodyParser.json());

// Route-ok hozzáadása
app.use(authRoutes);
app.use(profileRoutes);
app.use(pizzaRoutes);
app.use(adminRoutes);
app.use(orderRoutes); // Új útvonal hozzáadása

// Szerver indítása
const port = 3061;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});