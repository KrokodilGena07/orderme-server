const {query} = require('express-validator');

const getValidator = [
    query('userId', 'userId is invalid').isUUID(),
    query('pointId', 'pointId is invalid').optional().isUUID(),
    query('networkId', 'networkId is invalid').optional().isUUID(),
];

module.exports = getValidator;