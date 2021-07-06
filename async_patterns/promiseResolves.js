// delay = (seconds,callback) => {
//     setTimeout(callback,seconds);
// }
// console.log('start');

// console.log(`WOW `)
// delay(3000,()=>{console.log('3 seconds are done')})

// console.log('end');

delay = seconds => new Promise((resolve,reject) => {
    setTimeout(()=>{resolve("msg")},seconds*1000);
})

console.log('start');

delay(4).
then(console.log).
then(() => 1433).
then((number) => console.log(`Role Number ${number}`))