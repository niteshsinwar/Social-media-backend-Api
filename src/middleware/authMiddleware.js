const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Check if Authorization header is present

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Check if token is valid
  const token = authHeader.split(' ')[1];
  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log("authorized")
      next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
