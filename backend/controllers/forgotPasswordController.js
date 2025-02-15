const forgotPasswordService = require('../services/forgotPasswordService');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email szükséges!' });
  }

  try {
    await forgotPasswordService.sendResetEmail(email);
    return res.status(200).json({ message: 'Ellenőrizze az email fiókját a jelszó visszaállításához szükséges utasításokért.' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};