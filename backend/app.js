const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

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
const customPizzas = require('./routes/customPizzas')
const resetPasswordRoutes = require('./routes/resetPassword');
const userOrder = require('./routes/user-orders');


const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:8200',
  methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/components'));
app.use(express.static(path.join(__dirname, '../src/components')));
app.use(express.static(path.join(__dirname, '../src/assets')));

app.use(bodyParser.json());

app.use(authRoutes);
app.use(customPizzas);
app.use(profileRoutes);
app.use(pizzaRoutes);
app.use(allPizzaRoutes);
app.use(allSizesRoutes)
app.use('/admin', pizzasRoute);
app.use(adminRoutes);
app.use(orderRoutes); 
app.use('/admin', addPizzaRoute);
app.use(resetPasswordRoutes);
app.use(userOrder);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = 3061;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
