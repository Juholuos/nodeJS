const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
} = require('../controllers/users');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUser);
router.get('/', getAllUsers);

module.exports = router;
