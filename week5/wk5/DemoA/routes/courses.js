//Import express and create a router object
var express = require('express');
var router = express.Router();

//configure routes ising GET, POST, ...
// Verb > "Path" > "Middleware (function)"
router.get('/', (req, res, next) => {

    Course.find((err, courses) =>{
       if(err) {
           console.log(err);
       } else {
           res.render('courses/index', {title: 'Courses', path: '/courses', dataset: courses})
       }
    });

});

router.get('/add', (req, res, next) => {
    res.render('courses/add', {title: 'Add a New Course', path: '/courses',})
});

// import necessary model 
const Course = require('../models/course');
router.post('/add', (req, res, next) => {
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
