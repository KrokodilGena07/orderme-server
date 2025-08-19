const express = require('express');
const userUpdaterRouter = require('./userUpdater/userUpdater.router');
const usersDataRouter = require('./usersData/usersData.router');
const authRouter = require('./auth/auth.router');
const verificationRouter = require('./verification/verification.router');

const usersRouter = express.Router();

usersRouter.use('/data', usersDataRouter);
usersRouter.use('/updater', userUpdaterRouter);
usersRouter.use('/auth', authRouter);
usersRouter.use('/verification', verificationRouter);

module.exports = usersRouter;