 //import mongoose
 const mongoose = require('mongoose');

 //define a schema definition object
 const itemSchemaDefinition = {
     itemName: {
         type: String,
         require: true,
         Comment: 'Item name'
     }, 
     price: {
         type: Number,
         require: true,
         Comment: 'Item price'
     },
     amount: {
         type: Number,
         require: true,
         Comment: 'amount of item'
     },
     category: {
         type: String,
         require: true,
         Comment: 'Category'
     },
     receipt: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Expense'
     }
 }

 var itemSchema = new mongoose.Schema(itemSchemaDefinition);

 module.exports = mongoose.model('Item', itemSchema);