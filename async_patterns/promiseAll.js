const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
// const unlinkFile = promisify(fs.unlink)

const delay = (seconds) => new Promise((resolves) => {
    setTimeout(() => {
        console.log(`${seconds} seconds delay`)
        resolves()

    }, seconds * 1000);
})

const asyncFunction = async () => {
    await delay(10);
    delay(2);

    return Promise.resolve();
}

asyncFunction()
    .then(() => readdir(__dirname))
    .then(console.log)
    // .catch(console.error)
