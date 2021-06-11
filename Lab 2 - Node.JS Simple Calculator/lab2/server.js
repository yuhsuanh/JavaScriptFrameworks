// import connect module
const connect = require('connect');
// import url module
const url = require('url');
// determin port number
const port = 3000;

// init connect object
const app = connect();

// caluculate method 
function calculate(request, response, next) {
    //show title
    response.write('<h1>Lab2 Calculator</h1>');

    // using url parse method to parse url
    var data = url.parse(request.url, true).query

    // possible method value
    if ( data.method === 'add' || data.method === 'subtract'
        || data.method === 'multiply' || data.method === 'divide') {
        
        // result default value
        var result = 0;

        // different method
        switch (data.method) {
            case 'add':
                result = Number(data.x) + Number(data.y);
                break;
            case 'subtract':
                result = Number(data.x) - Number(data.y);
                break;
            case 'multiply':
                result = Number(data.x) * Number(data.y);
                break;
            case 'divide':
                if (data.y == 0) { // division by zero
                    response.write('Invalid y value (Cannot division by zero)!!!');
                    break;
                }
                result = Number(data.x) / Number(data.y);
                break;
        }

        // display result
        response.write('<h2>' + 'Result: ' + result + '</h2>');
    } else {
        // display error
        response.write('Invalid method value!!!');
    }

    // end response
    response.end();
}

// routes
app.use('/lab2', calculate);


// start listening to request
app.listen(port);
// display server is running message
console.log('Server is running on http://localhost:3000');