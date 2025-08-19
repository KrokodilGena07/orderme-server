const {query} = require('express-validator');

const getOneValidator = [
    query('pinCode', 'Value is incorrect').isLength({min: 4, max: 4}),
    query('pointId', 'Point ID is incorrect').isUUID()
];

module.exports = getOneValidator;