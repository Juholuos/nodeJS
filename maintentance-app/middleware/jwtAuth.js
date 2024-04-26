const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  const token = authHeader.split(' ')[1];
  console.log('Token: ', token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Token:', token);
    console.log('Decoded User:', decoded);
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).send('Unauthorized: Invalid token');
  }
};

module.exports = authMiddleware;
