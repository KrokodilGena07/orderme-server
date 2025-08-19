const express = require('express');
const userUpdaterController = require('./userUpdater.controller');
const authMethodValidator = require('./validators/authMethodValidator');

const userUpdaterRouter = express.Router();

userUpdaterRouter.put('/', ...authMethodValidator, userUpdaterController.updateAuthMethod);

module.exports = userUpdaterRouter;