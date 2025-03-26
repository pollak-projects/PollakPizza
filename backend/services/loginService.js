const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

exports.login = async (email, password) => {
  try {
    const connection = await db.getConnection();
    const [results] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    connection.release();

    if (results.length > 0) {
      const isMatch = await bcrypt.compare(password, results[0].password);
      if (isMatch) {
        const payload = { email: results[0].email, id: results[0].id, admin: results[0].admin };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
      } else {
        throw new Error('Hibás jelszó!');
      }
    } else {
      throw new Error('Ez az email még nincs regisztrálva!');
    }
  } catch (err) {
    throw new Error(`Login error: ${err.message}`);
  }
};
