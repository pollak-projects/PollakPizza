const bcrypt = require('bcryptjs');
const db = require('../models/db');

exports.register = async (name, email, password, birthdate, address, phonenumber) => {
  try {
    const connection = await db.getConnection();

    // Check if the email is already registered
    const [results] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (results.length > 0) {
      connection.release();
      throw new Error('Ez az email már regisztrálva van!');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await connection.query('INSERT INTO users (name, email, password, birthdate, address, phonenumber) VALUES (?, ?, ?, ?, ?, ?)', 
      [name, email, hashedPassword, birthdate, address, phonenumber]);
    
    connection.release();
  } catch (err) {
    throw new Error(`Registration error: ${err.message}`);
  }
};
