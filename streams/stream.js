const fs = require('fs');
const http = require('http');
const file = './streams/input.mp4';


http.createServer((req, res) => {

    res.writeHeader(200, { 'Content-Type': 'video/mp4' });
    const readStream = fs.createReadStream(file);

    readStream.pipe(res);
    readStream.pause();


    process.stdin.on('data', (input) => {
        if (input.toString().trim() === 'done') {
            console.log(`resume`);
            readStream.resume();
        }
        else {
            console.log(`read`);
            readStream.read();
        }

    })





}).listen(5000, () => console.log('5000 http://localhost:5000'))