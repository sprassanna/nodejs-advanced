const { createReadStream, createWriteStream } = require('fs');


const readStream = createReadStream('./streams/input.mp4');
const writeStream = createWriteStream('./streams/dest1.mp4', {

    highWaterMark: 823454
});

readStream.on('data', (chunk) => {
    const result = writeStream.write(chunk);
    if (!result) {
        console.log('Drained')
        readStream.pause();
    }
})

readStream.on('end', (chunk) => {
    console.log(`DONE`);
})

writeStream.on('drain', () => {
    console.log('RESUME')
    readStream.resume();
})

readStream.on('error', (err) => {
    console.error(err);
})