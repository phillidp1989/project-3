const express = require('express');
const passport = require('passport');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const config = require('./config/config');
const connectDB = require('./config/db');

// OAuth passport strategies
require('./config/githubAuth');
require('./config/googleAuth');
require('./config/facebookAuth');

// To use .env file on localserver
require('dotenv').config();

// Initialize express into app variable
const app = express();

app.use(cors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

// Initialize Morgan logger
app.use(logger('dev'));

// Cookie Session setup for persistent authentication
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.cookie.key]
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Initialize passport and sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Connect to database
connectDB();

// Start the server
app.listen(config.express.port, () =>
  console.log(`App is running on port ${config.express.port}`)
);
