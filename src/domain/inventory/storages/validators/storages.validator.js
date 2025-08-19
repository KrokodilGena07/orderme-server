const {body, param, query} = require('express-validator');

const storagesValidator = [
    body('name', 'name is invalid').isLength({min: 1, max: 255}),
    body('userId', 'userId is invalid').isUUID(),
    body('pointId', 'Select point, please').isUUID()
];

const getValidator = [
    query('userId', 'userId is invalid').isUUID(),
    query('pointId', 'pointId is invalid').optional().isUUID(),
    query('networkId', 'networkId is invalid').optional().isUUID()
];

module.exports = {
    storagesValidator,
    manyStoragesValidator: getValidator
};