const db = require('../models/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Nodemailer SMTP konfiguráció a Mailgun használatával
const transporter = nodemailer.createTransport({
  host: 'smtp.eu.mailgun.org',
  port: 587,
  auth: {
    user: 'your-user',
    pass: 'your-pass'
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
          Ha nem Ön kérte a jelszó visszaállítást, kérjük hagyja figyelmen kívül ezt az emailt, és a jelszava változatlan marad.\n`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2 style="color: #333;">PollakPizza Jelszó Visszaállítás</h2>
              <p>Ön ezt az emailt azért kapta, mert valaki (vagy Ön) jelszó visszaállítást kért a fiókjához.</p>
              <p>Kérjük kattintson az alábbi linkre, vagy másolja be a böngészőjébe a jelszó visszaállításához:</p>
              <p>
                <a href="http://localhost:8200/reset-password/${token}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Jelszó Visszaállítása</a>
              </p>
              <p>Ha nem Ön kérte a jelszó visszaállítást, kérjük hagyja figyelmen kívül ezt az emailt, és a jelszava változatlan marad.</p>
              <p>Üdvözlettel,<br>PollakPizza Csapat</p>
            </div>
          `
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