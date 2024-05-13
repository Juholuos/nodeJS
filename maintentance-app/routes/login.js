const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/users');

// Näytä kirjautumissivu
router.get('/', (req, res) => {
  res.clearCookie('token');
  res.render('login'); // renderöi login.ejs
});

router.post('/', loginUser);

module.exports = router;
