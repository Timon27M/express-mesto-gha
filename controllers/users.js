const User = require('../models/user');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT_ERROR,
} = require('../сonstants/statusCode');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => {
      res
        .status(DEFAULT_ERROR)
        .send({
          message: `Произошла ошибка: ${err.name} c текстом: ${err.message}`,
        });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(BAD_REQUEST)
          .send({
            message: `Произошла ошибка: ${err.name} c текстом: ${err.message}`,
          });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(NOT_FOUND)
          .send({
            message: `Произошла ошибка: ${err.name} c текстом: ${err.message}`,
          });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({
          message: `Произошла ошибка: ${err.name} c текстом: ${err.message}`,
        });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.status(CREATED).send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST)
          .send({
            message: `Произошла ошибка: ${err.name} c текстом: ${err.message}`,
          });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({
          message: `Произошла ошибка: ${err.name} c текстом: ${err.message}`,
        });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then(() => res.status(OK).send({ name, about }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST)
          .send({
            message: `Произошла ошибка: ${err.name} c текстом: ${err.message}`,
          });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({
          message: `Произошла ошибка: ${err.name} c текстом: ${err.message}`,
        });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, avatar, {
    new: true,
    runValidators: true,
  })
    .then(() => res.status(OK).send({ avatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST)
          .send({
            message: `Произошла ошибка: ${err.name} c текстом: ${err.message}`,
          });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({
          message: `Произошла ошибка: ${err.name} c текстом: ${err.message}`,
        });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
