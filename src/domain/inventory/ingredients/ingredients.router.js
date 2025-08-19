const express = require('express');
const ingredientsController = require('./ingredients.controller');
const {
    createIngredientValidator,
    ingredientsValidator,
    updateIngredientValidator
} = require('./validators/ingredients.validator');
const deleteValidator = require('../../../validators/idValidator');

const ingredientsRouter = express.Router();

ingredientsRouter.post('/', ...createIngredientValidator, ingredientsController.create);
ingredientsRouter.put('/', ...updateIngredientValidator, ingredientsController.update);
ingredientsRouter.get('/', ...ingredientsValidator, ingredientsController.get);
ingredientsRouter.delete('/:id', deleteValidator, ingredientsController.delete);

module.exports = ingredientsRouter;