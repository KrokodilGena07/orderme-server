const {body, param} = require('express-validator');

const pointsValidator = [
    body('name', 'name is invalid').isLength({min: 1, max: 255}),
    body('address', 'address is invalid').isLength({min: 1, max: 255}),
    body('networkId', 'networkId is invalid').optional().isUUID(),
    body('cafeTypeId', 'cafe type is incorrect').isUUID()
];

const createPointsValidator = [
    body('userId', 'userId is invalid').isUUID(),
    ...pointsValidator
];

const updatePointsValidator = [
    body('id', 'id is invalid').isUUID(),
    ...pointsValidator
];

module.exports = {
    createPointsValidator,
    updatePointsValidator
}