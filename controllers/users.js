const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => {
      if (err.name === 'SomeErrorName' || 'ValidationError') {
        return res.status(400).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'SomeErrorName' || 'ValidationError') {
        return res.status(400).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName' || 'ValidationError') {
        return res.status(400).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'SomeErrorName' || 'ValidationError') {
        return res.status(400).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((newAvatar) => res.status(201).send(newAvatar))
    .catch((err) => {
      if (err.name === 'SomeErrorName' || 'ValidationError') {
        return res.status(400).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
