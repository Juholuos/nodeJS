const http = require('http');

// create server object
http.createServer((req, res) => {
  // Write respoinse
  res.write('Hello world');
  res.end();
}).listen(5000, () => console.log('Server running...'))