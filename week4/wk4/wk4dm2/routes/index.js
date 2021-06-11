//router/controller file
var express = require('express');
const { response } = require('../app');
var router = express.Router();

/* GET home page. */
// Same as connect > function with three objects
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/about', function(req, res, next) {
//   //pass more data > alternatively this could come from a DB
//   let tools = [
//     {'name': 'Node'},
//     {'name': 'Express'},
//     {'name': 'Handlebars'}
//   ]; // this is the model

//   res.render('about', { 
//     title: 'About US', 
//     tools: tools,
//   } );
// });


module.exports = router;
