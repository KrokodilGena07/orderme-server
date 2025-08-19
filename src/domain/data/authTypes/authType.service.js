const {AuthType} = require('../../../models');
const ApiError = require('../../../error/api.error');
const uuid = require('uuid');

class AuthTypeService {
    async create(name, description) {
        const candidate = await AuthType.findOne({where: {name}});
        if (candidate) {
            throw ApiError.badRequest('AuthType with this name already exists');
        }

        const id = uuid.v4();
        return AuthType.create({id, name, description});
    }

    async get() {
        return AuthType.findAll();
    }

    async update(id, name, description) {
        const authType = await AuthType.findByPk(id);
        if (!authType) {
            throw ApiError.badRequest('AuthType wasn\'t found');
        }

        const candidate = await AuthType.findOne({where: {name}});
        if (candidate) {
            if (candidate.id !== authType.id) {
                throw ApiError.badRequest('AuthType with this name already exists');
            }
        }

        authType.set({name, description});
        return authType.save();
    }

    async delete(id) {
        const authType = await AuthType.findByPk(id);
        if (!authType) {
            throw ApiError.badRequest('AuthType wasn\'t found');
        }

        await authType.destroy();
    }
}

module.exports = new AuthTypeService();