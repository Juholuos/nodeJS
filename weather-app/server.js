require('dotenv').config();


const express = require('express');
const path = require('path');
const { error } = require('console');
const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  console.log('halo');
  res.send('hello world!')
})

app.get('/api/weather-api.js', (req, res) => {
  res.sendStatus(200);
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

