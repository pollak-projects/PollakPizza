const express = require('express');
const db = require('../models/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Profil lekérése
router.get('/profile', authMiddleware, (req, res) => {
  const userId = req.user.id;

  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Hiba az adatbázis lekérdezés során.' });
    }
    res.status(200).json(results[0]);
  });
});

// Profil frissítése
router.put('/profile', authMiddleware, (req, res) => {
  const userId = req.user.id;
  const { name, email, address, phonenumber } = req.body;

  if (!name || !email || !address || !phonenumber) {
    return res.status(400).json({ message: 'Minden mező kitöltése szükséges!' });
  }

  db.query(
    'UPDATE users SET name = ?, email = ?, address = ?, phonenumber = ? WHERE id = ?',
    [name, email, address, phonenumber, userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Hiba az adatbázis frissítése során.' });
      }
      if (results.affectedRows === 0) {
        return res.status(400).json({ message: 'Felhasználó nem található.' });
      }
      res.status(200).json({ message: 'Profil sikeresen frissítve.' });
    }
  );
});

module.exports = router;