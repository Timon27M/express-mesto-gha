const Card = require('../models/card');
const {
  OK,
  CREATED,
  // BAD_REQUEST,
  // NOT_FOUND,
  // DEFAULT_ERROR,
} = require('../сonstants/statusCode');
const DefaultError = require('../errors/DefaultError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => {
      // res.status(DEFAULT_ERROR)
      // .send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      throw new DefaultError(err.message);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((newCard) => res.status(CREATED).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // return res.status(BAD_REQUEST)
        // .send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
        throw new BadRequestError(err.message);
      }
      // return res.status(DEFAULT_ERROR)
      // .send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      throw new DefaultError(err.message);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        // return res.status(BAD_REQUEST)
        // .send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
        throw new BadRequestError(err.message);
      }
      if (err.name === 'DocumentNotFoundError') {
        // return res.status(NOT_FOUND)
        // .send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
        throw new NotFoundError(err.message);
      }
      // return res.status(DEFAULT_ERROR)
      // .send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      throw new DefaultError(err.message);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        // return res.status(BAD_REQUEST)
        // .send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
        throw new BadRequestError(err.message);
      }
      if (err.name === 'DocumentNotFoundError') {
        // return res.status(NOT_FOUND)
        // .send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
        throw new NotFoundError(err.message);
      }
      // return res.status(DEFAULT_ERROR)
      // .send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      throw new DefaultError(err.message);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        // return res.status(BAD_REQUEST)
        // .send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
        throw new BadRequestError(err.message);
      }
      if (err.name === 'DocumentNotFoundError') {
        // return res.status(NOT_FOUND)
        // .send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
        throw new NotFoundError(err.message);
      }
      // return res.status(DEFAULT_ERROR)
      // .send({ message: `Произошла ошибка: ${err.name} c текстом: ${err.message}` });
      throw new DefaultError(err.message);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
