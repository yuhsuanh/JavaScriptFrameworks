var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', path: '/' });
});


//Register hbs helper function for selecting options in dropdown list
const hbs = require('hbs');

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


const passport = require('passport');
const session = require('express-session');

//GET handler for login
router.get('/login', (req, res, next) => {
  //res.render('login', {title: 'Login', path: '/login'});
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render('login', {title: 'Login', messages: messages});
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/projects',
  failureRedirect: '/login',
  failureMessage: 'Invalid Credentials'
}));



//GET handler for register
router.get('/register', (req, res, next) => {
  res.render('register', {title: 'Register', path: '/register'});
});


router.post('/register', (req, res, next) => {
  //Call the register method in the User model
  User.register(
    //new user object
    new User({username: req.body.username}),
    //password sent separately
    req.body.password,
    //callback function to handle creation of new user
    (err, newUser) => {
      if(err) {
        console.log(err);
        return res.redirect('/register');
      } else {
        //log the user in and send them to projects
        req.login(newUser, (err) => {
          res.redirect('/projects');
        });
      }
    }

  );
});

module.exports = router;
