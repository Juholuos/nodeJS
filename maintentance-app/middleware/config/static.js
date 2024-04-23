const express = require('express');

// Create the static configuration
const staticConfig = express.static('public', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'text/javascript');
    } else if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
  },
});

// Export the static configuration
module.exports = staticConfig;
