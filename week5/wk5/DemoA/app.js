var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//import mongoose
const mongoose = require('mongoose');


var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var projectsRouter = require('./routes/projects');
var coursesRouter = require('./routes/courses');

const passport = require('passport');
const session = require('express-session');

//Import the bew strategy from the package we installed
const githubStrategy = require('passport-github2').Strategy;
//Import global config file
const config = require('./config/globals');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Configure passport session cookie
//const connectionString = 'mongodb+srv://admin:1125@cluster0.sinf0.mongodb.net/comp2068'
app.use(session({
  secret: 's20201projectTracker',
  saveUninitialized: false,
  resave: false,

}));

//Initialize passport
app.use(passport.initialize());
//Make sure passport uses the configured session (express-session)
app.use(passport.session());

//Link passport to the user model
const User = require('./models/user');
const { profile } = require('console');
passport.use(User.createStrategy());


//configure github strategy
//first parameter is the strategy object
//second is a callback function that handles this authentication
passport.use(new githubStrategy({
    clientID: config.github.clientId,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackUrl
  }, 
  async (accessToken, refreshToken, profile, done) => {
    // search user by ID 
    const user = await User.findOne({ oauthId: profile.id });
    // user exist (returning user)
    if (user) {
      return done(null, user);
    }
    else {
      // new user, register them in the db
      const newUser = new User({
        username: profile.username,
        oauthId: profile.id,
        oauthProvider: 'Github',
        created: Date.now()
      });
      // add to db
      const savedUser = await newUser.save();
      return done(null, savedUser);
    }
  })
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/courses', coursesRouter);


//After all the use methods for my routes
//need a connection string
const connectionString = 'mongodb+srv://admin:1125@cluster0.sinf0.mongodb.net/comp2068'
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((message) => {
    console.log('Connected successfully!');
  })
  .catch((err) => {
    console.log('err');
  });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
