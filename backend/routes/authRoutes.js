const express = require('express');
const { register, login, logout, verifyOtp, sendVerifyOtp, isAuthenticated, sendResetOtp, verifyRestOtpAndResetPassword } = require('../controllers/authController');
const userAuth = require('../middleware/userAuth');

const authRoute = express.Router();

authRoute.post('/register', register);
authRoute.post('/login', login);
authRoute.post('/logout', logout);
authRoute.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRoute.post('/verify-otp', userAuth, verifyOtp);
authRoute.post('/incompleted-registration', verifyOtp);
authRoute.post('/is-auth', userAuth, isAuthenticated);
authRoute.post('/send-reset-otp', sendResetOtp);
authRoute.post('/reset-password', verifyRestOtpAndResetPassword);

module.exports = authRoute;