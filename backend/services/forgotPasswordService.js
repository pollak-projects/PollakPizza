const db = require('../models/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Nodemailer SMTP konfiguráció a Mailgun használatával
const transporter = nodemailer.createTransport({
  host: 'smtp.eu.mailgun.org',
  port: 587,
  auth: {
    user: 'postmaster@cleandc.hu',
    pass: 'd045d2264a5eed6a5a7a2432c39430e5-1654a412-fbec0050'
  }
});

exports.sendResetEmail = async (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        return reject(new Error('Hiba az adatbázis lekérdezés során.'));
      }
      if (results.length === 0) {
        return reject(new Error('Ez az email nincs regisztrálva.'));
      }

      const token = crypto.randomBytes(20).toString('hex');
      const resetPasswordExpires = Date.now() + 3600000; // 1 óra

      db.query('UPDATE users SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?', [token, resetPasswordExpires, email], (err) => {
        if (err) {
          return reject(new Error('Hiba a token mentése során.'));
        }

        const mailOptions = {
          from: 'Pollak PasswordReset <postmaster@cleandc.hu>',
          to: email,
          subject: 'PollakPizza Jelszó Visszaállítás',
          text: `Ön ezt az emailt azért kapta, mert valaki (vagy Ön) jelszó visszaállítást kért a fiókjához.\n\n
          Kérjük kattintson az alábbi linkre, vagy másolja be a böngészőjébe a jelszó visszaállításához:\n\n
          http://localhost:8200/reset-password/${token}\n\n
          Ha nem Ön kérte a jelszó visszaállítást, kérjük hagyja figyelmen kívül ezt az emailt, és a jelszava változatlan marad.\n`
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error('Mailgun SMTP hiba:', err); // 🔥 Itt látod majd a pontos hibát!
            return reject(new Error('Hiba az email küldése során.'));
          }
          resolve(info);
        });
      });
    });
  });
};