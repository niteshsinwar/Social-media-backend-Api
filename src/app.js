const express = require('express');
const session = require('express-session');

// Set up session middleware

const app = express();

// Middleware
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

// Routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api', authRoutes);
app.use('/api', postRoutes);
app.use('/api', userRoutes);

module.exports = app;
