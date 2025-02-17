const express = require('express');
const db = require('../models/db');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

// Összes felhasználó és rendeléseik lekérdezése
router.get('/admin/users', authMiddleware, adminMiddleware, (req, res) => {
  const query = `
    SELECT u.id, u.name, u.email, u.admin, GROUP_CONCAT(o.id SEPARATOR ', ') AS orders
    FROM users u
    LEFT JOIN orders o ON u.id = o.userId
    GROUP BY u.id, u.name, u.email, u.admin
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Hiba az adatbázis lekérdezés során.' });
    }
    res.status(200).json(results);
  });
});

// Felhasználó módosítása
router.put('/admin/users/:id', authMiddleware, adminMiddleware, (req, res) => {
  const userId = req.params.id;
  const { name, email, admin } = req.body;

  db.query('UPDATE users SET name = ?, email = ?, admin = ? WHERE id = ?', [name, email, admin, userId], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Hiba a felhasználó módosítása során.' });
    }
    res.status(200).json({ message: 'Felhasználó sikeresen módosítva.' });
  });
});

// Felhasználó törlése
router.delete('/admin/users/:id', authMiddleware, adminMiddleware, (req, res) => {
  const userId = req.params.id;

  db.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Hiba a felhasználó törlése során.' });
    }
    res.status(200).json({ message: 'Felhasználó sikeresen törölve.' });
  });
});

module.exports = router;