const db = require('../models/db');

async function adminMiddleware(req, res, next) {
  const userId = req.user.id;

  try {
    const [results] = await db.query('SELECT admin FROM users WHERE id = ?', [userId]);

    if (results.length === 0 || results[0].admin !== 1) {
      return res.status(403).json({ message: 'Nincs jogosultsága az oldal megtekintéséhez.' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: 'Hiba az adatbázis lekérdezés során.' });
  }
}

module.exports = adminMiddleware;
