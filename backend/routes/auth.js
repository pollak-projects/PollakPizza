const express = require('express');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const forgotPasswordController = require('../controllers/forgotPasswordController');
const resetPasswordController = require('../controllers/resetPasswordController'); // Új vezérlő importálása

const router = express.Router();

router.post('/login', loginController.login);
router.post('/register', registerController.register);
router.post('/forgot-password', forgotPasswordController.forgotPassword);
router.post('/reset-password/:token', resetPasswordController.resetPassword); // Új útvonal hozzáadása

module.exports = router;