const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

// Express alkalmazás inicializálása
const app = express();

// CORS middleware beállítása
app.use(cors({
  origin: 'http://localhost:8200', // Engedélyezzük a frontend URL-jét
  methods: ['GET', 'POST', 'OPTIONS'], // Engedélyezett HTTP metódusok
  allowedHeaders: ['Content-Type', 'Authorization'], // Engedélyezett fejlécek
  preflightContinue: false, // Ne folytassa az OPTIONS kérést
  optionsSuccessStatus: 204 // A 204 státuszkód a sikeres preflight kérés válaszához
}));

app.use(bodyParser.json());

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

// Regisztrációs route
app.post('/register', async (req, res) => {
    const { name, email, password, birthdate, address, phonenumber } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email és jelszó szükséges!' });
    }
  
    console.log('Received data:', req.body);  // Debugging: Nyomtasd ki a beérkezett adatokat
  
    // Ellenőrizzük, hogy létezik-e már a felhasználó
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);  // Log the error
        return res.status(500).json({ message: 'Hiba az adatbázis lekérdezés során.' });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: 'Ez az email már regisztrálva van!' });
      }
  
      // Jelszó titkosítása
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed:', hashedPassword);  // Debugging: Nyomtasd ki a titkosított jelszót
  
        // Új felhasználó hozzáadása az adatbázishoz
        db.query('INSERT INTO users (name, email, password, birthdate, address, phonenumber) VALUES (?, ?, ?, ?, ?, ?)', 
          [name, email, hashedPassword, birthdate, address, phonenumber], (err, results) => {
          if (err) {
            console.error('MySQL insert error:', err);  // Log the error
            return res.status(500).json({ message: 'Hiba a felhasználó hozzáadása során.' });
          }
          res.status(201).json({ message: 'Sikeres regisztráció!' });
        });
      } catch (err) {
        console.error('Error hashing password:', err);  // Log error if password hashing fails
        return res.status(500).json({ message: 'Hiba a jelszó titkosítása során.' });
      }
    });
  });
  

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email és jelszó szükséges!' });
    }
  
    console.log('Received data:', req.body);  // Debugging: Nyomtasd ki a beérkezett adatokat
  
    // Ellenőrizzük, hogy létezik-e már a felhasználó
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);  // Log the error
        return res.status(500).json({ message: 'Hiba az adatbázis lekérdezés során.' });
      }
      if (results.length > 0) {
        // Itt bcrypt-ot kellene használni a jelszó összehasonlításához
        const isMatch = await bcrypt.compare(password, results[0].password);
        if (isMatch) {
          return res.status(200).json({ message: 'Sikeres bejelentkezés!' });
        } else {
          return res.status(400).json({ message: 'Hibás jelszó!' });
        }
      }
      return res.status(400).json({ message: 'Ez az email még nincs regisztrálva!' });
    });
  });
  

// Szerver indítása
const port = 3061;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
