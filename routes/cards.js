const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validatorCreateCard,
  validatorCardId,
  validatorLikeAndDislikeCard,
} = require('../middlewares/validators');

router.get('/cards', getCards);
router.post('/cards', validatorCreateCard, createCard);
router.delete('/cards/:cardId', validatorCardId, deleteCard);
router.put('/cards/:cardId/likes', validatorLikeAndDislikeCard, likeCard);
router.delete('/cards/:cardId/likes', validatorLikeAndDislikeCard, dislikeCard);

module.exports = router;
