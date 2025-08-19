const express = require('express');
const storageItemsController = require('./storageItems.controller');
const getValidator = require('./validators/getValidator');

const storageItemsRouter = express.Router();

storageItemsRouter.get('/', ...getValidator, storageItemsController.get);

module.exports = storageItemsRouter;