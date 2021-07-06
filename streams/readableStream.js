const fs = require('fs');

const readStream = fs.createReadStream('./streams/input.mp4');

readStream.on('data', (chunk) => {
    console.log('Ready :', chunk)
})

readStream.on('end', (chunk) => {
    console.log('FINISHED :')
    process.stdin.push(null);
})

readStream.on('error', (err) => {
    console.error(err)
})

readStream.pause();


process.stdin.on('data', (chunk) => {
    let inputText = chunk.toString().trim();

    if (inputText === 'DONE') readStream.resume();
    else readStream.read();

})
