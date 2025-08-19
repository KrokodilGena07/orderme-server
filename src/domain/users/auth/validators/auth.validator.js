const {body} = require('express-validator');
const {User} = require('../../../../models');
const fullNameValidator = require('../../validators/fullNameValidator');

const authValidator = [
    fullNameValidator,
    body('email', 'Email is invalid')
        .isEmail()
        .custom(async (value, {req}) => {
            const user = await User.findOne({where: {email: value}});
            if (user) {
                throw new Error('User with this email already exists');
            }
        }),
    body('cafe', 'Invalid length. Use 1–255 characters.').isLength({min: 1, max: 255}),
    body('address', 'Invalid length. Use 1–255 characters.').isLength({min: 1, max: 255}),
    body('subscriptionId', 'Please, select subscription type').isUUID(),
    body('cafeTypeId', 'Please, select cafe type').isUUID()
];

module.exports = authValidator;