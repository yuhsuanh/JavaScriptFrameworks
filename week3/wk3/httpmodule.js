
const http = require('http');

http.createServer((req, res) =>  {
    console.log(req.url);

    res.write(req.url);


    let path = req.url;

    let contactMsg = 'Plase send us an email';
    let homepageMsg = 'Welcome';
    let aboutMsg = 'We are developers!';

    if (path == '/') {
        res.write(homepageMsg);
    }
    else if (path == '/contact') {
        res.write(homepageMsg);
    }
    else if (path == '/about') {
        res.write(aboutMsg);
    } else {
        res.write('Nothing here =)');
    }

    res.end();
}).listen(3000);