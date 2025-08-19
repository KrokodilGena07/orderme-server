const express = require('express');
const deliveryValidator = require('./validators/delivery.validator');
const deliveryController = require('./delivery.controller');

const deliveryRouter = express.Router();

deliveryRouter.post('/', ...deliveryValidator, deliveryController.create);

module.exports = deliveryRouter;