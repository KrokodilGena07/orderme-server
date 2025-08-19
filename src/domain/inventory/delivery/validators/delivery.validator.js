const {body} = require('express-validator');

const deliveryValidator = [
    body('userId', 'userId is invalid').isUUID(),
    body('pointId', 'pointId is invalid').isUUID(),
    body('storageId', 'storageId is invalid').isUUID(),
    body('networkId', 'networkId is invalid').optional().isUUID(),
    body('data').custom((value, {req}) => {
        let array;

        try {
            array = JSON.parse(value);
        } catch (e) {
            throw new Error('Data is incorrect');
        }

        if (!Array.isArray(array)) {
            throw new Error('Data is incorrect');
        }

        const deliveryItemsFlag = array.every(value => {
            return value?.id && value?.count
        });

        if (!deliveryItemsFlag) {
            throw new Error('Elements are incorrect');
        }

        if (array.length === 0) {
            throw new Error('Data is empty');
        }

        return true;
    })
];

module.exports = deliveryValidator;