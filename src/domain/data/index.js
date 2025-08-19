const express = require('express');
const authTypesRouter = require('./authTypes/authTypes.router');
const cafeTypesRouter = require('./cafeTypes/cafeTypes.router');
const rolesRouter = require('./roles/roles.router');
const unitsRouter = require('./units/units.router');
const subscriptionsRouter = require('./subscriptions/subscriptions.router');

const dataRouter = express.Router();

dataRouter.use('/types/auth', authTypesRouter);
dataRouter.use('/types/cafe', cafeTypesRouter);
dataRouter.use('/roles', rolesRouter);
dataRouter.use('/units', unitsRouter);
dataRouter.use('/subscriptions', subscriptionsRouter);

module.exports = dataRouter;