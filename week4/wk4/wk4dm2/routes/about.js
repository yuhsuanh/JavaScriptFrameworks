// Import express and create router object
let express = require('express');
let router = express.Router();

// '/' is actually considered as /about
router.get('/', function(req, res, next) {
  //pass more data > alternatively this could come from a DB
  let tools = [
    {'name': 'Node'},
    {'name': 'Express'},
    {'name': 'Handlebars'}
  ]; // this is the model

  res.render('about', { 
    title: 'About US', 
    tools: tools,
  } );
});



module.exports = router;