const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validatorUserId,
  validatorUpdateProfile,
  validatorUpdateAvatar,
} = require('../middlewares/validator');

router.get('/users', getUsers);
router.get('/users/:userId', validatorUserId, getUser);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', validatorUpdateProfile, updateProfile);
router.patch('/users/me/avatar', validatorUpdateAvatar, updateAvatar);

module.exports = router;
