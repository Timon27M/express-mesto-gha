const handlerError = (err, req, res, next) => {
  const { statusCode } = err;
  res.status(statusCode).send({
    message: err.message,
  });
  next();
};

module.exports = handlerError;
