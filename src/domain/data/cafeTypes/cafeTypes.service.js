const {CafeType, Subscription} = require('../../../models');
const ApiError = require('../../../error/api.error');
const uuid = require('uuid');

class CafeTypesService {
    async create(name, subscriptionId) {
        const candidate = await CafeType.findOne({where: {name}});
        if (candidate) {
            throw ApiError.badRequest('CafeType with this name already exists');
        }

        const subscription = await Subscription.findByPk(subscriptionId);
        if (!subscription) {
            throw ApiError.badRequest('Subscription wasn\'t found');
        }

        const id = uuid.v4();
        return CafeType.create({id, name, subscriptionId});
    }

    async get() {
        return CafeType.findAll({
            include: [
                {model: Subscription, attributes: ['name']}
            ]
        });
    }

    async update(id, name, subscriptionId) {
        const cafeType = await CafeType.findByPk(id);
        if (!cafeType) {
            throw ApiError.badRequest('CafeType wasn\'t found');
        }

        const candidate = await CafeType.findOne({where: {name}});
        if (candidate) {
            if (candidate.id !== cafeType.id) {
                throw ApiError.badRequest('CafeType with this name already exists');
            }
        }

        const subscription = await Subscription.findByPk(subscriptionId);
        if (!subscription) {
            throw ApiError.badRequest('Subscription wasn\'t found');
        }

        cafeType.set({name, subscriptionId});
        return cafeType.save();
    }

    async delete(id) {
        const cafeType = await CafeType.findByPk(id);
        if (!cafeType) {
            throw ApiError.badRequest('CafeType wasn\'t found');
        }

        await cafeType.destroy();
    }
}

module.exports = new CafeTypesService();