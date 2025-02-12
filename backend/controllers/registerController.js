const registerService = require('../services/registerService');

exports.register = async (req, res) => {
  const { name, email, password, birthdate, address, phonenumber } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email és jelszó szükséges!' });
  }

  try {
    await registerService.register(name, email, password, birthdate, address, phonenumber);
    return res.status(201).json({ message: 'Sikeres regisztráció!' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};