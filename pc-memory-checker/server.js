const express = require('express');
const app = express();
const PORT = 5000; 
const getFileSystemInfo = require('./data')

app.use(express.static('views'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './views' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

getFileSystemInfo();