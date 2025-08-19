const {Session} = require('../../models');
const SessionDto = require('./dto/sessions.dto');
const ApiError = require('../../error/api.error');
const {Op} = require('sequelize');

class SessionsService {
    async get(userId) {
        const data = await Session.findAll({where: {userId}})
        return data.map(session => new SessionDto(session));
    }

    async delete(id) {
        const session = await Session.findByPk(id);
        if (!session) {
            throw ApiError.badRequest('session wasn\'t found');
        }

        await session.destroy();
    }
}

module.exports = new SessionsService();