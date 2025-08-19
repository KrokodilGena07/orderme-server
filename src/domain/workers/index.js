const express = require('express');
const workersReaderRouter = require('./workersReader/workersReader.router');
const workersMutatorRouter = require('./workersMutator/workersMutator.router');

const workersRouter = express.Router();

workersRouter.use('/reader', workersReaderRouter);
workersRouter.use('/mutator', workersMutatorRouter);

module.exports = workersRouter;