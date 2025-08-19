const express = require('express');
const workersMutatorController = require('./workersMutator.controller');
const createValidator = require('./validtors/createValidator');
const updateValidator = require('./validtors/updateValidator');
const deleteValidator = require('../../../validators/idValidator');

const workersMutatorRouter = express.Router();

workersMutatorRouter.post('/', ...createValidator, workersMutatorController.create);
workersMutatorRouter.put('/', ...updateValidator, workersMutatorController.update);
workersMutatorRouter.delete('/:id', deleteValidator, workersMutatorController.delete);

module.exports = workersMutatorRouter;