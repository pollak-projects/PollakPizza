const db = require('../models/db');

function adminMiddleware(req, res, next) {
  const userId = req.user.id;

  db.query('SELECT admin FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Hiba az adatbázis lekérdezés során.' });
    }
    if (results.length === 0 || results[0].admin !== 1) {
      return res.status(403).json({ message: 'Nincs jogosultsága az oldal megtekintéséhez.' });
    }
    next();
  });
}

module.exports = adminMiddleware;