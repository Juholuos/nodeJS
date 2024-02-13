const express = require('express');
const app = express();

app.set('view engine', 'ejs')

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');

app.use('/users', userRouter);
app.use('/posts', postRouter);

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.listen(3000)