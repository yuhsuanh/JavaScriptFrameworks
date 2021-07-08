// 1) create a model the same way we created the other models
const mongoose = require('mongoose');

// 2) inject authentication related functionality by injecting the passport module
const plm = require('passport-local-mongoose');

var schemaDefinition = {
    username: String,
    password: String
}

var userSchema = new mongoose.Schema(schemaDefinition);

//use plugin() to add functionality to our model
//this will expand the model to offer authentication require
userSchema.plugin(plm);

module.exports = new mongoose.model('User', userSchema);