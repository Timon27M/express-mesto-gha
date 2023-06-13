const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const { UNAUTHORIZED } = require('../сonstants/statusCode');
=======
// const { UNAUTHORIZED } = require('../сonstants/statusCode');
const UnauthorizedError = require('../errors/UnauthorizatedError');
>>>>>>> featureJS

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
<<<<<<< HEAD
    return res
      .status(UNAUTHORIZED)
      .send({
        message: 'Необходима авторизация',
      });
=======
    // return res
    //   .status(UNAUTHORIZED)
    //   .send({
    //     message: 'Необходима авторизация',
    //   });
    throw new UnauthorizedError('Необходима авторизация');
>>>>>>> featureJS
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
<<<<<<< HEAD
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
=======
    // return res
    //   .status(UNAUTHORIZED)
    //   .send({ message: 'Необходима авторизация' });
    throw new UnauthorizedError('Необходима авторизация');
>>>>>>> featureJS
  }
  req.user = payload;
  return next();
};

module.exports = auth;
