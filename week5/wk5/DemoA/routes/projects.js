//Import express and create a router object
var express = require('express');
var router = express.Router();


// import necessary model 
const Project = require('../models/project');
const Course = require('../models/course');

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
//add authorization middleware function before the request handler function
router.get('/', (req, res, next) => {
    //render view
    //res.render('projects/index', {'title': 'Project Tracker'})

    Project.find((err, projects) =>{
       if(err) {
           console.log(err);
       } else {
           res.render('projects/index', {title: 'Project Tracker', path: '/projects', dataset: projects, user: req.user})
       }
    });

});

router.get('/add', isLoggedIn, (req, res, next) => {
    // res.render('projects/add', {title: 'Add a New Project', path: '/projects'})

    Course.find((err, courses) => {
        if(err) {
            console.log(err);
        } else {
            res.render('projects/add', {title: 'Add a New Project', path: '/projects', courses: courses, user: req.user})
        }
    });

});

router.post('/add', isLoggedIn, (req, res, next) => {
    //how do I use the model I created?
    //TODO: Retrieve due date convert to UTC **
    Project.create({
        name: req.body.name,
        dueDate: req.body.dueDate,
        course: req.body.course,
    }, (err, newDocument) => {

        if(err) {
            console.log(err);
        } else {
            res.redirect('/projects');
        }

    });
});

//GET handler for /projects/delete/:_id
router.get('/delete/:_id', isLoggedIn, (req, res, next) => {
   Project.remove({ _id: req.params._id }, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/projects');
        }
   }) ;
});

//Register hbs helper function for selecting options in dropdown list
const hbs = require('hbs');

hbs.registerHelper('createOption', (currentValue, selectedValue) => {
    var selectedAttribute = '';
    if(currentValue == selectedValue) {
        selectedAttribute = 'selected';
    }
    return new hbs.SafeString(`<option ${selectedAttribute}>${currentValue}</option>`);
    // return new hbs.SafeString('<option ' + selectedAttribute + '>'+ currentValue + '</option>');
})

hbs.registerHelper('toShortDate', (longDateValue) => {
    return new hbs.SafeString(longDateValue.toLocaleDateString("en-CA"));
})


//GET hander for /projects/edit/:_id
router.get('/edit/:_id', isLoggedIn, (req, res, next) => {
    Project.findById({ _id: req.params._id }, (err, project) => {
        if(err) {

        } else {
            Course.find((err, courses) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('projects/edit', {title: 'Edit a Project', project: project, courses: courses, user: req.user});
                }
            });
        }
    })
});


router.post('/edit/:_id', isLoggedIn, (req, res, next) => {
    Project.findOneAndUpdate( { _id: req.params._id }, {
        name: req.body.name,
        dueDate: req.body.dueDate,
        course: req.body.course,
        status: req.body.status,
    }, (err, updatedProject) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/projects');
        }
    });
});


//export router object to use it in app.js
module.exports = router;
