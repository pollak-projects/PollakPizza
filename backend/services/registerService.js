const bcrypt = require('bcryptjs');
const db = require('../models/db');

exports.register = async (name, email, password, birthdate, address, phonenumber) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        return reject(new Error('Hiba az adatbázis lekérdezés során.'));
      }
      if (results.length > 0) {
        return reject(new Error('Ez az email már regisztrálva van!'));
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (name, email, password, birthdate, address, phonenumber) VALUES (?, ?, ?, ?, ?, ?)', 
          [name, email, hashedPassword, birthdate, address, phonenumber], (err, results) => {
          if (err) {
            return reject(new Error('Hiba a felhasználó hozzáadása során.'));
          }
          resolve();
        });
      } catch (err) {
        return reject(new Error('Hiba a jelszó titkosítása során.'));
      }
    });
  });
};