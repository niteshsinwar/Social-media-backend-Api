const jwt = require('jsonwebtoken');

const authController = {
  authenticate: (req, res) => {
    const  email ="user@example.com";
    const password ="password";

    // Dummy email and password for authentication
    if (email !== 'user@example.com' || password !== 'password') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token });
  },
};

module.exports = authController;
