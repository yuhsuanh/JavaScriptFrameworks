// 1. prints the numbers 1 to 20 on the page, each on a new line
// 2. prints the numbers 1 to 20 to the console


let http = require('http');

// http.createServer(function(req, res) =>  {
http.createServer((req, res) =>  {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });

    for (let i = 1; i <= 20; i++) {
        res.write(i + '<br />');
        console.log(i);
    }

    res.end();

}).listen(3000); //8080 also good