const express = require('express');
const authController = require('./auth.controller');
const authValidator = require('./validators/auth.validator');

const authRouter = express.Router();

authRouter.post('/registration', ...authValidator, authController.registration);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/', authController.refresh);

module.exports = authRouter;