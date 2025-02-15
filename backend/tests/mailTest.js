const nodemailer = require('nodemailer');

// Nodemailer SMTP konfiguráció a Mailgun használatával
const transporter = nodemailer.createTransport({
  host: 'smtp.eu.mailgun.org',
  port: 587,
  auth: {
    user: 'postmaster@cleandc.hu',
    pass: 'd045d2264a5eed6a5a7a2432c39430e5-1654a412-fbec0050'
  }
});

const mailOptions = {
  from: 'Mailgun Teszt <postmaster@cleandc.hu>',
  to: 'imrehuszar22@gmail.com',
  subject: 'Teszt email Mailgunból',
  text: 'Ez egy teszt email a Mailgun SMTP használatával.'
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('Mailgun SMTP hiba:', err);
  } else {
    console.log('Email sikeresen elküldve:', info);
  }
});