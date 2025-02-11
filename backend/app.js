const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Express alkalmazás inicializálása
const app = express();


app.use(cors({
  origin: 'http://localhost:8200', // Engedélyezzük a frontend URL-jét
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'], // Engedélyezett HTTP metódusok
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

// JWT middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(401).send({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Bejelentkezési route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email és jelszó szükséges! ' });
  }

  // Ellenőrizzük, hogy létezik-e már a felhasználó
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Hiba az adatbázis lekérdezés során. ' });
    }
    if (results.length > 0) {
      // Bcrypt jelszó összehasonlítás
      const isMatch = await bcrypt.compare(password, results[0].password);
      if (isMatch) {
        // JWT token generálása
        const payload = { email: results[0].email, id: results[0].id };
        const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });

        return res.status(200).json({
          message: 'Sikeres bejelentkezés!',
          token,
        });
      } else {
        return res.status(400).json({ message: 'Hibás jelszó!' });
      }
    }
    return res.status(400).json({ message: 'Ez az email még nincs regisztrálva!' });
  });
});

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
      return res.status(500).json({ message: 'Hiba az adatbázis lekérdezés során. ' });
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

// Profil lekérése
app.get('/profile', authMiddleware, (req, res) => {
  const userId = req.user.id;

  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Hiba az adatbázis lekérdezés során.' });
    }
    res.status(200).json(results[0]);
  });
});

// Profil frissítése
app.put('/profile', authMiddleware, (req, res) => {
  const userId = req.user.id;
  const { name, email, address, phonenumber } = req.body;

  if (!name || !email || !address || !phonenumber) {
    return res.status(400).json({ message: 'Minden mező kitöltése szükséges!' });
  }

  // A profil frissítése az adatbázisban
  db.query(
    'UPDATE users SET name = ?, email = ?, address = ?, phonenumber = ? WHERE id = ?',
    [name, email, address, phonenumber, userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Hiba az adatbázis frissítése során.' });
      }
      if (results.affectedRows === 0) {
        return res.status(400).json({ message: 'Felhasználó nem található.' });
      }
      res.status(200).json({ message: 'Profil sikeresen frissítve.' });
    }
  );
});


// Szerver indítása
const port = 3061;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = authMiddleware;