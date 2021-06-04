const connect = require('connect');

const app = connect();

app.listen(3000);

console.log('Server is running on http://localhost:3000');

function logger(request, response, next) {
    console.log(request.method, request.url);
    next();
}

app.use(logger);

function helloWorld(request, response, next) {
    response.setHeader('Content-Type', 'text-plain');
    response.end('Hello World');
}

function goodbyeWorld(request, response, next) {
    response.setHeader('Content-Type', 'text-plain');
    response.end('Goodbye World');
}

app.use('/hello', helloWorld);
app.use('/goodbye', goodbyeWorld);

//app.use(helloWorld);