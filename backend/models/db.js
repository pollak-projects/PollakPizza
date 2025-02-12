const mysql = require('mysql2');

// MySQL kapcsolat beállítása
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pollakpizza'
});

// Kapcsolódás ellenőrzése
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

module.exports = db;