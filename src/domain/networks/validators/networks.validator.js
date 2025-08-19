const {body} = require('express-validator');

const updateNetworksValidator = [
    body('id', 'id is invalid').isUUID(),
    body('name', 'name is invalid').isLength({min: 1, max: 255})
];

const createNetworksValidator = [
    body('name', 'name is invalid').isLength({min: 1, max: 255}),
    body('userId', 'userId is invalid').isUUID(),
    body('points').optional().customSanitizer(value => {
        let array;
        try {
            array = JSON.parse(value);
        } catch (e) {
            throw new Error('points is invalid');
        }

        if (!(array instanceof Array)) {
            throw new Error('points is invalid');
        }

        return array;
    })
];

module.exports = {
    createNetworksValidator,
    updateNetworksValidator
};