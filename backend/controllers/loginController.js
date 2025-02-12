const loginService = require('../services/loginService');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email és jelszó szükséges!' });
  }

  try {
    const token = await loginService.login(email, password);
    return res.status(200).json({
      message: 'Sikeres bejelentkezés!',
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};