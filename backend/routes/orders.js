const express = require('express');
const db = require('../models/db');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

// Összes rendelés lekérdezése
router.get('/orders', authMiddleware, adminMiddleware, (req, res) => {
  const query = `
    SELECT o.id, o.userId, u.name AS userName, o.pizzaId, p.name AS pizzaName, o.sizeId, s.size, o.address, o.userPhone, o.finalPrice, o.status
    FROM orders o
    JOIN users u ON o.userId = u.id
    JOIN pizzas p ON o.pizzaId = p.id
    JOIN size s ON o.sizeId = s.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Hiba az adatbázis lekérdezés során.' });
    }
    res.status(200).json(results);
  });
});

// Rendelés státuszának frissítése
router.put('/orders/:id', authMiddleware, adminMiddleware, (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Hiba a rendelés frissítése során.' });
    }
    res.status(200).json({ message: 'Rendelés sikeresen frissítve.' });
  });
});

// Kész rendelés törlése
router.delete('/orders/:id', authMiddleware, adminMiddleware, (req, res) => {
  const orderId = req.params.id;

  db.query('DELETE FROM orders WHERE id = ?', [orderId], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Hiba a rendelés törlése során.' });
    }
    res.status(200).json({ message: 'Rendelés sikeresen törölve.' });
  });
});

module.exports = router;