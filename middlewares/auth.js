const jwt = require('jsonwebtoken');
// const { UNAUTHORIZED } = require('../сonstants/statusCode');
const UnauthorizedError = require('../errors/UnauthorizatedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    // return res
    //   .status(UNAUTHORIZED)
    //   .send({
    //     message: 'Необходима авторизация',
    //   });
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    // return res
    //   .status(UNAUTHORIZED)
    //   .send({ message: 'Необходима авторизация' });
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  return next();
};

module.exports = auth;
