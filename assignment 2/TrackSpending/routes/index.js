var express = require('express');
var router = express.Router();

//parse date
var moment = require('moment');

// for authentication
const passport = require('passport');
const session = require('express-session');


//import models (Category/Expense/Item)
const Expense = require('../models/expense');
const Item = require('../models/item');
const User = require('../models/user')

//hardcode color list and month map
const COLOR_LIST = ['rgb(231, 76, 60)', 'rgb(52, 152, 218)', 'rgb(26, 188, 156)', 'rgb(230, 126, 34)', 'rgb(175, 122, 197)', 'rgb(244, 208, 63)', 'rgb(46, 204, 113)', 'rgb(202, 207, 210)'];
const MONTH_MAPPING = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

// get home page (dashboard)
router.get('/', function(req, res, next) {

  //Step 1-1
  //get all expenses
  let promiseItems = Item.find((err, result) => {
    if(err) {
        console.log(err);
    } else {
      return result;
    }
  }).exec();

  //Step 1-2
  //get total spending by each category
  var totalSpendingByCategory = {};
  let pieData = promiseItems.then((items) => {
    for(let i=0; i<items.length; i++) {
      //if do not exist in the totalSpendingByCategory map, add to this map. otherwise, add total to the spcific map data
      if(totalSpendingByCategory[items[i].category]) {
        totalSpendingByCategory[items[i].category] += parseFloat(items[i].price) * parseFloat(items[i].amount);
      } else {
        totalSpendingByCategory[items[i].category] = parseFloat(items[i].price) * parseFloat(items[i].amount);
      }
    }

    //parse the key/value pair list to chart.js dataset
    var resultLabels = []
    var resultData = []
    for (var key in totalSpendingByCategory){
        if (totalSpendingByCategory.hasOwnProperty(key)) {
          resultLabels.push(key);
          resultData.push(totalSpendingByCategory[key]); //convert month value to month string
        }
    }

    //set the data objects
    var data = {
      labels: resultLabels,
      datasets: [{
          label: 'Category Spending',
          data: resultData,
          backgroundColor: COLOR_LIST,
          hoverOffset: 4
      }]
    }

    //return the data
    return data;
  });

  
  //Step 2-1
  //get all expense than sort by date
  let promiseExpenses = Expense.find().sort({date: "asc"}).exec();

  //Step 2-2
  //get monthly spending in this year
  let lineData = promiseExpenses.then((items) => {
    var monthWithCost = {};
    let today = new Date();

    for(let i=0; i<items.length; i++) {
      //same year
      if(items[i].date.getFullYear() == today.getFullYear()) {
        //add to map
        if(monthWithCost[items[i].date.getMonth()]) {
          monthWithCost[items[i].date.getMonth()] += parseFloat(items[i].total);
        } else {
          monthWithCost[items[i].date.getMonth()] = parseFloat(items[i].total);
        }
      }
    }

    var resultLabels = []
    var resultData = []
    //parse data for chart.js line chart
    for (var key in monthWithCost){
      if (monthWithCost.hasOwnProperty(key)) {
        resultLabels.push(MONTH_MAPPING[key]);
        resultData.push(monthWithCost[key]);
      }
    }

  //set data object
  var data = {
    labels: resultLabels,
    datasets: [{
        label: 'Monthly Spending',
        data: resultData,
        backgroundColor: 'rgb(255, 127, 80)',
        borderColor: 'rgb(255, 127, 80)',
    }]
  }

  //return data
  return data;
  });
   

  //Step 3
  //get the top spending expense
  let promiseTopSpendingData = Expense.find().sort({total: -1}).limit(1).exec();
  let topSpendingData = promiseTopSpendingData.then((topSpendingData) => {
    if(Array.isArray(topSpendingData)){
      return topSpendingData[0]
    }
  })

  //Step 4
  //get the month spending in this month
  let monthSpendingData = promiseExpenses.then((value) => {
    let today = new Date();
    let yearMonth = today.getFullYear() + " " + MONTH_MAPPING[today.getMonth()];

    var data = {
      month: yearMonth,
      total: 0.0
    };

    //if the same year and same month
    for(let i=0; i<value.length; i++) {
      if(value[i].date.getFullYear() == today.getFullYear() && value[i].date.getMonth() == today.getMonth()) {
        data.total += value[i].total;
      }
    }

    //return data
    return data;
  });

  //all above datas to Promise all list
  Promise.all([pieData, lineData, monthSpendingData, topSpendingData]).then((values) => {
    //return the datas to dashboard page
    res.render('', {title: 'Dashboard', pieData: JSON.stringify(values[0]), lineData: JSON.stringify(values[1]), monthSpendingData: values[2], topSpendingData: values[3], user: req.user});
  });
  
});







//GET handler for login
router.get('/login', (req, res, next) => {
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render('login', {title: 'Login', messages: messages});
});

// POST handler for login
router.post('/login', 
  passport.authenticate('local', 
  {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: 'Invalid Credentials'
  }
));

// GET handler for register
router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Create a new Account' });
});

//POST handler for register
router.post('/register', (req, res, next) => {
    //register a new user
    User.register(
      new User({username: req.body.username}),
      req.body.password,
      (err, newUser) => {
        if(err) {
          console.log(err);
          return res.redirect('/register');
        } else {
          req.login(newUser, (err) => {
            res.redirect('/');
          });
        }
      }
    );
});

//get handler for logout
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});



//github
//GET handle for /github
//User will be send to github.com
router.get('/github', passport.authenticate('github', { scope: ['user.email'] }));

//GET handle from github callback
//User is coming back from github.com
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login'}),
  (req, res, next) => { res.redirect('/'); }
);


module.exports = router;
