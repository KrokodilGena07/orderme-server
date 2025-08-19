const {Storage, StorageItem, Ingredient, Point, Network} = require('../../../models');

class StorageItemsService {
    async get(userId, pointId, networkId) {
        const where = {userId};

        if (pointId) {
            where.pointId = pointId;
        }

        if (networkId) {
            where.networkId = networkId;
        }

        return StorageItem.findAll({
            where,
            include: [
                {model: Ingredient, attributes: ['name', 'unit', 'minStock']},
                {model: Point, attributes: ['name']},
                {model: Network, attributes: ['name']},
                {model: Storage, attributes: ['name']}
            ],
            attributes: ['id', 'quantity']
        });
    }
}

module.exports = new StorageItemsService();