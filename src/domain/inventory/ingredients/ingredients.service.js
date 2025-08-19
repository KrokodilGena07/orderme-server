const {Ingredient, User, Point, Network, Unit} = require('../../../models');
const ApiError = require('../../../error/api.error');
const uuid = require('uuid');
const path = require('path');
const saveImage = require('../../../utils/saveImage');

class IngredientsService {
    async create(name, unitId, pricePerUnit, userId, pointId, minStock, image) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('userId is invalid');
        }

        const point = await Point.findByPk(pointId);
        if (!point) {
            throw ApiError.badRequest('pointId is invalid');
        }

        const candidate = await Ingredient.findOne({where: {name, pointId}});
        if (candidate) {
            throw ApiError.badRequest('Ingredient with this name already exists');
        }

        const unit = await Unit.findByPk(unitId);
        if (!unit) {
            throw ApiError.badRequest('Unit wasn\'t found');
        }

        const id = uuid.v4();
        const values = {id, user, pointId, name, pricePerUnit, unitId, userId};

        if (point.networkId) {
            values.networkId = point.networkId;
        }

        if (image) {
            values.image = saveImage(image);
        }

        if (minStock) {
            values.minStock = minStock;
        }

        await Ingredient.create(values);
        return Ingredient.findByPk(id, {
            include: [
                {model: Point, attributes: ['name']},
                {model: Network, attributes: ['name']},
                {model: Unit, attributes: ['name']}
            ]
        });
    }

    async get(userId, pointId, networkId) {
        const where = {userId};

        if (pointId) {
            where.pointId = pointId;
        }

        if (networkId) {
            where.networkId = networkId;
        }

        return Ingredient.findAll({
            where, include: [
                {model: Point, attributes: ['name']},
                {model: Network, attributes: ['name']}
            ]
        });
    }

    async update(id, name, unit, pricePerUnit, minStock, image, networkId) {
        const ingredient = await Ingredient.findByPk(id);
        if (!ingredient) {
            throw ApiError.badRequest('ingredient wasn\'t found');
        }

        const values = {name, unit, pricePerUnit};

        if (networkId) {
            const network = await Network.findByPk(networkId);
            if (!network) {
                throw ApiError.badRequest('networkId is invalid');
            }

            values.networkId = networkId;
        }

        if (image) {
            const newImage = uuid.v4() + path.extname(image.name);
            values.image = `${process.env.API_URL}/static/${newImage}`;

            await image.mv(`${path.join(process.env.STORAGE_IMAGE_FOLDER, newImage)}`, err => {
                if (err) {
                    throw ApiError.badRequest('image error')
                }
            });
        }

        if (minStock) {
            values.minStock = minStock;
        }

        ingredient.set(values);

        return ingredient.save();
    }

    async delete(id) {
        const ingredient = await Ingredient.findByPk(id);
        if (!ingredient) {
            throw ApiError.badRequest('Ingredient wasn\'t found');
        }

        return await ingredient.destroy();
    }
}

module.exports = new IngredientsService();