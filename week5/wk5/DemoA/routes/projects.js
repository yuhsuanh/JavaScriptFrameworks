//Import express and create a router object
var express = require('express');
var router = express.Router();

//configure routes ising GET, POST, ...
// Verb > "Path" > "Middleware (function)"
router.get('/', (req, res, next) => {
    //render view
    //res.render('projects/index', {'title': 'Project Tracker'})

    Project.find((err, projects) =>{
       if(err) {
           console.log(err);
       } else {
           res.render('projects/index', {title: 'Project Tracker', dataset: projects})
       }
    });

});

router.get('/add', (req, res, next) => {
    res.render('projects/add', {'title': 'Add a New Project'})
});

// import necessary model 
const Project = require('../models/project');
router.post('/add', (req, res, next) => {
    //how do I use the model I created?
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


//export router object to use it in app.js
module.exports = router;
