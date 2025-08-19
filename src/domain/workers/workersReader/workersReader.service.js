const {Worker, Role} = require('../../../models');
const ApiError = require('../../../error/api.error');

class WorkersReaderService {
    async getOne({pointId, pinCode}) {
        const worker = await Worker.findOne({
            where: {pointId, pinCode},
            include: [
                {model: Role, attributes: ['name']}
            ]
        });


        if (!worker) {
            throw ApiError.badRequest('Worker wasn\'t found');
        }

        return worker;
    }

    async getMany(userId, pointId, networkId) {
        const where = {userId};

        if (pointId) {
            where.poinId = pointId;
        }

        if (networkId) {
            where.networkId = networkId;
        }

        return Worker.findAll({where});
    }
}

module.exports = new WorkersReaderService();