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
} = require('../middlewares/validators');

router.get('/cards', getCards);
router.post('/cards', validatorCreateCard, createCard);
router.delete('/cards/:cardId', validatorCardId, deleteCard);
router.put('/cards/:cardId/likes', validatorCardId, likeCard);
router.delete('/cards/:cardId/likes', validatorCardId, dislikeCard);

module.exports = router;
