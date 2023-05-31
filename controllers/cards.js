const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
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

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((newCard) => res.status(201).send(newCard))
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

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .catch((err) => {
      res.status(404).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
    })
    .then((card) => res.send(card))
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

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .catch((err) => {
      res.status(404).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
    })
    .then((card) => res.status(200).send(card))
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

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .catch((err) => {
      res.status(404).send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
    })
    .then((card) => res.status(200).send(card))
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
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
