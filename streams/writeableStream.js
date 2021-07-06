const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('./streams/input.mp4');

const writeStream = createWriteStream('./dest.mp4');

readStream.on('data', (chunk) => {
    console.log(chunk.length)
    writeStream.write(chunk);
})

readStream.on('end', () => {
    console.log('DONE')
    writeStream.end();
})

readStream.on('error', (error) => {
    console.log(error)
})

writeStream.on('close', () => {
    console.log('file copied')
})