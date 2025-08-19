const {Role, Subscription} = require('../../../models');
const ApiError = require('../../../error/api.error');
const uuid = require('uuid');

class SubscriptionsService {
    async create(name) {
        const candidate = await Subscription.findOne({where: {name}});
        if (candidate) {
            throw ApiError.badRequest('This subscription already exists');
        }

        const id = uuid.v4();
        return Subscription.create({name, id});
    }

    async get() {
        return Subscription.findAll();
    }

    async update(id, name) {
        const subscription = await Subscription.findByPk(id);
        if (!subscription) {
            throw ApiError.badRequest('Subscription wasn\'t found');
        }

        const candidate = await Subscription.findOne({where: {name}});
        if (candidate) {
            if (candidate.id !== subscription.id) {
                throw ApiError.badRequest('Subscription with this name already exists');
            }
        }

        subscription.name = name;
        return subscription.save();
    }

    async delete(id) {
        const subscription = await Subscription.findByPk(id);
        if (!subscription) {
            throw ApiError.badRequest('Subscription wasn\'t found');
        }

        await subscription.destroy();
    }
}

module.exports = new SubscriptionsService();