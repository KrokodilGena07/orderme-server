const express = require('express');
const subscriptionsController = require('./subscriptions.controller');
const deleteValidator = require('../../../validators/idValidator');
const createValidator = require('../validators/createValidator');
const updateValidator = require('../validators/updateValidator');

const subscriptionsRouter = express.Router();

subscriptionsRouter.post('/', createValidator, subscriptionsController.create);
subscriptionsRouter.get('/', subscriptionsController.get);
subscriptionsRouter.put('/', ...updateValidator, subscriptionsController.update);
subscriptionsRouter.delete('/:id', deleteValidator, subscriptionsController.delete);

module.exports = subscriptionsRouter;