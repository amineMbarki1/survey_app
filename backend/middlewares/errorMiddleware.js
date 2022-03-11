'use strict';

const errorMiddleware = (error, req, res, next) => {
  console.log(error);
  const httpCode = error.httpCode || 500;
  const newError = `${httpCode}`.startsWith('4') ? error : { message: 'internal server error' };
  res.status(httpCode).json({
    ...newError,
    message: newError.message,
  });
};

module.exports = errorMiddleware;
