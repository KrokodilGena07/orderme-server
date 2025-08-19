const {Unit} = require('../../../models');
const ApiError = require('../../../error/api.error');
const uuid = require('uuid');

class UnitsService {
    async create(name) {
        const candidate = await Unit.findOne({where: {name}});
        if (candidate) {
            throw ApiError.badRequest('Unit with this name already exists');
        }

        const id = uuid.v4();
        return Unit.create({id, name});
    }

    async get() {
        return Unit.findAll();
    }

    async update(id, name) {
        const unit = await Unit.findByPk(id);
        if (!unit) {
            throw ApiError.badRequest('Unit wasn\'t found');
        }

        const candidate = await Unit.findOne({where: {name}});
        if (candidate) {
            if (candidate.id !== unit.id) {
                throw ApiError.badRequest('Unit with this name already exists');
            }
        }

        unit.name = name;
        return unit.save();
    }

    async delete(id) {
        const unit = await Unit.findByPk(id);
        if (!unit) {
            throw ApiError.badRequest('Unit wasn\'t found');
        }

        await unit.destroy();
    }
}

module.exports = new UnitsService();