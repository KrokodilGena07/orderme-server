const express = require('express');
const verificationController = require('./verification.controller');

const verificationRouter = express.Router();

verificationRouter.post('/step1', verificationController.confirm1Step);
verificationRouter.post('/step2', verificationController.confirm2Step);

module.exports = verificationRouter;