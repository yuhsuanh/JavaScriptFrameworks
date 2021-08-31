 //import mongoose
 const mongoose = require('mongoose');

 //define a schema definition object
 const categorySchemaDefinition = {
     name: {
         type: String,
         require: true,
         Comment: 'Category name'
     },
 }

 var categorySchema = new mongoose.Schema(categorySchemaDefinition);

 module.exports = mongoose.model('Category', categorySchema);