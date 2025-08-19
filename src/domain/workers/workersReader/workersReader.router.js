const express = require('express');
const workersReaderController = require('./workersReader.controller');
const getOneValidator = require('./validators/getOneValidator');
const getManyValidator = require('./validators/getManyValidator');

const workersReaderRouter = express.Router();

workersReaderRouter.get('/one', ...getOneValidator, workersReaderController.getOne);
workersReaderRouter.get('/many', ...getManyValidator, workersReaderController.getMany);

module.exports = workersReaderRouter;