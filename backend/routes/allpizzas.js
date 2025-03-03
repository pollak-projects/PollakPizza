const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/allpizzas', (req, res) => {
  const query = `
    SELECT p.id, p.name, p.price, p.image, GROUP_CONCAT(t.name SEPARATOR ', ') AS toppings
    FROM pizzas p
    LEFT JOIN pizzaToppings pt ON p.id = pt.pizzaId
    LEFT JOIN toppings t ON pt.toppingId = t.id
    GROUP BY p.id, p.name, p.price, p.image
    ORDER BY RAND()
    LIMIT 6
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Hiba a pizzák lekérdezése során.' });
    }
    res.json(results);
    console.log(results)
  });
});


module.exports = router;
