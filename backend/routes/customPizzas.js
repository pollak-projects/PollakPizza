const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/customPizzas', async (req, res) => {
  const query = `
    SELECT 
        o.id AS orderId, 
        o.userId, 
        u.name AS userName, 
        o.pizzaId, 
        o.sizeId, 
        s.size, 
        o.address, 
        o.userPhone, 
        o.finalPrice, 
        o.status, 
        GROUP_CONCAT(t.name SEPARATOR ', ') AS toppings
    FROM orders o
    JOIN users u ON o.userId = u.id
    JOIN size s ON o.sizeId = s.id
    LEFT JOIN orderTops ot ON o.id = ot.orderId
    LEFT JOIN toppings t ON ot.toppingId = t.id
    WHERE o.pizzaId = 0
    GROUP BY o.id, o.userId, u.name, o.sizeId, s.size, o.address, o.userPhone, o.finalPrice, o.status
  `;

  try {
    const results = await db.query(query);
    res.json(results[0]); // Send the result rows
  } catch (err) {
    console.error('Error fetching custom pizzas:', err);
    res.status(500).json({ error: 'Hiba az egyedi pizzák lekérdezése során.' });
  }
});

module.exports = router;
