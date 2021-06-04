//importing the built-in FS module in your application
//FileSysytem > module allows you to manipulate your files
const fs = require('fs');
//const { Console } = require('node:console');

let breakfast = fs.readFileSync('breakfast.txt', 'utf-8');
console.log(breakfast);
console.log('Finishd reading breakfask.txt');


let drinks = fs.readFileSync('drinks.txt', 'utf-8');
console.log(drinks);
console.log('Finishd reading drink.txt');