const {Point, Network, User, CafeType} = require('../../models');
const uuid = require('uuid');
const ApiError = require('../../error/api.error');
const {Op} = require('sequelize');

class PointsService {
    async create(userId, name, address, cafeTypeId, networkId) {
        const id = uuid.v4();
        const values = {userId, name, address, id, cafeTypeId};

        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('User wasn\'t found');
        }

        const cafeType = await CafeType.findByPk(cafeTypeId);
        if (!cafeType) {
            throw ApiError.badRequest('cafeTypeId wasn\'t found');
        }

        if (networkId) {
            const network = await Network.findByPk(networkId);
            if (!network) {
                throw ApiError.badRequest('networkId is invalid');
            }

            values.networkId = networkId;
        }

        await Point.create(values);
        return Point.findByPk(id, {
            include: [
                {model: Network, attributes: ['name']},
                {model: CafeType, attributes: ['name']}
            ]
        });
    }

    getMany(userId) {
        return Point.findAll({
            where: {userId},
            include: [
                {model: Network, attributes: ['name']},
                {model: CafeType, attributes: ['name']}
            ]
        });
    }

    async getOne(id) {
        const point = await Point.findByPk(id);
        if (!point) {
            throw ApiError.badRequest('point wasn\'t found');
        }

        return point;
    }

    async update(id, name, address, type, networkId) {
        const point = await Point.findByPk(id);
        if (!point) {
            throw ApiError.badRequest('point wasn\'t found');
        }

        const data = {id, name, address, type};

        if (networkId) {
            const network = await Network.findByPk(networkId);
            if (!network) {
                throw ApiError.badRequest('network wasn\'t found');
            }

            data.networkId = networkId;
        }

        point.set(data);
        return point.save();
    }

    async delete(id) {
        const point = await Point.findByPk(id);
        if (!point) {
            throw ApiError.badRequest('point wasn\'t found');
        }

        await point.destroy();
    }
}

module.exports = new PointsService();