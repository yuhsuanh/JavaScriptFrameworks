//import express and create a router object
var express = require('express');
var router = express.Router();

//import model
const Category = require('../models/category');

//create reusavle middleware function to check for a valid user or redirect to login
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// category / get request
router.get('/', (req, res, next) => {
    Category.find((err, categories) => {
        if(err) {
            console.log(err);
        } else{
            res.render('category/index', {title: 'Categories', dataset: categories, user: req.user });
        }
    });
});

// category /add get request
router.get('/add', isLoggedIn, (req, res, next) => {
    res.render('category/add', {title: 'Add Category', user: req.user});
});

//category /add post request-> add a new category to MongoDB
router.post('/add', (req, res, next) => {
    Category.create({
        name: req.body.name
    }, (err, newDocument) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/category');
        }
    });
});

//category /delete get request -> delete the category from MongoDB
router.get('/delete/:_id', isLoggedIn, (req, res, next) => {
    Category.remove({_id: req.params._id}, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/category');
        }
    })
});

//export router object to use it in app.js
module.exports = router; 