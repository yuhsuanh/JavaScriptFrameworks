//Import express and create a router object
var express = require('express');
var router = express.Router();

//import passport for implementing authorization
const passport = require('passport');

//create reusavle middleware function to check for a valid user or redirect to login
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

//configure routes ising GET, POST, ...
// Verb > "Path" > "Middleware (function)"
router.get('/', isLoggedIn, (req, res, next) => {

    Course.find((err, courses) =>{
       if(err) {
           console.log(err);
       } else {
           res.render('courses/index', {title: 'Courses', path: '/courses', dataset: courses, user: req.user})
       }
    });

});

router.get('/add', isLoggedIn, (req, res, next) => {
    res.render('courses/add', {title: 'Add a New Course', path: '/courses', user: req.user})
});

// import necessary model 
const Course = require('../models/course');
router.post('/add', isLoggedIn, (req, res, next) => {
    //how do I use the model I created?
    Course.create({
        name: req.body.name,
        instructor: req.body.instructor,
    }, (err, newDocument) => {

        if(err) {
            console.log(err);
        } else {
            res.redirect('/courses');
        }

    });
});


//export router object to use it in app.js
module.exports = router;
