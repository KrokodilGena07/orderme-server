const express = require('express');
const productsController = require('./products.controller');
const deleteValidator = require('../../validators/idValidator');
const createValidator = require('./validators/createValidator');
const getValidator = require('./validators/getValidator');

const productsRouter = express.Router();

productsRouter.post('/', ...createValidator, productsController.create);
productsRouter.get('/', ...getValidator, productsController.get);
productsRouter.put('/', productsController.update);
productsRouter.delete('/:id', deleteValidator, productsController.delete);

module.exports = productsRouter;