const express = require('express');
const db = require('../models/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Profil lekérése
router.get('/profile', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const connection = await db.getConnection();
    const [results] = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);
    connection.release();

    if (results.length === 0) {
      return res.status(404).json({ message: 'Felhasználó nem található.' });
    }

    res.status(200).json(results[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Hiba az adatbázis lekérdezés során.' });
  }
});

// Profil frissítése
router.put('/profile', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { name, email, address, phonenumber } = req.body;

  if (!name || !email || !address || !phonenumber) {
    return res.status(400).json({ message: 'Minden mező kitöltése szükséges!' });
  }

  try {
    const connection = await db.getConnection();
    const [results] = await connection.query(
      'UPDATE users SET name = ?, email = ?, address = ?, phonenumber = ? WHERE id = ?',
      [name, email, address, phonenumber, userId]
    );
    connection.release();

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Felhasználó nem található.' });
    }

    res.status(200).json({ message: 'Profil sikeresen frissítve.' });
  } catch (err) {
    return res.status(500).json({ message: 'Hiba az adatbázis frissítése során.' });
  }
});

module.exports = router;
