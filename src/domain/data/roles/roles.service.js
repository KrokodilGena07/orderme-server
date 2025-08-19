const {Role} = require('../../../models');
const ApiError = require('../../../error/api.error');
const uuid = require('uuid');

class RolesService {
    async create(name) {
        const candidate = await Role.findOne({where: {name}});
        if (candidate) {
            throw ApiError.badRequest('This role already exists');
        }

        const id = uuid.v4();
        return Role.create({name, id});
    }

    async get() {
        return Role.findAll();
    }

    async update(id, name) {
        const role = await Role.findByPk(id);
        if (!role) {
            throw ApiError.badRequest('Role wasn\'t found');
        }

        const candidate = await Role.findOne({where: {name}});
        if (candidate) {
            if (candidate.id !== role.id) {
                throw ApiError.badRequest('Role with this name already exists');
            }
        }

        role.name = name;
        return role.save();
    }

    async delete(id) {
        const role = await Role.findByPk(id);
        if (!role) {
            throw ApiError.badRequest('Role wasn\'t found');
        }

        await role.destroy();
    }
}

module.exports = new RolesService();