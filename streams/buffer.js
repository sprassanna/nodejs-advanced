const fs = require('fs');
const http = require('http');

const file = './streams/input.mp4';

http.createServer((req, res) => {

    fs.readFile(file, (error, data) => {
        if (error) console.error();

        res.writeHeader(200, { 'Content-Type': 'video/mp4' })
        res.end(data);
    })

}).listen(5000, () => console.log('Buffer => http://localhost:5000'))

