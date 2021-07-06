const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const unlinkFile = promisify(fs.unlink);

const delay = (seconds) => new Promise((resolve) => {
    setTimeout(() => { console.log(`delaying time ${seconds}`); resolve() }, seconds * 1000);
})

const beep = () => {
    console.log('################################ BEEP');
    process.stdout.write('\x07');

}

let timeDelay = 3;
const doFileSequence1 = async () => {
    console.log('waiting');
    await delay(4);

    delay(timeDelay);


    // await writeFile('file1.txt', 'WOW ur awesome man');
    // console.log('File is written')

    delay(4);


    // await unlinkFile('file1.txt')

    delay(timeDelay - 2);


    return Promise.resolve();



}


doFileSequence1().then(() => console.log('---***&&'));


// console.log('Starting the sequence')
// delay(timeDelay)
// beep()
// // .then(() => beep())
// .then(() => )
// .then(console.log)
// .then(writeFile('file1.txt', 'WOW ur awesome man'))
// .then(() => console.log('File is written'))
// .then(() => delay(timeDelay))
// .then(() => beep())
// .then(unlinkFile('file1.txt'))
// .then(() => delay(timeDelay))
// .then(() => beep())
// .then(() => console.log('Operation SUCCESSFULLY DONE'))
// .catch(console.error);


