const express = require('express');
const shiftsController = require('./shifts.controller');
const openValidator = require('./validators/createValidator');

const shiftsRouter = express.Router();

shiftsRouter.post('/', ...openValidator, shiftsController.connectWorkerToShift);

module.exports = shiftsRouter;