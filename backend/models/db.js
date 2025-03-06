const mysql = require('mysql2/promise');

// MySQL kapcsolat beállítása
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pollakpizza',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Kapcsolódás ellenőrzése
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('Connected to MySQL database');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
})();

module.exports = db;
