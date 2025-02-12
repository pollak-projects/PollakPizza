const express = require('express');
const db = require('../models/db');

const router = express.Router();

// Pizzák lekérése
router.get('/pizzas', (req, res) => {
  db.query('SELECT * FROM pizzas ORDER BY RAND() LIMIT 6', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Hiba a pizzák lekérdezése során.' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;