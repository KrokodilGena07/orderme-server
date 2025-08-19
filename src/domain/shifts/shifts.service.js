const {Worker} = require('../../models/index');
const ApiError = require('../../error/api.error');
const uuid = require('uuid');
const {Shift, User, Point, ShiftWorker} = require('../../models');
const {DataTypes} = require('sequelize');

class ShiftsService {
    async connectWorkerToShift({money, workerId, userId, pointId}) {
        const point = await Point.findByPk(pointId);
        if (!point) {
            throw ApiError.badRequest('Point wasn\'t found');
        }

        const candidate = await Shift.findOne({
            where: {pointId, date: DataTypes.NOW()}
        });

        const worker = await Worker.findByPk(workerId);
        if (!worker) {
            throw ApiError.badRequest('Worker wasn\'t found');
        }

        if (candidate) {
            const id = uuid.v4();
            return ShiftWorker.create({
                id, workerId, shiftId: candidate.id
            });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('User wasn\'t found');
        }

        const id = uuid.v4();
        const values = {money, id, userId, pointId};
        const shift = await Shift.create(values);

        const shiftWorkerId = uuid.v4();
        return ShiftWorker.create({
            id: shiftWorkerId, workerId, shiftId: shift.id
        });
    }
}

module.exports = new ShiftsService();