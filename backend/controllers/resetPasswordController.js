const db = require('../models/db');
const bcrypt = require('bcrypt');

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: 'Új jelszó szükséges!' });
  }

  try {
    const [results] = await db.query('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpires > ?', [token, Date.now()]);

    if (results.length === 0) {
      return res.status(400).json({ message: 'A token érvénytelen vagy lejárt.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query('UPDATE users SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE id = ?', [hashedPassword, results[0].id]);

    res.status(200).json({ message: 'A jelszó sikeresen frissítve.' });
  } catch (err) {
    res.status(500).json({ message: 'Hiba történt a jelszó visszaállítása során.' });
  }
};
