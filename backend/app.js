const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const pizzaRoutes = require('./routes/pizzas');
const allPizzaRoutes = require('./routes/allpizzas');
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/orders'); // New route import
const addPizzaRoute = require('./routes/addPizzas');
const pizzasRoute = require('./routes/pizzas');
const allSizesRoutes = require('./routes/allsizes')

// Initialize Express app
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

// Add routes
app.use(authRoutes);
app.use(profileRoutes);
app.use(pizzaRoutes);
app.use(allPizzaRoutes);
app.use(allSizesRoutes)
app.use('/admin', pizzasRoute);
app.use(adminRoutes);
app.use(orderRoutes); // New route addition
app.use('/admin', addPizzaRoute);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = 3061;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
