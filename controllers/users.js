const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT_ERROR,
  UNAUTHORIZED,
  CONFLICTERROR,
} = require('../сonstants/statusCode');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => {
      res
        .status(NOT_FOUND)
        .send({
          message: `Произошла ошибка: ${err.name} c текстом: ${err.message}`,
        });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(OK).send({ user }))
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
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(CREATED).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res
          .status(CONFLICTERROR)
          .send({
            message: 'Пользователь с таким email уже существует',
          });
      }

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

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id.toString())
    .then((user) => {
      res.status(OK).send({ user });
    })
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
    })
    .catch(next);
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret');
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(UNAUTHORIZED)
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
  login,
  getCurrentUser,
};
