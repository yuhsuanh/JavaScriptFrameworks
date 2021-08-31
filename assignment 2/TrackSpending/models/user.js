// 1) create a model the same way we created the other models
const mongoose = require('mongoose');

// 2) inject authentication related functionality by injecting the passport module
const plm = require('passport-local-mongoose');

var schemaDefinition = {
    username: String, //username field is email
    password: String,
    oauthId: String, //record the ID that's received from the login provider
    oauthProvider: String, //record the provider type (GitHub, Twitter, etc)
    created: Date //record the time when the user is created in the DB
}

var userSchema = new mongoose.Schema(schemaDefinition);

//use plugin() to add functionality to our model
//this will expand the model to offer authentication require
userSchema.plugin(plm);

module.exports = new mongoose.model('User', userSchema);