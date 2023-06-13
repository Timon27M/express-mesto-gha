const Card = require('../models/card');
const {
  OK,
  CREATED,
} = require('../сonstants/statusCode');
const DefaultError = require('../errors/DefaultError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => {
      throw new DefaultError(err.message);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((newCard) => res.status(CREATED).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
      throw new DefaultError(err.message);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не обнаружена');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(cardId).then(() => res.status(200).send(card));
      } else {
        throw new ForbiddenError('В доступе отказано');
      }
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
        throw new BadRequestError(err.message);
      }
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError(err.message);
      }
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
        throw new BadRequestError(err.message);
      }
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError(err.message);
      }
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
