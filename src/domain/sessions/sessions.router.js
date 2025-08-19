const express = require('express');
const sessionsController = require('./sessions.controller');
const sessionsValidator = require('./validators/sessions.validator');

const sessionsRouter = new express.Router();

sessionsRouter.get('/', sessionsController.get);
sessionsRouter.delete('/:id', sessionsController.delete);

module.exports = sessionsRouter; // TODO ADD ACCESS VALIDATOR