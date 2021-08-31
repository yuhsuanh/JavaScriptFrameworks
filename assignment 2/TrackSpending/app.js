var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//import monment
const moment = require('moment');

//import mongoose
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category');
var expenseRouter = require('./routes/expense');
// var usersRouter = require('./routes/users');

//import passport
const passport = require('passport');
const session = require('express-session');

//Import the bew strategy from the package we installed
const githubStrategy = require('passport-github2').Strategy;

//Import global config file
const config = require('./config/globals');

//import model
const User = require('./models/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//configure passport session cookie
app.use(session({
  secret: 'TrackSpending',
  saveUninitialized: false,
  resave: false,
}));

//initialize passport
app.use(passport.initialize());
//make sure passport uses the configured session (express-session)
app.use(passport.session());

// Link passport to the user model
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
app.use('/category', categoryRouter);
app.use('/expense', expenseRouter);
// app.use('/users', usersRouter);


//After all the use methods for my routes
//need a connection string
const connectionString = 'mongodb+srv://admin:1125@cluster0.sinf0.mongodb.net/trackspending'
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


// ===================== hbs helper =====================
const hbs = require('hbs');

hbs.registerHelper('toShortDate', (longDateValue) => {
    return new hbs.SafeString(longDateValue.toLocaleDateString("en-CA"));
});

hbs.registerHelper('multiplyValues', (value1, value2) => {
    let priceTotal = (value1 * value2).toFixed(2);
    return new hbs.SafeString(`<label class='priceTotal'>${priceTotal}</label>`);
});

hbs.registerHelper('dateFormat', (date, format) => {
    return moment(date).format(format);
});


module.exports = app;
