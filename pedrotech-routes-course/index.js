const express = require('express');
const app = express();
const PORT = 3500;


const userRoute = require('./routes/User');
const commentsRoute = require('./routes/Comments');

app.use('/users', userRoute)
app.use('/comments', commentsRoute)

app.listen(PORT, () => {
  console.log('server running on port 3500...');
});
