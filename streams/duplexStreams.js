const { Duplex, PassThrough } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('./streams/input.mp4');
const writeStream = createWriteStream('./streams/output1.mp4');

const passThrough = new PassThrough();


class Throttle extends Duplex {
    constructor(ms) {
        super();
        this.delay = ms;
    }

    _read() { }

    _write(chunk, encoding, callback) {
        this.push(chunk);
        setTimeout(callback, this.delay);
    }

    _final() { this.push(null); }
}

const throttle = new Throttle(100);
total = 0;

passThrough.on('data', (chunk) => {
    total += chunk.length;
    console.log(`Total : ${total}`)
})

readStream
    .pipe(throttle)
    .pipe(passThrough)
    .pipe(writeStream);