// use the built-in http module
const http = require('http');
const url = require('url');
const accounting = require('accounting');

//try to use url below
//http://localhost:3000/?subtotal=100
http.createServer( (request, response) => {
    response.writeHead(200, 'text-html');

    response.write('<h1>Tax Calculator</h1>');

    console.log(request.url);

    let queryString = url.parse(request.url, true).query;
    let subtotal = queryString.subtotal;
    let tax = subtotal * 0.13;
    let total = Number(subtotal) + Number(tax);

    response.write('<h4>Subtotal:' + accounting.formatMoney(subtotal) + '</h4>');
    response.write('<h4>Tax:' + accounting.formatMoney(tax) + '</h4>');
    response.write('<h4>Total:' + accounting.formatMoney(total) + '</h4>');


    //always close the response
    response.end();
}).listen(3000);

console.log('App is running on http://localhost:3000/');


//Install npm package: nodemon
//$ npm i -g nodemon
//Than, use this command to run the nodemon
//$ nodemon
