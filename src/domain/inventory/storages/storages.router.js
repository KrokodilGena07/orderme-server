const express = require('express');
const {
    storagesValidator,
    manyStoragesValidator
} = require('./validators/storages.validator');
const idValidator = require('../../../validators/idValidator');
const updateValidator = require('./validators/updateValidator');
const storagesController = require('./storages.controller');

const storagesRouter = express.Router();

storagesRouter.post('/', ...storagesValidator, storagesController.create);
storagesRouter.get('/', ...manyStoragesValidator, storagesController.get);
storagesRouter.put('/', ...updateValidator, storagesController.update);
storagesRouter.delete('/:id', idValidator, storagesController.delete);

module.exports = storagesRouter;