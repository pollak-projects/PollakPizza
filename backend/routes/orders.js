const express = require('express');
const db = require('../models/db');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();


router.get('/orders', authMiddleware, adminMiddleware, async (req, res) => {
  const query = `
    SELECT 
      o.id, 
      o.userId, 
      u.name AS userName, 
      o.pizzaId, 
      p.name AS pizzaName, 
      o.sizeId, 
      s.size, 
      o.address, 
      o.userPhone, 
      o.finalPrice, 
      o.status
    FROM orders o
    JOIN users u ON o.userId = u.id
    LEFT JOIN pizzas p ON o.pizzaId = p.id
    JOIN size s ON o.sizeId = s.id
    WHERE (o.pizzaId >= 1 OR (o.pizzaId = 0 AND o.status = 'Kész'))
  `;

  try {
    const results = await db.query(query);
    res.json(results[0]); // Return the rows
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Hiba a rendelések lekérdezése során.' });
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

    const insertPizzaQuery = 'INSERT INTO orders (userId, pizzaId, pizzaNum, sizeId, address, userPhone, finalPrice, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    await connection.query(insertPizzaQuery, [userId, pizzaId, pizzaNum, sizeId, address, userPhone, finalPrice, "Készítés alatt"]);

    await connection.commit();
    res.status(200).json({ message: 'Order added successfully' });
  } catch (error) {
    console.error('Error adding order:', error);
    await connection.rollback();
    res.status(500).json({ error: error.message });
  }
})

router.post('/orders/addCostume', async (req, res) => {
  const { userId, pizzaId, pizzaNum, sizeId, address, userPhone, finalPrice, toppings } = req.body;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const insertPizzaQuery = 'INSERT INTO orders (userId, pizzaId, pizzaNum, sizeId, address, userPhone, finalPrice, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const result = await connection.query(insertPizzaQuery, [userId, pizzaId, pizzaNum, sizeId, address, userPhone, finalPrice, "Készítés alatt"]);
    const orderId = result[0].insertId

    const insertToppingPromises = toppings.map(async (topping) => {
      const findToppingIdQuery = 'SELECT id FROM toppings WHERE name = ?';
      const [toppingResult] = await connection.query(findToppingIdQuery, [topping]);

      if (!toppingResult[0]) {
        throw new Error(`Topping not found: ${topping}`);
      }

      const insertToppingQuery = 'INSERT INTO ordertops (orderId, toppingId) VALUES (?, ?)';
      await connection.query(insertToppingQuery, [orderId, toppingResult[0].id]);
    });

    await Promise.all(insertToppingPromises);

    await connection.commit();
    res.status(200).json({ message: 'Order added successfully' });
  } catch (error) {
    console.error('Error adding order:', error);
    await connection.rollback();
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;
