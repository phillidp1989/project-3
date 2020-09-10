const passport = require('passport');
const User = require('../models/User');
const FacebookStrategy = require('passport-facebook').Strategy;

require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.providerId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ providerId: id });
    done(null, user);
  } catch (err) {
    console.log('ERROR - facebookAuth.js - deserializeUser', err);
  }
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/redirect'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const result = await User.findOne({ providerId: profile.id });
        if (result) {
          done(null, result);
        } else {
          console.log(profile);
          const user = await new User({
            provider: 'Facebook',
            providerId: profile.id,
            username: profile.displayName + profile.id,
            displayName: profile.displayName,
            avatar: `https://graph.facebook.com/${profile.id}/picture?type=large`
          }).save();
          done(null, user);
        }
      } catch (err) {
        console.log('ERROR - facebookAuth.js - FacebookStrategy', err);
      }
    }
  )
);
