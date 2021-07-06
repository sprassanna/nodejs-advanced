const {promisify} = require('util');

delay = (seconds,callback) => {
    if(seconds>3){ 
        callback(new Error(`${seconds} seconds is too long`));
    }
    else{
        setTimeout(()=>{
            callback(null,`${seconds} seconds taken so far`)
        },seconds);
    }
}

const delayPromisify = promisify(delay);

delayPromisify(4).
    then(console.log).
    catch(err => console.log(err.message));