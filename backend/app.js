const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const pizzaRoutes = require('./routes/pizzas');
const allPizzaRoutes = require('./routes/allpizzas');
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/orders'); 
const addPizzaRoute = require('./routes/addPizzas');
const pizzasRoute = require('./routes/pizzas');
const allSizesRoutes = require('./routes/allsizes')


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

app.use(authRoutes);
app.use(profileRoutes);
app.use(pizzaRoutes);
app.use(allPizzaRoutes);
app.use(allSizesRoutes)
app.use('/admin', pizzasRoute);
app.use(adminRoutes);
app.use(orderRoutes); 
app.use('/admin', addPizzaRoute);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = 3061;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
