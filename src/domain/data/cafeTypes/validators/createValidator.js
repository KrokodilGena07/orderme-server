const createValidator = require('../../validators/createValidator');
const {body} = require('express-validator');

module.exports = [
    createValidator,
    body('subscriptionId', 'Subscription ID is incorrect').isUUID()
];