const express = require('express');
const unitsController = require('./units.controller');
const deleteValidator = require('../../../validators/idValidator');
const createValidator = require('../validators/createValidator');
const updateValidator = require('../validators/updateValidator');

const unitsRouter = express.Router();

unitsRouter.post('/', createValidator, unitsController.create);
unitsRouter.get('/', unitsController.get);
unitsRouter.put('/', ...updateValidator, unitsController.update);
unitsRouter.delete('/:id', deleteValidator, unitsController.delete);

module.exports = unitsRouter;