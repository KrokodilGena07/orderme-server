const {query} = require('express-validator');

const getValidator = [
    query('userId', 'User ID is invalid').isUUID(),
    query('pointId', 'Point ID is invalid').optional().isUUID(),
    query('networkId', 'Network ID is invalid').optional().isUUID(),
    query('parentId', 'Group ID is invalid').optional().isUUID()
];

module.exports = getValidator;