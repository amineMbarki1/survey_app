'use strict';
const express = require('express');
const router = express.Router();

const { createUser, login } = require('../controllers/userController');
const { validateRegistrationData } = require('../middlewares/validationMiddlewares');

router.route('/register').post(validateRegistrationData, createUser);
router.route('/login').post(login);

module.exports = router;
