// import mongoose
const mongoose = require('mongoose');

// define a schema definition object
const schemaDefinition = {
    name: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
    },
    course: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'TO DO',
    }
}

// use the schema definition object to create a mongodb schema
var projectSchema = new mongoose.Schema(schemaDefinition);

// use the mongodb schema to create a model and export it
module.exports = mongoose.model('projects', projectSchema);
