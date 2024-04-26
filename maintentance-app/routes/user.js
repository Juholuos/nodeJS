const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/jwtAuth');
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
