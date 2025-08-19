const express = require('express');
const networksController = require('./networks.controller');
const {
    createNetworksValidator,
    updateNetworksValidator
} = require('./validators/networks.validator');

const networksRouter = express.Router();

networksRouter.post('/', ...createNetworksValidator, networksController.create);
networksRouter.put('/', ...updateNetworksValidator, networksController.update);
networksRouter.get('/one', networksController.getOne);
networksRouter.get('/many/:userId', networksController.getMany); // TODO ADD VALIDATOR
networksRouter.delete('/:id', networksController.delete);

module.exports = networksRouter;