const updateValidator = require('../../validators/updateValidator');
const {body} = require('express-validator');

module.exports = [
    updateValidator,
    body('subscriptionId', 'Subscription ID is incorrect').isUUID()
];