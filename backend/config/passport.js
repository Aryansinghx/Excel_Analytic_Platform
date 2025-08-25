const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user'); // Adjust path

// Serialize user for session (optional if using sessions)
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,         // Set in .env
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Set in .env
  callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create user
    let user = await User.findOne({ providerId: profile.id, provider: 'google' });
    if (!user) {
      user = await User.create({
        providerId: profile.id,
        provider: 'google',
        email: profile.emails[0].value,
        name: profile.displayName,
        photo: profile.photos[0].value
      });
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,           // Set in .env
  clientSecret: process.env.FACEBOOK_APP_SECRET,   // Set in .env
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ providerId: profile.id, provider: 'facebook' });
    if (!user) {
      user = await User.create({
        providerId: profile.id,
        provider: 'facebook',
        email: profile.emails ? profile.emails[0].value : '',
        name: profile.displayName,
        photo: profile.photos ? profile.photos[0].value : ''
      });
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));