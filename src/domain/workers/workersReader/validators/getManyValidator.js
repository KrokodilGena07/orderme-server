const {query} = require('express-validator');

const getManyValidator = [
    query('userId', 'User ID is incorrect').isUUID(),
    query('pointId', 'Point ID is incorrect').optional().isUUID(),
    query('networkId', 'Network ID is incorrect').optional().isUUID()
];

module.exports = getManyValidator;