const router = require('express').Router();
const passport = require('passport');
const config = require('../config/config');

// Environment variables
require('dotenv').config();

// Initiates Github Oauth
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// Github redirect route
router.get(
  '/github/redirect',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.status(200).redirect('/');
  }
);

// Initiates Google Oauth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google redirect route
router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.status(200).redirect('/');
  }
);

// Initiates Facebook Oauth
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

// Facebook redirect route
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.status(200).redirect('/');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).redirect('/');
});

module.exports = router;
