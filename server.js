const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    passport = require('passport'),
    GitHubStrategy = require('passport-github2'),
    cors = require('cors'),
    config = require('./config.js')

let app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(session({
  secret: config.secret,
  saveUninitialized: false,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, user);
});

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    // res.redirect('/');
    res.status(200).send(req.user);
  });

app.use(express.static('./public'));//serve all your folder

app.listen(3000, function() {
  console.log('Connected on 3000')
})
