const express = require('express');
const usersController = require('./usersData.controller');
const idValidator = require('../../../validators/idValidator');
const updateValidator = require('./validators/updateValidator');

const usersDataRouter = express.Router();

usersDataRouter.get('/:id', idValidator, usersController.get);
usersDataRouter.put('/', ...updateValidator, usersController.update);
usersDataRouter.delete('/:id', idValidator, usersController.delete);

module.exports = usersDataRouter;