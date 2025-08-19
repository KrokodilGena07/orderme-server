const {query, body, param} = require('express-validator');

const ingredientsValidator = [
    query('userId', 'userId is invalid').isUUID(),
    query('pointId', 'pointId is invalid').optional().isUUID(),
    query('networkId', 'networkId is invalid').optional().isUUID()
];

const mutationValidator = [
    body('name', 'Use 1–255 characters').isLength({min: 1, max: 255}),
    body('unitId', 'Select unit, please').isUUID(),
    body('pricePerUnit', 'Value is invalid').isDecimal(),
    body('minStock', 'Value is invalid').optional().isNumeric()

];

const createIngredientValidator = [
    body('userId', 'userId is invalid').isUUID(),
    body('pointId', 'Select point, please').isUUID(),
    ...mutationValidator
];

const updateIngredientValidator = [
    body('id', 'id is invalid').isUUID(),
    ...mutationValidator
];

module.exports = {
    ingredientsValidator,
    createIngredientValidator,
    updateIngredientValidator
};