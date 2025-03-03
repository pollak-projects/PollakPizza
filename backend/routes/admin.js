const express = require('express');
const db = require('../models/db');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

// Összes felhasználó és rendeléseik lekérdezése
router.get('/admin/users', authMiddleware, adminMiddleware, async (req, res) => {
  const query = `
    SELECT u.id, u.name, u.email, u.admin, GROUP_CONCAT(o.id SEPARATOR ', ') AS orders
    FROM users u
    LEFT JOIN orders o ON u.id = o.userId
    GROUP BY u.id, u.name, u.email, u.admin
  `;

  try {
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Hiba az adatbázis lekérdezés során.' });
  }
});

// Felhasználó módosítása
router.put('/admin/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const userId = req.params.id;
  const { name, email, admin } = req.body;

  try {
    const [results] = await db.query('UPDATE users SET name = ?, email = ?, admin = ? WHERE id = ?', [name, email, admin, userId]);
    res.status(200).json({ message: 'Felhasználó sikeresen módosítva.' });
  } catch (err) {
    res.status(500).json({ message: 'Hiba a felhasználó módosítása során.' });
  }
});

// Felhasználó törlése
router.delete('/admin/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const userId = req.params.id;

  try {
    const [results] = await db.query('DELETE FROM users WHERE id = ?', [userId]);
    res.status(200).json({ message: 'Felhasználó sikeresen törölve.' });
  } catch (err) {
    res.status(500).json({ message: 'Hiba a felhasználó törlése során.' });
  }
});

module.exports = router;
