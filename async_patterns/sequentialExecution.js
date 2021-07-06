const fs = require('fs');
const { promisify } = require('util');

const delay = seconds => new Promise((resolve) => {
    setTimeout(() => {
        console.log(`waiting ${seconds} seconds`)
        resolve()
    }, seconds * 1000)
})

// delay = seconds => new Promise((resolve,reject) => {
//     setTimeout(()=>{resolve("msg")},seconds*1000);
// })

const writeFile = promisify(fs.writeFile);
const unlinkFile = promisify(fs.unlink);

var beep = () => {
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% BEEP !!!')
    process.stdout.write('\x07');
}


const doFileSequence1 = () => Promise.resolve().
    then(() => console.log('Startig Sequentially')).
    then(() => delay(5)).
    then(beep).
    then(() => 'waiting').
    then(console.log).
    then(() => delay(2)).
    then(beep).
    then(writeFile('sample.txt', 'File Name.....')).
    then(beep).
    then(() => 'File is Created').
    then(console.log).
    then(() => delay(2)).
    then(beep).
    then(unlinkFile('sample.txt')).
    then(() => 'File is removed SUCCESSFULLY').
    then(console.log).
    catch(console.error);

doFileSequence1();

