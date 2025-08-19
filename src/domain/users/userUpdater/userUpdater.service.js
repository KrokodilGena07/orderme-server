const {User, AuthType} = require('../../../models');
const ApiError = require('../../../error/api.error');
const bcrypt = require('bcrypt');

class UserUpdaterService {
    async updateAuthMethod({authTypeId, userId, pass}) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('User wasn\'t found');
        }

        const method = await AuthType.findByPk(authTypeId);
        if (!method) {
            throw ApiError.badRequest('Method wasn\'t found');
        }

        switch (method.name) {
            case '1FA':
                user.authTypeId = method.id;
                user.pass = null;
                return user.save();
            case '2FA':
                if (!pass) {
                    throw ApiError.badRequest('Password is empty');
                }

                const hashPass = await bcrypt.hash(pass, 5);
                user.authTypeId = method.id;
                user.pass = hashPass;

                return user.save();
        }
    }
}

module.exports = new UserUpdaterService();