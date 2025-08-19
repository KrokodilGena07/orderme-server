const express = require('express');
const authRouter = require('../domain/users/auth/auth.router');
const shiftsRouter = require('../domain/shifts/shifts.router');
const sessionsRouter = require('../domain/sessions/sessions.router');
const pointsRouter = require('../domain/points/points.router');
const networksRouter = require('../domain/networks/networks.router');
const storagesRouter = require('../domain/inventory/storages/storages.router');
const ingredientsRouter = require('../domain/inventory/ingredients/ingredients.router');
const deliveryRouter = require('../domain/inventory/delivery/delivery.router');
const storageItemsRouter = require('../domain/inventory/storageItems/storageItems.router');
const productsRouter = require('../domain/products/products.router');

const dataRouter = require('../domain/data/index');
const usersRouter = require('../domain/users/index');
const workersRouter = require('../domain/workers/index');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/shifts', shiftsRouter);
router.use('/sessions', sessionsRouter);
router.use('/points', pointsRouter);
router.use('/networks', networksRouter);
router.use('/storages', storagesRouter);
router.use('/ingredients', ingredientsRouter);
router.use('/delivery', deliveryRouter);
router.use('/storage/items', storageItemsRouter);
router.use('/products', productsRouter);

router.use('/data', dataRouter);
router.use('/users', usersRouter);
router.use('/workers', workersRouter)

module.exports = router;