function delay(seconds,callback) {
    setTimeout(callback,seconds);
}


console.log('Awesome');

delay(3000,()=>{
    console.log('3 secs are done')
})