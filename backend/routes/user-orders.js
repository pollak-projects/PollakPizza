const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Feltételezve, hogy a db.js fájlban van a kapcsolat
const authMiddleware = require('../middleware/auth'); // Feltételezve, hogy van egy auth middleware a felhasználó azonosítására


router.get('/user-orders', authMiddleware, async (req, res) => {
    const userId = req.user.id; // Feltételezve, hogy az authMiddleware hozzáadja a user ID-t
    const query = `
      SELECT 
        o.id, 
        p.name AS pizzaName, 
        s.size, 
        o.pizzaNum, 
        o.finalPrice, 
        o.status 
      FROM orders o
      LEFT JOIN pizzas p ON o.pizzaId = p.id
      LEFT JOIN size s ON o.sizeId = s.id
      WHERE o.userId = ?
    `;
    try {
      const [results] = await db.query(query, [userId]);
      res.status(200).json(results);
    } catch (err) {
      console.error('Error fetching user orders:', err);
      res.status(500).json({ error: 'Hiba a rendelések lekérdezése során.' });
    }
  });

module.exports = router;