const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

exports.login = async (email, password) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        return reject(new Error('Hiba az adatbázis lekérdezés során.'));
      }
      if (results.length > 0) {
        const isMatch = await bcrypt.compare(password, results[0].password);
        if (isMatch) {
          const payload = { email: results[0].email, id: results[0].id };
          const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
          return resolve(token);
        } else {
          return reject(new Error('Hibás jelszó!'));
        }
      }
      return reject(new Error('Ez az email még nincs regisztrálva!'));
    });
  });
};