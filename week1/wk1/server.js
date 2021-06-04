// use node.js to run this
// $ node server
// then open the browser goto http://locahost:3000

const http = require('http');

http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text-plain'});
    response.write('Hello world!');
    response.end();
}).listen(3000);

console.log('Server is running on http://localhost:3000');
