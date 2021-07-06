delay = seconds => 

    new Promise((resolve, reject) => {

        if(seconds >4) {
            reject(new Error('thats too much time buddy'));
        } 

        setTimeout(resolve,seconds * 1000);
    })


console.log('start');

delay(5).
    then(() => console.log('4 secs are done')).
    catch(err => console.log(err.message))


console.log('end');