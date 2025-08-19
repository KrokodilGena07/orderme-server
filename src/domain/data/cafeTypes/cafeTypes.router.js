const express = require('express');
const cafeTypeController = require('./cafeTypes.controller');
const deleteValidator = require('../../../validators/idValidator');
const createValidator = require('./validators/createValidator');
const updateValidator = require('./validators/updateValidator');

const cafeTypesRouter = express.Router();

cafeTypesRouter.post('/', ...createValidator, cafeTypeController.create);
cafeTypesRouter.get('/', cafeTypeController.get);
cafeTypesRouter.put('/', ...updateValidator, cafeTypeController.update);
cafeTypesRouter.delete('/:id', deleteValidator, cafeTypeController.delete);

module.exports = cafeTypesRouter;