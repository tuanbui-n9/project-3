'use strict';

const express = require('express');
const accessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');

const router = express.Router();

router.post('/shop/signup', asyncHandler(accessController.signup));
router.post('/shop/login', asyncHandler(accessController.login));

router.use(authentication);
router.post('/shop/logout', asyncHandler(accessController.logout));

module.exports = router;
