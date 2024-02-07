const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('posts');
})

router.get('/new', (req, res) => {
  res.send('New post');
});

module.exports = router