const uuid = require('uuid');
const {Network, User, Point} = require('../../models');
const ApiError = require('../../error/api.error');

class NetworksService {
    async create(name, userId, points) {
        const id = uuid.v4();

        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('userId is invalid');
        }

        const network = await Network.create({name, userId, id})

        if (points) {
            for (const pointId of points) {
                const point = await Point.findByPk(pointId);
                if (!point) {
                    throw ApiError.badRequest('points is incorrect');
                }
                point.networkId = id;
                await point.save();
            }
        }

        return network;
    }

    getMany(userId) {
        return Network.findAll({where: {userId}});
    }

    async getOne(id) {
        const network = await Network.findByPk(id);
        if (!network) {
            throw ApiError.badRequest('network wasn\'t found');
        }

        return network;
    }

    async update(id, name) {
        const network = await Network.findByPk(id);
        if (!network) {
            throw ApiError.badRequest('network wasn\'t found');
        }

        network.name = name;
        return network.save();
    }

    async delete(id) {
        const network = await Network.findByPk(id);
        if (!network) {
            throw ApiError.badRequest('network wasn\'t found');
        }

        await network.destroy();
    }
}

module.exports = new NetworksService();