const {User, Storage, Worker, Point, Network, Delivery, StorageItem, DeliveryDetail} = require('../../../models');
const ApiError = require('../../../error/api.error');
const uuid = require('uuid');
const saveImage = require('../../../utils/saveImage');

class DeliveryService {
    async create(userId, storageId, pointId, data, image, networkId, workerId) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('userId is invalid');
        }

        const storage = await Storage.findByPk(storageId);
        if (!storage) {
            throw ApiError.badRequest('storageId is invalid');
        }

        const point = await Point.findByPk(pointId);
        if (!point) {
            throw ApiError.badRequest('pointId is invalid');
        }

        const id = uuid.v4();
        const values = {id, userId, storageId, pointId};

        if (image) {
            values.image = saveImage(image);
        }

        if (networkId) {
            const network = await Network.findByPk(networkId);
            if (!network) {
                throw ApiError.badRequest('networkId is invalid');
            }

            values.netowrkId = networkId;
        }

        if (workerId) {
            const worker = await Worker.findByPk(id);
            if (!worker) {
                throw ApiError.badRequest('workerId is invalid');
            }

            values.workerId = workerId;
        }

        const delivery = await Delivery.create(values);

        for (const item of data) {
            const id = uuid.v4();
            const defaults = {
                id, storageId, userId, pointId, quantity: item.count, ingredientId: item.id
            };

            if (networkId) {
                defaults.networkId = networkId;
            }

            const [storageItem, created] = await StorageItem.findOrCreate({
                defaults,
                where: {pointId, ingredientId: item.id}
            });

            const deliveryDetailId = uuid.v4();
            await DeliveryDetail.create({
                id: deliveryDetailId, count: item.count, ingredientId: item.id, deliveryId: delivery.id
            });

            if (!created) {
                await storageItem.increment('quantity', {by: item.count})
            }
        }

        return delivery;
    }

    async get() {

    }
}

module.exports = new DeliveryService();