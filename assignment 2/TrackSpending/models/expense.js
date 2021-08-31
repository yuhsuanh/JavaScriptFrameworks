 //import mongoose
 const mongoose = require('mongoose');

 //define a schema definition object
 const expenseSchemaDefinition = {
     storeName: {
         type: String,
         require: true,
         Comment: 'Store Name'
     }, 
     items: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Item'
     }],
     date: {
         type: Date,
     },
     amount: {
        type: Number,
        require: true,
     },
     total: {
         type: Number,
         require: true,
     }
 }

 var expenseSchema = new mongoose.Schema(expenseSchemaDefinition);

 module.exports = mongoose.model('Expense', expenseSchema);