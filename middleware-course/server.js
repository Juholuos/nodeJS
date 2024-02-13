const express = require('express');
const app = express();

app.use(logger);

app.get('/', (req, res, next) => {
  console.log('home page');
  res.send('Home page');
  next();
});

app.get('/users', (req, res) => {
  console.log('users page');
  res.send('Users page')
});


function logger(req, res, next) {
  console.log('before');
  next();
  console.log('after');
}

function auth(req, res, next) {
  if (req.query.admin === 'true') {
    req.admin = true
    next();
    return
  } 
  res.send('No auth');
}

app.listen(3000, (err) => {
  if (err) throw err;
  console.log('Server running oon port 3000...');
})