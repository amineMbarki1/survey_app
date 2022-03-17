'use strict';

const jwt = require('jsonwebtoken');

const HttpError = require('../utils/httpError');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new HttpError('Unauthorized access', 401);
    const token = authorization.split(' ')[1];
    if (!token) throw new HttpError('Unauthorized access', 401);
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = await User.findByPk(decoded.user);
    if (!req.user) throw new HttpError('Unauthorized access', 401);
    next();
  } catch (error) {
    console.log(error);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError')
      return next(new HttpError('Unauthorized access', 401));
    next(error);
  }
};
module.exports = authMiddleware;
