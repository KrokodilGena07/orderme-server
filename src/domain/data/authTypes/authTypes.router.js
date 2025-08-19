const express = require('express');
const authTypeController = require('./authType.controller');
const createValidator = require('./validators/createValidator');
const updateValidator = require('./validators/updateValidator');
const deleteValidator = require('../../../validators/idValidator');

const authTypeRouter = express.Router();

authTypeRouter.post('/', ...createValidator, authTypeController.create);
authTypeRouter.get('/', authTypeController.get);
authTypeRouter.put('/', ...updateValidator, authTypeController.update);
authTypeRouter.delete('/:id', deleteValidator, authTypeController.delete);

module.exports = authTypeRouter;