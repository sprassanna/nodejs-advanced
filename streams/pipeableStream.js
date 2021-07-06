
const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('./streams/input.mp4');
const writeStream = createWriteStream('./streams/file.txt');

process.stdin.pipe(writeStream).on('error', console.error);