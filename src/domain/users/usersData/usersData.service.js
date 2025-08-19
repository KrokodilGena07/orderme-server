const {User, Subscription, AuthType, Session} = require('../../../models');
const ApiError = require('../../../error/api.error');

class UsersDataService {
    async get(id) {
        const user = await User.findByPk(id, {
            include: [
                {model: Subscription, attributes: ['name']},
                {model: AuthType, attributes: ['name']},
                {model: Session, attributes: ['id']}
            ]
        });

        if (!user) {
            throw ApiError.badRequest('User wasn\'t found');
        }

        return user;
    }

    async update(id, fullName) {
        const user = await User.findByPk(id);
        if (!user) {
            throw ApiError.badRequest('User wasn\'t found');
        }

        user.fullName = fullName;
        return user.save();
    }

    async delete(id) {
        const user = await User.findByPk(id);
        if (!user) {
            throw ApiError.badRequest('User wasn\'t found');
        }

        await user.destroy();
    }
}

module.exports = new UsersDataService();