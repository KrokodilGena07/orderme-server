const express = require('express');
const pointsController = require('./points.controller');
const {createPointsValidator, updatePointsValidator, getBulkValidator} = require('./validators/points.validator');

const pointsRouter = express.Router();

pointsRouter.post('/', ...createPointsValidator, pointsController.create);
pointsRouter.put('/', ...updatePointsValidator, pointsController.update);
pointsRouter.get('/one', pointsController.getOne);
pointsRouter.get('/many/:userId', pointsController.getMany);
pointsRouter.delete('/:id', pointsController.delete);

module.exports = pointsRouter;