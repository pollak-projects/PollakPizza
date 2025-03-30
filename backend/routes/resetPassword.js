const express = require('express');
const router = express.Router();

// Jelszó visszaállítási oldal megjelenítése
router.get('/reset-password/:token', (req, res) => {
  const token = req.params.token;
  res.render('reset-password', { token, message: null });
});

// Jelszó visszaállítás kezelése
router.post('/reset-password/:token', (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.newPassword;

  try {
    // Itt kezeld a jelszó frissítését az adatbázisban
    console.log(`Token: ${token}, New Password: ${newPassword}`);
    res.render('reset-password', {
      token,
      message: "A jelszó sikeresen frissítve. Most már bejelentkezhet az új jelszavával.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.render('reset-password', {
      token,
      message: "Hiba történt a jelszó visszaállítása során. Kérjük, próbálja újra.",
    });
  }
});

module.exports = router;