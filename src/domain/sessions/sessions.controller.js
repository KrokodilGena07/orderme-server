const sessionsService = require('./sessions.service');

class SessionsController {
    async get(req, res, next) {
        try {
            const {userId} = req.query;
            const data = await sessionsService.get(userId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await sessionsService.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new SessionsController();