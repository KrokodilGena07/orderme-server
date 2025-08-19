const {body} = require('express-validator');

const createValidator = [
    body('name', 'Invalid length. Use 1–255 characters.').isLength({min: 1, max: 255}),
    body('price', 'Price is incorrect').optional().isFloat(),
    body('markup', 'Markup is incorrect').optional().isFloat(),
    body('userId', 'User ID is incorrect').isUUID(),
    body('pointId', 'Point ID is incorrect').isUUID(),
    body('parentId', 'Group ID is incorrect').optional().isUUID(),
    body('unitId', 'Unit ID is incorrect').optional().isUUID(),
    body('unitCount', 'Count is incorrect').optional().isFloat(),
    body('ingredients').optional().custom((value) => {
        let array;

        try {
            array = JSON.parse(value);
        } catch (e) {
            throw new Error('Data is incorrect');
        }

        if (!Array.isArray(array)) {
            throw new Error('Data is incorrect');
        }

        const productsFlag  = array.every(value => {
            return value?.count && value?.ingredientId
        });

        if (!productsFlag) {
            throw new Error('Elements are incorrect');
        }

        if (array.length === 0) {
            throw new Error('Data is empty');
        }

        return true;
    })
];

module.exports = createValidator;