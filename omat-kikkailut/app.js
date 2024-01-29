const http = require('http');
const port = 3000;
const fs = require('fs');

const server = http.createServer(function(req, res) {
  if (req.url === '/') {
    // Käsitellään pääsivun pyyntö
    fs.readFile('index.html', function(err, data) {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/style.css') {
    // Käsitellään tyylitiedoston pyyntö
    fs.readFile('style.css', function(err, data) {
      if (err) {
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.write('404!')
    res.end();
  }
});

server.listen(port, function() {
  console.log(`Server running on port ${port}`);
});