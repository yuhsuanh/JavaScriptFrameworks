//import express and create a router object
var express = require('express');
var router = express.Router();

//parse date
var moment = require('moment');

//import model
const Expense = require('../models/expense');
const Item = require('../models/item');
const Category = require('../models/category');


//create reusavle middleware function to check for a valid user or redirect to login
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// expense / get request -> return all expenses
router.get('/', (req, res, next) => {

    Expense.find((err, expenses) => {
        if(err) {
            console.log(err);
        } else {
            console.log(expenses);
            res.render('expense/index', {title: 'Expenses', dataset: expenses, user: req.user});
        }
    });

    /*
        another way to get all expense with relationship objects:
        but you need to push the objects to the epxenses list first
    */
    // Expense.find().populate('items').exec(function(err, expenses) {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         console.log(expenses);
    //         console.log(expenses[2].items);
    //         res.render('expense/index', {title: 'Expenses', dataset: expenses});
    //     }
    // });
});

// expense /add request
router.get('/add', isLoggedIn, (req, res, next) => {
    Category.find((err, categories) => {
        if(err) {
            console.log(err);
        } else {
            res.render('expense/add', {title: 'Add Expense', categories: JSON.stringify(categories), user: req.user});
        }
    });
});

//expense /add post request-> add expense and items
router.post('/add', (req, res, next) => {

    //get how many items
    let amount = 0;
    if(Array.isArray(req.body.itemName)) {
        amount = req.body.itemName.length;
    } else {
        amount = 1;
    }
    
    //create expense
    Expense.create({
        storeName: req.body.store,
        date: req.body.date,
        total: req.body.total,
        amount: amount
    }, (err, expense) => {
        if(err) {
            console.log(err);
        } else {
            //create new items
            if(Array.isArray(req.body.itemName)) {
                for(let i = 0; i < req.body.itemName.length; i++) {
                    Item.create({
                        itemName: req.body.itemName[i],
                        price: parseFloat(req.body.price[i]),
                        amount: parseInt(req.body.amount[i]),
                        category: req.body.category[i],
                        receipt: expense._id,
                    }, (err, newItem) => {
                        if(err) {
                            console.log(err);
                        } else {
                            /*
                                you can push the items to the expense field
                                then you can use populate to get the objects
                            */
                            // expense.items.push(newItem)
                        }
                    });
                }
            } else {
                //create a item (not array)
                Item.create({
                    itemName: req.body.itemName,
                    price: parseFloat(req.body.price),
                    amount: parseInt(req.body.amount),
                    category: req.body.category,
                    receipt: expense._id,
                }, (err, newItem) => {
                    if(err) {
                        console.log(err);
                    } else {
                        /*
                            you can push the items to the expense field
                            then you can use populate to get the objects
                        */
                        // expense.items.push(newItem)
                    }
                });
            }
            /*
                after push you need to save the changes
            */
            // expense.save();
            
        }
    });
    
    res.redirect('/expense');
});

//expense /edit get request -> return all categories, the expense and the items
router.get('/edit/:_id', isLoggedIn, (req, res, next) => {

    // get categories
    Category.find((err, categories) => {
        if(err) {
            console.log(err);
        } else {
            // get expense
            Expense.findById({ _id: req.params._id}, (err, expense) => {
                if(err) {
                    console.log(err);
                } else {
                    //get items
                    Item.find({receipt: req.params._id}, (err, items) => {
                        if(err) {
                            console.log(err);
                        } else {
                            res.render('expense/edit', {title: 'Edit Expenses', categories: JSON.stringify(categories), optionList: categories, expense: expense, dataset: items, user: req.user});
                        }
                    })       
                }
            })
        }
    });
});

//expense /edit post request -> save all the changes
router.post('/edit/:_id', (req, res, next) => {

    //get amount of items
    let amount = 0;
    if(Array.isArray(req.body.itemName)) {
        amount = req.body.itemName.length;
    } else {
        amount = 1;
    }

    //get amount of exist items, get amount of delete items
    var existCount = 0;
    var deleteCount = 0;
    if(Array.isArray(req.body._id)) {
        for(let i=0; i<req.body._id.length; i++) {
            existCount++;

            if(req.body.isDelete[i] == "true")
                deleteCount++;
        }
    } else if(req.body._id && req.body.isDelete == "true") {
        existCount = 1;
        deleteCount = 1;
    } else if(req.body._id && req.body.isDelete == "false"){
        existCount = 1;
        deleteCount = 0;
    }

    //expense find and update
    Expense.findOneAndUpdate({_id: req.params._id}, {
        storeName: req.body.store,
        date: req.body.date,
        total: req.body.total,
        amount: (amount - deleteCount),
    }, (err, expense) => {
        if(err) {
            console.log(err);
        } else {
            
            // if the items is array (more than 1 items)
            if(Array.isArray(req.body._id)) {
                //update or delete item
                for(let i = 0; i < req.body._id.length; i++) {
                    //remove
                    if(req.body.isDelete[i] == "true") {
                        Item.remove({ _id: req.body._id[i] }, (err) => {
                            if(err) {
                                console.log(err);
                            }
                        }) ;
                    } else {
                        //update
                        Item.findOneAndUpdate({ _id: req.body._id[i] }, {
                            itemName: req.body.itemName[i],
                            price: parseFloat(req.body.price[i]),
                            amount: parseInt(req.body.amount[i]),
                            category: req.body.category[i],
                        }, (err) => {
                            if(err) {
                                console.log(err);
                            }
                        })
                    }
                }
            } else {
                //if the item is not array (only one item)

                //remove
                if(req.body.isDelete == "true") {
                    Item.remove({ _id: req.body._id }, (err) => {
                        if(err) {
                            console.log(err);
                        }
                    }) ;
                } else {
                    //update
                    Item.findOneAndUpdate({ _id: req.body._id }, {
                        itemName: req.body.itemName,
                        price: parseFloat(req.body.price),
                        amount: parseInt(req.body.amount),
                        category: req.body.category,
                    }, (err) => {
                        if(err) {
                            console.log(err);
                        }
                    })
                }
            }

            //create new items
            if(amount > existCount) {
                for(let i = existCount; i < req.body.itemName.length; i++) {
                    Item.create({
                        itemName: req.body.itemName[i],
                        price: parseFloat(req.body.price[i]),
                        amount: parseInt(req.body.amount[i]),
                        category: req.body.category[i],
                        receipt: expense._id,
                    }, (err, newDocument) => {
                        if(err) {
                            console.log(err);
                        } else {
                        }
                    });
                }
            } 

            res.redirect('/expense');
        }
    });

});

//expense /delete get request -> delete the expense and included items
router.get('/delete/:_id', isLoggedIn, (req, res, next) => {
    Item.remove({ receipt: req.params._id}, (err) => {
        if(err) {
            console.log(err);
        }
    })

    Expense.remove({ _id: req.params._id }, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/expense');
        }
   }) ;
});


//export router object to use it in app.js
module.exports = router; 