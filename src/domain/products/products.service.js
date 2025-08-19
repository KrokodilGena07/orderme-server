const {Product, User, Point, Unit, ProductIngredient} = require('../../models');
const ApiError = require('../../error/api.error');
const uuid = require('uuid');
const saveImage = require('../../utils/saveImage');

class ProductsService {
    async create(name, price, markup, userId, pointId, parentId, image, unitId, unitCount, ingredients) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('User ID is invalid');
        }

        const point = await Point.findByPk(pointId);
        if (!point) {
            throw ApiError.badRequest('Point ID is invalid');
        }

        const id = uuid.v4()
        const values = {name, userId, pointId, id};

        if (parentId) {
            const parent = await Product.findByPk(parentId);
            if (!parent) {
                throw ApiError.badRequest('Parent ID is invalid');
            }

            values.parentId = parentId;
        }

        if (point?.networkId) {
            values.networkId = point.networkId;
        }

        if (unitId && unitCount) {
            const unit = await Unit.findByPk(unitId);
            if (!unit) {
                throw ApiError.badRequest('Unit wasn\'t found');
            }

            values.unitId = unitId;
            values.unitCount = unitCount;
        }

        if (markup && price) {
            values.price = price;
            values.markup = markup;
        }

        if (image) {
            values.image = saveImage(image);
        }

        if (ingredients) {
            for (const item of ingredients) {
                const PIId = uuid.v4();
                await ProductIngredient.create({
                    id: PIId,
                    productId: id,
                    count: item.count,
                    ingredientId: item.ingredientId
                });
            }
        }

        return Product.create(values);
    }

    async get(userId, pointId, networkId, parentId) {
        const where = {userId};

        if (networkId) {
            where.networkId = networkId;
        }

        if (pointId) {
            where.pointId = pointId;
        }

        if (parentId) {
            where.parentId = parentId;
        }

        console.log(where);

        return Product.findAll({where});
    }

    async update(id, name, price, markup, image, unitId, unitCount, ingredients) {

    }

    async delete(id) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw ApiError.badRequest('product wasn\'t found');
        }

        if (!product.parentId) {
            await Product.destroy({where: {parentId: id}});
        }

        await product.destroy();
    }
}

module.exports = new ProductsService();