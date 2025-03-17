const express = require('express');
const db = require('../models/db');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();


router.get('/orders', authMiddleware, adminMiddleware, async (req, res) => {
  const query = `
    SELECT o.id, o.userId, u.name AS userName, o.pizzaId, p.name AS pizzaName, o.sizeId, s.size, o.address, o.userPhone, o.finalPrice, o.status
    FROM orders o
    JOIN users u ON o.userId = u.id
    JOIN pizzas p ON o.pizzaId = p.id
    JOIN size s ON o.sizeId = s.id
  `;

  try {
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Hiba az adatbázis lekérdezés során.' });
  }
});


router.put('/orders/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
    res.status(200).json({ message: 'Rendelés sikeresen frissítve.' });
  } catch (err) {
    res.status(500).json({ message: 'Hiba a rendelés frissítése során.' });
  }
});


router.delete('/orders/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const orderId = req.params.id;

  try {
    await db.query('DELETE FROM orders WHERE id = ?', [orderId]);
    res.status(200).json({ message: 'Rendelés sikeresen törölve.' });
  } catch (err) {
    res.status(500).json({ message: 'Hiba a rendelés törlése során.' });
  }
});


router.post('/orders/add', async (req, res) => {
  const { userId, pizzaId, pizzaNum, sizeId, address, userPhone, finalPrice } = req.body;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const insertPizzaQuery = 'INSERT INTO orders (userId, pizzaId, pizzaNum, sizeId, address, userPhone, finalPrice) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await connection.query(insertPizzaQuery, [userId, pizzaId, pizzaNum, sizeId, address, userPhone, finalPrice]);

    await connection.commit();
    res.status(200).json({ message: 'Order added successfully' });
  } catch (error) {
    console.error('Error adding order:', error);
    await connection.rollback();
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;
