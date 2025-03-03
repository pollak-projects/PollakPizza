const jwt = require('jsonwebtoken');
const db = require('../models/db');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Nincs token, hozzáférés megtagadva.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Érvénytelen token.' });
  }
}

module.exports = authMiddleware;
