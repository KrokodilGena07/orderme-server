const express = require('express');
const rolesController = require('./roles.controller');
const deleteValidator = require('../../../validators/idValidator');
const createValidator = require('../validators/createValidator');
const updateValidator = require('../validators/updateValidator');

const rolesRouter = express.Router();

rolesRouter.post('/', createValidator, rolesController.create);
rolesRouter.get('/', rolesController.get);
rolesRouter.put('/', ...updateValidator, rolesController.update);
rolesRouter.delete('/:id', deleteValidator, rolesController.delete);

module.exports = rolesRouter;