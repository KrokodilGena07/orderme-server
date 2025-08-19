const {
    Point,
    Storage,
    Network,
    User
} = require('../../../models');
const ApiError = require('../../../error/api.error');
const uuid = require('uuid');
const saveImage = require('../../../utils/saveImage');

class StoragesService {
    async create(name, pointId, userId, image) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('userId is invalid');
        }

        const point = await Point.findByPk(pointId);
        if (!point) {
            throw ApiError.badRequest('pointId is invalid');
        }

        const candidate = await Storage.findOne({where: {pointId, name}});
        if (candidate) {
            if (candidate.id !== id) {
                throw ApiError.badRequest('Name error', [
                    {
                        path: 'name',
                        msg: 'Storage with this name already exits'
                    }
                ]);
            }
        }

        const id = uuid.v4();
        const values = {id, name, pointId, userId};

        if (image) {
            values.image = saveImage(image);
        }

        if (point.networkId) {
            values.networkId = point.networkId;
        }

        await Storage.create(values);
        return Storage.findByPk(id, {
            include: [
                {model: Point, attributes: ['name']},
                {model: Network, attributes: ['name']}
            ]
        });
    }

    async get(userId, networkId, pointId) {
        const where = {userId};

        if (networkId) {
            where.networkId = networkId;
        }

        if (pointId) {
            where.pointId = pointId;
        }

        return Storage.findAll({where, include: [
            {model: Point, attributes: ['name']},
            {model: Network, attributes: ['name']}
        ]});
    }

    async update({id, name, image}) {
        const storage = await Storage.findByPk(id);
        if (!storage) {
            throw ApiError.badRequest('storage wasn\'t found');
        }

        const candidate = await Storage.findOne({where: {pointId: storage.pointId, name}});
        if (candidate) {
            if (candidate.id !== id) {
                throw ApiError.badRequest('Name error', [
                    {
                        path: 'name',
                        msg: 'Storage with this name already exits'
                    }
                ]);
            }
        }

        storage.name = name;

        if (image) {
            storage.image = saveImage(image);
        }

        await storage.save();
        return Storage.findByPk(id, {
            include: [
                {model: Point, attributes: ['name']},
                {model: Network, attributes: ['name']}
            ]
        });
    }

    async delete(id) {
        const storage = await Storage.findByPk(id);
        if (!storage) {
            throw ApiError.badRequest('storage wasn\'t found');
        }

        return await storage.destroy();
    }
}

module.exports = new StoragesService();