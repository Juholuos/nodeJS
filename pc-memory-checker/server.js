const express = require('express');
const getFileSystemInfo = require('./data/data');
const app = express();
const path = require('path');
const PORT = 5000; 


app.use(express.static('views'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './views' });
});

app.get('/pc-memory-info.json', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'pc-memory-info.json');
  res.sendFile(filePath);
});

app.get('/testi', (req, res) => {
  res.sendFile('testi.html', { root: './views' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

getFileSystemInfo();