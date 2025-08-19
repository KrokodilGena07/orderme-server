const {Worker, User, Role, Point} = require('../../../models');
const ApiError = require('../../../error/api.error');
const uuid = require('uuid');

class WorkerMutatorService {
    async create(firstName, lastName, pinCode, userId, roleId, pointId) {
        const values = {firstName, lastName, pinCode, userId, roleId, pointId};

        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('user wasn\'t found');
        }

        if (pinCode.length !== 4) {
            throw ApiError.badRequest('Pin code is wrong');
        }

        const point = await Point.findByPk(pointId);
        if (!point) {
            throw ApiError.badRequest('Point wasn\'t found');
        }

        const candidate = await Worker.findOne({where: {pointId, pinCode}});
        if (candidate) {
            throw ApiError.badRequest('user with this pinCode already exists');
        }

        const role = await Role.findByPk(roleId);
        if (!role) {
            throw ApiError.badRequest('Role wasn\'t found');
        }

        if (point.networkId) {
            values.networkId = point.networkId;
        }

        values.id = uuid.v4();

        return Worker.create(values);
    }
    async update(id, firstName, lastName, pinCode, roleId) {
        const worker = await Worker.findByPk(id);
        if (!worker) {
            throw ApiError.badRequest('Worker wasn\'t found');
        }

        if (pinCode.length !== 4) {
            throw ApiError.badRequest('Pin code is wrong');
        }

        const role = await Role.findByPk(roleId);
        if (!role) {
            throw ApiError.badRequest('Role wasn\'t found');
        }

        worker.set({firstName, lastName, pinCode, roleId});
        return worker.save();
    }

    async delete(id) {
        const worker = await Worker.findByPk(id);
        if (!worker) {
            throw ApiError.badRequest('Worker wasn\'t found');
        }

        await worker.destroy();
    }
}

module.exports = new WorkerMutatorService();